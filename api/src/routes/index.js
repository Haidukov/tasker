const { Router } = require('express');
const authRouter = require('./auth');
const workspaceRouter = require('./workspace');
const sprintRouter = require('./sprint');
const studentsRouter = require('./students');
const tasksRouter = require('./task');

const router = new Router();

router.use(authRouter);
router.use(workspaceRouter);
router.use(sprintRouter);
router.use(studentsRouter);
router.use(tasksRouter);

module.exports = router;
