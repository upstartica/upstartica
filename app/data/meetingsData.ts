// Mock data for Google Meet sessions
const t = new Date();
const todayDate = t.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const y = new Date(t); y.setDate(y.getDate() - 1);
const yesterdayDate = y.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const tom = new Date(t); tom.setDate(tom.getDate() + 1);
const tomorrowDate = tom.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const d2 = new Date(t); d2.setDate(d2.getDate() - 2);
const twoDaysAgoDate = d2.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export interface Meeting {
  id: string;
  title: string;
  meetLink: string;
  meetCode: string;
  password?: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  host: string;
  attendees: number;
  status: 'upcoming' | 'live' | 'ended';
  description?: string;
}

export const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Advanced Financial Modeling',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    meetCode: 'abc-defg-hij',
    password: '',
    scheduledDate: todayDate,
    scheduledTime: '10:00 AM - 11:30 AM',
    duration: '1h 30m',
    host: 'Aryan Kumar',
    attendees: 12,
    status: 'upcoming',
    description: 'Deep dive into financial modeling techniques'
  },
  {
    id: '2',
    title: 'Business Strategy Workshop',
    meetLink: 'https://meet.google.com/xyz-abcd-efg',
    meetCode: 'xyz-abcd-efg',
    password: '1234',
    scheduledDate: tomorrowDate,
    scheduledTime: '2:00 PM - 3:30 PM',
    duration: '1h 30m',
    host: 'Prashant Kumar',
    attendees: 8,
    status: 'upcoming',
    description: 'Interactive workshop on business strategy'
  },
  {
    id: '3',
    title: 'Macroeconomics Review',
    meetLink: 'https://meet.google.com/mno-pqrs-tuv',
    meetCode: 'mno-pqrs-tuv',
    scheduledDate: 'July 17, 2024',
    scheduledTime: '4:00 PM - 5:00 PM',
    duration: '1h',
    host: 'Ravi Kumar',
    attendees: 24,
    status: 'upcoming',
    description: 'Review session for macroeconomics concepts'
  }
];

export interface Announcement {
  id: string;
  title: string;
  message: string;
  meetingId?: string;
  meetCode?: string;
  meetPassword?: string;
  meetLink?: string;
  date: string;
  type: 'general' | 'meeting' | 'urgent';
  author: string;
}

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Live Session: Advanced Financial Modeling',
    message: `Join us on ${todayDate} at 10:00 AM for an interactive session on financial modeling. Meeting details below.`,
    meetingId: '1',
    meetCode: 'abc-defg-hij',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    date: `${todayDate}, 9:00 AM`,
    type: 'meeting',
    author: 'Aryan Kumar'
  },
  {
    id: '2',
    title: `Business Strategy Workshop (${tomorrowDate})`,
    message: `Don't forget to join the workshop on ${tomorrowDate}. Password protected session.`,
    meetingId: '2',
    meetCode: 'xyz-abcd-efg',
    meetPassword: '1234',
    meetLink: 'https://meet.google.com/xyz-abcd-efg',
    date: `${yesterdayDate}, 5:30 PM`,
    type: 'meeting',
    author: 'Prashant Kumar'
  },
  {
    id: '3',
    title: 'Course Materials Updated',
    message: 'New study materials have been uploaded to the resources section.',
    date: twoDaysAgoDate,
    type: 'general',
    author: 'Admin'
  }
];
