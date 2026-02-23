export const agents = [
  { id: '1', name: 'Claw', role: 'Admin', status: 'idle', model: 'claude-opus-4.6', avatar: '/avatars/claw.png', color: '#3b82f6' },
  { id: '2', name: 'Bernard', role: 'Developer', status: 'idle', model: 'claude-opus-4.6', avatar: '/avatars/bernard.png', color: '#8b5cf6' },
  { id: '3', name: 'Vale', role: 'Marketer', status: 'idle', model: 'claude-sonnet-4.5', avatar: '/avatars/vale.png', color: '#ec4899' },
  { id: '4', name: 'Gumbo', role: 'Assistant', status: 'idle', model: 'claude-sonnet-4.5', avatar: '/avatars/gumbo.png', color: '#f97316' },
];

export const initialTasks = {
  scheduled: [
    { id: 't1', title: 'Weekly rollup', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Fri 2/13 4pm' },
    { id: 't2', title: 'Budget check', agent: 'Claw', agentColor: '#3b82f6', scheduledTime: 'Fri 2/13 12pm' },
    { id: 't3', title: 'Open threads review', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Mon 2/16 1:30pm' },
    { id: 't4', title: 'Monthly rollup', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Sun 3/1 10am' },
    { id: 't5', title: 'Daily synthesis', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Fri 2/13 7pm' },
    { id: 't6', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Fri 2/13 9am' },
  ],
  queue: [],
  inProgress: [],
  done: [
    { id: 't7', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 9am' },
    { id: 't8', title: 'Daily synthesis', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 7pm' },
    { id: 't9', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 2pm' },
    { id: 't10', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 7pm' },
  ],
};

export const costData = {
  today: 0.73,
  month: 219.98,
};
