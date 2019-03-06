const { Router } = require('express');
const authController = require('../controllers/auth');
const { check } = require('express-validator/check');
const jwtMiddleware = require('../middlewares/auth');

const authRouter = new Router();

authRouter.post('/public/sign-up',
    [
        check('username').isEmail(),
        check('password').isLength({ min: 8 })
    ],
    authController.createUser);

authRouter.post('/public/login',
    [
        check('username').isEmail(),
        check('password').isLength({ min: 8 })
    ],
    authController.login);

authRouter.get('/logout',
    authController.logout
);

authRouter.get('/user-data',
    jwtMiddleware,
    authController.userData
);

module.exports = authRouter;
