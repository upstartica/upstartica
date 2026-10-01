
import { coursesData } from '../app/data/coursesData';
import { uploadToR2 } from '../lib/r2';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function seedCourses() {
    console.log('Starting course data migration to R2...');

    try {
        const jsonData = JSON.stringify(coursesData, null, 2);
        const key = 'data/courses.json';

        await uploadToR2(key, jsonData, 'application/json');

        console.log(`Success! Courses data uploaded as "${key}" to your R2 bucket.`);
        console.log('You can now fetch your courses feed directly from R2.');
    } catch (error) {
        console.error('Error uploading courses:', error);
        process.exit(1);
    }
}

seedCourses();
