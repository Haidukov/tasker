const { Router } = require('express');
const authRouter = require('./auth');
const workspaceRouter = require('./workspace');
const sprintRouter = require('./sprint');
const studentsRouter = require('./students');

const router = new Router();

router.use(authRouter);
router.use(workspaceRouter);
router.use(sprintRouter);
router.use(studentsRouter);

module.exports = router;
