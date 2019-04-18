const { Router } = require('express');
const tasksController = require('../controllers/task');
const jwtMiddleware = require('../middlewares/auth');
const { check } = require('express-validator/check');
const fileUpload = require('express-fileupload');

const tasksRouter = new Router();

tasksRouter.get('/sprints/:sprintId/tasks',
    jwtMiddleware,
    tasksController.getTasksBySprint
);

tasksRouter.post('/sprints/:sprintId/tasks',
    jwtMiddleware,
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024}
    }),
    [
        check('name').exists()
    ],
    tasksController.addTask
);

tasksRouter.get('/workspaces/:workspaceId/tasks',
    jwtMiddleware,
    tasksController.getTasksByWorkspace
);

tasksRouter.get('/workspaces/:workspaceId/student/:studentId/tasks',
    jwtMiddleware,
    tasksController.getTasksByWorkspaceAndStudent
);

tasksRouter.put('/tasks/:taskId',
    jwtMiddleware,
    tasksController.changeTaskStatus
);

module.exports = tasksRouter;
