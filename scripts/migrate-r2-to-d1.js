const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
  }
});

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str === 'number' || typeof str === 'boolean') return String(str);
  return "'" + String(str).replace(/'/g, "''") + "'";
}

async function readR2Json(key) {
  const res = await client.send(new GetObjectCommand({ Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME, Key: key }));
  const chunks = [];
  for await (const chunk of res.Body) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
}

async function migrate() {
  console.log("Fetching R2 object list...");
  const res = await client.send(new ListObjectsV2Command({ Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME }));
  if (!res.Contents) {
    console.log("No objects in R2!");
    return;
  }

  const sqlStatements = [];

  for (const item of res.Contents) {
    const key = item.Key;
    if (!key.endsWith('.json')) continue;

    try {
      const data = await readR2Json(key);
      console.log(`Processing R2 key: ${key}`);

      // 1. Waitlist Submissions (Waitlist/*.json)
      if (key.startsWith('Waitlist/')) {
        const itemData = data.data || data;
        const docId = data.docId || data.applicationNumber || key.replace('Waitlist/', '').replace('.json', '');
        const firstName = itemData.firstName || '';
        const lastName = itemData.lastName || '';
        const contactNumber = itemData.contactNumber || '';
        const email = itemData.email || '';
        const age = itemData.age || null;
        const rating1 = itemData.foundationImportanceRating || null;
        const rating2 = itemData.foundationalKnowledgeRating || null;
        const businessIdea = itemData.businessIdea || '';
        const launch2027 = itemData.willingToLaunchIn2027 || '';
        const reason = itemData.businessPotentialReason || '';
        const threeHours = itemData.canGiveThreeHours || '';
        const submittedAt = itemData.submittedAt || new Date().toISOString();

        sqlStatements.push(`INSERT OR REPLACE INTO waitlist (
          doc_id, first_name, last_name, contact_number, email, age,
          foundation_importance_rating, foundational_knowledge_rating,
          business_idea, willing_to_launch_2027, business_potential_reason,
          can_give_three_hours, submitted_at
        ) VALUES (
          ${escapeSql(docId)}, ${escapeSql(firstName)}, ${escapeSql(lastName)},
          ${escapeSql(contactNumber)}, ${escapeSql(email)}, ${escapeSql(age)},
          ${escapeSql(rating1)}, ${escapeSql(rating2)}, ${escapeSql(businessIdea)},
          ${escapeSql(launch2027)}, ${escapeSql(reason)}, ${escapeSql(threeHours)},
          ${escapeSql(submittedAt)}
        );`);
      }

      // 2. Users (Public/users/*.json, data/users/*.json)
      else if (key.startsWith('Public/users/') || key.startsWith('data/users/')) {
        const email = data.email || key.split('/').pop().replace('.json', '');
        sqlStatements.push(`INSERT OR REPLACE INTO users (
          email, first_name, last_name, password, role, created_at
        ) VALUES (
          ${escapeSql(email)}, ${escapeSql(data.firstName || data.name || '')},
          ${escapeSql(data.lastName || '')}, ${escapeSql(data.password || '')},
          ${escapeSql(data.role || 'learner')}, ${escapeSql(data.createdAt || new Date().toISOString())}
        );`);
      }

      // 3. Contact submissions (contact/*.json)
      else if (key.startsWith('contact/')) {
        const id = key.replace('contact/', '').replace('.json', '');
        sqlStatements.push(`INSERT OR REPLACE INTO contact_submissions (
          id, name, email, subject, message, submitted_at
        ) VALUES (
          ${escapeSql(id)}, ${escapeSql(data.name || '')}, ${escapeSql(data.email || '')},
          ${escapeSql(data.subject || '')}, ${escapeSql(data.message || '')},
          ${escapeSql(data.submittedAt || new Date().toISOString())}
        );`);
      }

      // 4. Articles (data/articles.json, Public/articles.json, data/articles/*.json)
      else if (key === 'Public/articles.json' || key === 'data/articles.json') {
        if (Array.isArray(data)) {
          for (const a of data) {
            sqlStatements.push(`INSERT OR REPLACE INTO articles (
              id, title, description, content, author, date, category, read_time, image
            ) VALUES (
              ${escapeSql(a.id)}, ${escapeSql(a.title)}, ${escapeSql(a.description)},
              ${escapeSql(a.content || '')}, ${escapeSql(a.author)}, ${escapeSql(a.date)},
              ${escapeSql(a.category)}, ${escapeSql(a.readTime)}, ${escapeSql(a.image)}
            );`);
          }
        }
      } else if (key.startsWith('data/articles/')) {
        const a = data;
        if (a && a.id) {
          sqlStatements.push(`INSERT OR REPLACE INTO articles (
            id, title, description, content, author, date, category, read_time, image
          ) VALUES (
            ${escapeSql(a.id)}, ${escapeSql(a.title)}, ${escapeSql(a.description)},
            ${escapeSql(a.content || '')}, ${escapeSql(a.author)}, ${escapeSql(a.date)},
            ${escapeSql(a.category)}, ${escapeSql(a.readTime)}, ${escapeSql(a.image)}
          );`);
        }
      }

      // 5. Courses (data/courses.json, data/courses/*.json)
      else if (key === 'data/courses.json') {
        if (Array.isArray(data)) {
          for (const c of data) {
            sqlStatements.push(`INSERT OR REPLACE INTO courses (
              id, title, category, image, hours, author, description, full_description,
              students, rating, stars, price
            ) VALUES (
              ${escapeSql(c.id)}, ${escapeSql(c.title)}, ${escapeSql(c.category)},
              ${escapeSql(c.image)}, ${escapeSql(c.hours)}, ${escapeSql(c.author)},
              ${escapeSql(c.description)}, ${escapeSql(c.fullDescription || '')},
              ${escapeSql(c.students)}, ${escapeSql(c.rating)}, ${escapeSql(c.stars)},
              ${escapeSql(c.price)}
            );`);
          }
        }
      } else if (key.startsWith('data/courses/')) {
        const c = data;
        if (c && c.id) {
          sqlStatements.push(`INSERT OR REPLACE INTO courses (
            id, title, category, image, hours, author, description, full_description,
            students, rating, stars, price
          ) VALUES (
            ${escapeSql(c.id)}, ${escapeSql(c.title)}, ${escapeSql(c.category)},
            ${escapeSql(c.image)}, ${escapeSql(c.hours)}, ${escapeSql(c.author)},
            ${escapeSql(c.description)}, ${escapeSql(c.fullDescription || '')},
            ${escapeSql(c.students)}, ${escapeSql(c.rating)}, ${escapeSql(c.stars)},
            ${escapeSql(c.price)}
          );`);
        }
      }

      // 6. Tasks (data/tasks.json, mentor/tasks.json, learner/tasks.json)
      else if (key === 'data/tasks.json' || key === 'mentor/tasks.json' || key === 'learner/tasks.json') {
        if (Array.isArray(data)) {
          for (const t of data) {
            sqlStatements.push(`INSERT OR REPLACE INTO tasks (
              id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at
            ) VALUES (
              ${escapeSql(t.id)}, ${escapeSql(t.title)}, ${escapeSql(t.description)},
              ${escapeSql(t.course || '')}, ${escapeSql(t.assignTo || '')}, ${escapeSql(t.assignType || '')},
              ${escapeSql(t.deadline || '')}, ${escapeSql(t.dueDate || '')}, ${escapeSql(t.points || 0)},
              ${escapeSql(t.status || 'active')}, ${escapeSql(t.createdAt || '')}, ${escapeSql(t.updatedAt || '')}
            );`);
          }
        }
      }

      // 7. Submissions (mentor/submissions.json)
      else if (key === 'mentor/submissions.json') {
        if (Array.isArray(data)) {
          for (const s of data) {
            sqlStatements.push(`INSERT OR REPLACE INTO task_submissions (
              id, task_id, task_title, learner_name, description, attachment_name, status, submitted_at
            ) VALUES (
              ${escapeSql(s.id)}, ${escapeSql(s.taskId)}, ${escapeSql(s.taskTitle)},
              ${escapeSql(s.learnerName)}, ${escapeSql(s.description)}, ${escapeSql(s.attachmentName)},
              ${escapeSql(s.status || 'submitted')}, ${escapeSql(s.submittedAt || '')}
            );`);
          }
        }
      }

      // 8. Meetings (data/meetings.json, learner/meetings.json)
      else if (key === 'data/meetings.json' || key === 'learner/meetings.json') {
        if (Array.isArray(data)) {
          for (const m of data) {
            sqlStatements.push(`INSERT OR IGNORE INTO meetings (
              title, scheduled_date, scheduled_time, attendees, meet_code, password
            ) VALUES (
              ${escapeSql(m.title)}, ${escapeSql(m.scheduledDate)}, ${escapeSql(m.scheduledTime)},
              ${escapeSql(m.attendees || 0)}, ${escapeSql(m.meetCode || '')}, ${escapeSql(m.password || '')}
            );`);
          }
        }
      }

      // 9. Community Posts (data/community.json, learner/community.json)
      else if (key === 'learner/community.json' || key === 'data/community.json') {
        if (data && Array.isArray(data.posts)) {
          for (const p of data.posts) {
            sqlStatements.push(`INSERT OR REPLACE INTO community_posts (
              id, author, author_role, avatar, content, image, likes, shares, comments_json, created_at
            ) VALUES (
              ${escapeSql(p.id)}, ${escapeSql(p.author)}, ${escapeSql(p.authorRole || '')},
              ${escapeSql(p.avatar || '')}, ${escapeSql(p.content)}, ${escapeSql(p.image || '')},
              ${escapeSql(p.likes || 0)}, ${escapeSql(p.shares || 0)},
              ${escapeSql(JSON.stringify(p.comments || []))}, ${escapeSql(new Date().toISOString())}
            );`);
          }
        }
      }

      // 10. KV Store (For Dashboard, Resources, Community state, etc.)
      const kvKeys = ['data/dashboard.json', 'learner/dashboard.json', 'learner/resources.json', 'data/resources.json', 'data/community.json', 'learner/community.json'];
      if (kvKeys.includes(key)) {
        sqlStatements.push(`INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (
          ${escapeSql(key)}, ${escapeSql(JSON.stringify(data))}, ${escapeSql(new Date().toISOString())}
        );`);
      }

    } catch (e) {
      console.warn(`Error processing key ${key}:`, e.message);
    }
  }

  const outPath = path.join(__dirname, 'data_migration.sql');
  fs.writeFileSync(outPath, sqlStatements.join('\n\n'), 'utf-8');
  console.log(`Successfully generated ${sqlStatements.length} SQL migration statements in ${outPath}!`);
}

migrate().catch(console.error);
