const { Router } = require('express');
const authRouter = require('./auth');
const workspaceRouter = require('./workspace');

const router = new Router();

router.use(authRouter);
router.use(workspaceRouter);

module.exports = router;
