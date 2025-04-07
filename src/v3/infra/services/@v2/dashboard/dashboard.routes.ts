const version = 'v2'

export const DashBoardRoutes = {
  APPOINTMENT_COUNT: version + '/data/appointment/count',
  ACTIVATED_USERS: version + '/data/users/activated',
  APPOINTMENT_PER_HOUR: version + '/data/appointment/per-hour',
  AVERAGE_TIME_APPOINTMENTS: version + '/data/appointment/average-time',
  COURSE_USERS: version + '/data/course/users',
  FILLED_HEALTH_HISTORY: version + '/data/health-history/filled',
  LAST_SIX_MONTHS_APPOINTMENT: version + '/data/appointment/last-six-months',
  RANK_COMPLAINTS: version + '/data/appointment/rank-complaint',
  RANK_PATIENT: version + '/data/appointment/rank-patient',
  GET_DIALOG_INFO: version + '/data/dialog/info',
  GET_BLOG_POSTS: version + '/data/blog/posts',
  LAST_APPOINTMENTS: version + '/data/appointment/institution/last-appointments',
  LAST_DEPENDENTS_APPOINTMENTS: version + '/data/appointment/dependents',
  LAST_HEALTH_HISTORY: version + '/data/health-history/last',
  GET_CURRENT_COURSE: version + '/data/course/current',
} as const
