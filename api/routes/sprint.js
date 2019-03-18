const { Router } = require('express');
const sprintController = require('../controllers/sprint');
const jwtMiddleware = require('../middlewares/auth');
const fileUpload = require('express-fileupload');

const sprintRouter = new Router();
const { check } = require('express-validator/check');

sprintRouter.post('/workspaces/:workspaceId/sprints/',
    jwtMiddleware,
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024}
    }),
    [
        check('name').exists(),
        check('description').exists(),
    ],
    sprintController.createSprint
);

sprintRouter.get('/workspaces/:workspaceId/sprints',
    jwtMiddleware,
    sprintController.getSprints
);

sprintRouter.get('/workspaces/:workspaceId/sprints/:sprintId',
    jwtMiddleware,
    sprintController.getSprint
);

module.exports = sprintRouter;
