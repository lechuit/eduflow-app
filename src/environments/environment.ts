export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'EduFlow',
  version: '1.0.0',
  features: {
    analytics: true,
    darkMode: true,
    notifications: true,
    offline: true
  },
  limits: {
    freeClasses: 5,
    freeStudents: 10,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  keys: {
    storage: 'eduflow_',
    theme: 'eduflow_theme',
    token: 'eduflow_token',
    user: 'eduflow_user'
  }
};