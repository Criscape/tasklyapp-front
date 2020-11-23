export const environment = {
  production: true,
  backUrl: 'http://localhost:3000',
  backRoutes: {
    listTask: '/tasks/list',
    createTask: '/tasks/create',
    deleteTask: '/tasks/delete',
    listState: '/states/list'
  },
  title: 'Taskly App',
  routes: {
    tasklist: '/tasklist',
    home: '/'
  }
};
