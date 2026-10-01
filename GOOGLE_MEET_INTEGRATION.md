# Google Meet Integration - Learner & Mentor Views

## Overview
This implementation adds Google Meet functionality to both learner and mentor views, allowing them to create, join, and manage virtual meeting sessions. Both roles can see the same meetings and join sessions seamlessly.

## Features Implemented

### 1. Create Meeting Modal (`app/components/learner/CreateMeetModal.tsx`)
- Shared component used by both learners and mentors
- Create new Google Meet sessions with custom details
- Auto-generates unique meeting codes (format: xxx-xxxx-xxx)
- Optional password protection
- Schedule meetings with date, time, and duration
- Copy meeting code and link to clipboard
- Success confirmation with meeting details

### 2. Learner Room Page (`app/learner/room/page.tsx`)
- **Join Session Section**: Enter meeting code and password to join
- **Create Meeting Button**: Opens modal to create new sessions
- **Upcoming Sessions List**: Shows scheduled meetings with:
  - Meeting code display
  - Quick join buttons
  - Password protection indicators
  - Date, time, and attendee count
- Pre-fill meeting code from URL parameters (for announcements)

### 3. Mentor Room Page (`app/mentor/room/page.tsx`)
- **Same functionality as learner view**
- **Join Session Section**: Enter meeting code and password
- **Create Meeting Button**: Create sessions for learners
- **Upcoming Sessions List**: View all scheduled meetings
- Quick join with external link icons
- Pre-fill support from announcements

### 4. Learner Announcements Panel (`app/components/learner/AnnouncementsPanel.tsx`)
- Displays announcements with meeting information
- Shows meeting codes and passwords
- Quick "Join Now" buttons for meeting announcements
- Visual indicators for meeting vs general announcements
- Integrates with learner dashboard

### 5. Mentor Announcements Panel (`app/components/mentor/AnnouncementsPanel.tsx`)
- Same functionality as learner panel
- Additional "New" button to create announcements
- Orange accent color matching mentor theme
- Integrates with mentor dashboard

### 6. Meetings Data (`app/data/meetingsData.ts`)
- Centralized data structure shared between learner and mentor views
- Meeting interface with all necessary fields
- Announcement interface with meeting details
- Sample meetings and announcements for testing

## How to Use

### For Learners:

#### Joining a Meeting from Announcements:
1. Go to Learner Dashboard (`/learner`)
2. Check the Announcements section
3. Click "Join Now" on any meeting announcement
4. Opens Google Meet in new tab OR redirects to room page with pre-filled code

#### Joining a Meeting Manually:
1. Go to Room page (`/learner/room`)
2. Enter the meeting code in the "Join Session" section
3. Optionally enter password if required
4. Click "Join Meeting" button
5. Opens Google Meet in new tab

#### Creating a Meeting:
1. Go to Room page (`/learner/room`)
2. Click "Create Meeting" button in top-right
3. Fill in meeting details:
   - Session title
   - Date and time
   - Duration
   - Optional password
   - Optional description
4. Click "Create Meeting"
5. Copy the generated meeting code and link
6. Share with participants

#### Quick Join from Schedule:
1. Go to Room page (`/learner/room`)
2. View "Upcoming Sessions" list
3. Click "Join" button on any session
4. Opens Google Meet directly

### For Mentors:

#### Viewing Announcements:
1. Go to Mentor Dashboard (`/mentor`)
2. Scroll to Announcements section at bottom
3. View all meeting announcements with codes and passwords
4. Click "Join Now" to join any meeting

#### Creating Meetings:
1. Go to Room page (`/mentor/room`)
2. Click "Create Meeting" button in top-right
3. Fill in session details (same as learner)
4. Share meeting code with learners via announcements

#### Joining Meetings:
1. Go to Room page (`/mentor/room`)
2. Enter meeting code manually OR
3. Click "Join" on any upcoming session
4. Opens Google Meet in new tab

#### Managing Sessions:
1. View all upcoming sessions in room page
2. See meeting codes and password protection status
3. Quick join any session with one click
4. Create new announcements with "New" button

## Technical Details

### Shared Components
- `CreateMeetModal`: Used by both learner and mentor views
- Meeting data structure: Centralized in `meetingsData.ts`
- Same meetings visible to both roles

### Meeting Code Format
- Format: `xxx-xxxx-xxx` (e.g., `abc-defg-hij`)
- Auto-generated using random lowercase letters
- Compatible with Google Meet URL structure

### URL Parameters
Both room pages support pre-filling meeting details via URL:
- `/learner/room?code=abc-defg-hij` - Pre-fills meeting code
- `/mentor/room?code=abc-defg-hij&password=1234` - Pre-fills code and password

### Data Structure
```typescript
interface Meeting {
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

interface Announcement {
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
```

## Integration Points

### Learner View:
1. **Dashboard** (`app/learner/page.tsx`):
   - Displays announcements with meeting info
   - Provides navigation to room page

2. **Room Page** (`app/learner/room/page.tsx`):
   - Central hub for all meeting activities
   - Create, join, and view meetings

3. **Announcements** (`app/components/learner/AnnouncementsPanel.tsx`):
   - Shows meeting announcements
   - Quick join functionality

### Mentor View:
1. **Dashboard** (`app/mentor/page.tsx`):
   - Displays announcements with meeting info
   - "New" button to create announcements
   - Navigation to room page

2. **Room Page** (`app/mentor/room/page.tsx`):
   - Create meetings for learners
   - Join existing sessions
   - View all upcoming meetings

3. **Announcements** (`app/components/mentor/AnnouncementsPanel.tsx`):
   - Shows meeting announcements
   - Create new announcements
   - Quick join functionality

## Key Features

### Shared Functionality:
- ✅ Same meetings visible in both learner and mentor views
- ✅ Both roles can create meetings
- ✅ Both roles can join meetings
- ✅ Announcements display meeting codes and passwords
- ✅ Quick join from announcements or upcoming sessions
- ✅ URL parameter support for pre-filled codes
- ✅ Password protection with visual indicators
- ✅ Responsive design matching each role's theme

### Role-Specific Features:
- **Learners**: Blue accent colors, learner-focused UI
- **Mentors**: Orange accent colors, mentor-focused UI, announcement creation

## Future Enhancements

- Backend integration for persistent meeting storage
- Real-time meeting status updates
- Role-based permissions (mentors can delete/edit meetings)
- Calendar integration
- Meeting history and recordings
- Participant management
- Meeting reminders and notifications
- Integration with actual Google Meet API
- Video preview before joining
- Screen sharing and recording controls
- Attendance tracking
- Meeting analytics for mentors

## Notes

- Currently uses mock data from `meetingsData.ts`
- Meeting links open in new browser tabs
- Requires Google account for actual Google Meet access
- Password protection is UI-only (not enforced by Google Meet)
- Both learner and mentor views share the same meeting data source
