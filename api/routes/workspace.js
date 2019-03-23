const { Router } = require('express');
const workspaceController = require('../controllers/workspace');
const jwtMiddleware = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/role-guard');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator/check');
const Roles = require('../constants/user-roles');
const workspaceRouter = new Router();

workspaceRouter.post('/workspaces',
    jwtMiddleware,
    roleMiddleware(Roles.TEACHER),
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024}
    }),
    [
        check('name').exists(),
        check('description').exists(),
    ],
    workspaceController.createWorkspace
);

workspaceRouter.get('/workspaces',
    jwtMiddleware,
    roleMiddleware(Roles.TEACHER),
    workspaceController.getWorkspaces
);

workspaceRouter.get('/workspaces/:id',
    jwtMiddleware,
    workspaceController.getWorkspace
);

workspaceRouter.get('/student/:id/workspaces',
    jwtMiddleware,
    workspaceController.getWorkspacesByStudent
);

module.exports = workspaceRouter;
