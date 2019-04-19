const fs = require('fs').promises;
const uuid = require('uuid');
const Workspace = require('../models/Workspace');
const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const generateError = require('../exceptions/errors-msg');
const Task = require('../models/task');
const Statuses = require('../constants/task-statuses');

async function addTask(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }

    const { sprintId } = req.params;
    const { name } = req.body;
    try {
        let fileUrl;
        if (req.files && req.files.file) {
            try {
                const { data } = req.files.file;
                const extension = req.files.file.name.split('.')[1];
                const filename = `task-${uuid()}`;
                fileUrl = `files/${filename}.${extension}`;
                await fs.writeFile(`public/${fileUrl}`, data);
                const task = new Task({ name, fileUrl, sprint: sprintId });
                await task.save();
                res.sendStatus(201);
            } catch (e) {
                next(e);
            }
        }
        else {
            const task = new Task({ name, sprint: sprintId });
            await task.save();
            res.sendStatus(201);
        }
    } catch (e) {
        next(e);
    }
}

async function getWorkspaces(req, res, next) {
    const userId = req.decoded.userId;
    const workspacesList = await Workspace.find({ authorId: userId }).exec();
    res.status(200);
    res.json(workspacesList);
}

async function getWorkspace(req, res, next) {
    const userId = req.decoded.userId;
    const workspaceId = req.params.id;
    try {
        const workspace = await Workspace.findOne({ _id: workspaceId, authorId: userId }).exec();
        if (workspace) {
            const { authorId } = workspace;
            const author = await User.findOne({ _id: authorId});
            workspace._doc.author = author;
            res.status(200);
            res.json(workspace);

        }
        else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(404);
    }
}

async function getTasksBySprint(req, res, next) {
    const { sprintId } = req.params;
    const tasks = await Task.find({ 'sprint': sprintId }).exec();
    res.status(200);
    res.json(tasks);
}

async function getTasksByWorkspace(req, res, next) {
    const { workspaceId } = req.params;
    const tasks = (await Task
        .find()
        .populate({
            path: 'sprint',
        })
        .exec())
        .filter(task => task.sprint.workspaceId === workspaceId);
    res.status(200);
    res.json(tasks);
}

async function getTasksByWorkspaceAndStudent(req, res, next) {
    const { workspaceId, studentId } = req.params;
    console.log(studentId);
    const tasks = (await Task
        .find()
        .populate({
            path: 'sprint',
        })
        .exec())
        .filter(task => task.sprint.workspaceId === workspaceId)
        .filter(task => String(studentId) === String(task.studentId) || task.studentId === null);
    res.status(200);
    res.json(tasks);
}

async function changeTaskStatus(req, res, next) {
    const { taskId } = req.params;
    const { status, studentId } = req.body;
    try {
        const task = await Task.findOne({ _id: taskId }).exec();
        const data = await Task.findOneAndUpdate({ _id: taskId },
            {
                status,
                studentId: studentId && task && task.status !== Statuses.TODO ? studentId : null
            }
        ).exec();
        console.log(data);
        res.sendStatus(202);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    addTask,
    getTasksBySprint,
    getTasksByWorkspace,
    getTasksByWorkspaceAndStudent,
    changeTaskStatus
};
