const { Router } = require('express');
const studentsController = require('../controllers/student');
const jwtMiddleware = require('../middlewares/auth');
const { check } = require('express-validator/check');

const studentsRouter = new Router();

studentsRouter.post('/workspaces/:workspaceId/invites',
    jwtMiddleware,
    [
        check('email').isEmail().exists()
    ],
    studentsController.createInvite
);

studentsRouter.post('/invites/:inviteId',
    [
        check('firstName').exists(),
        check('lastName').exists(),
        check('password').exists().isLength({ min: 8 })
    ],
    studentsController.confirmInvite
);

module.exports = studentsRouter;
