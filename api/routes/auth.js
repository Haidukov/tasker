const { Router } = require('express');
const authController = require('../controllers/auth');

const authRouter = new Router();

authRouter.post('/sign-up', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        await authController.createUser(username, password)
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(e.message);
        res.send(e.message);
    }
});

authRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await authController.login(username, password);
        res.sendStatus(200);
        res.send(token);
    } catch (e) {
        res.sendStatus(e.code);
        res.send(e.message);
    }
})

module.exports = authRouter;
