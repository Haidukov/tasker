const fs = require('fs').promises;
const uuid = require('uuid');
const Sprint = require('../models/Sprint');
const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const generateError = require('../exceptions/errors-msg');

async function createSprint(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }

    const workspaceId = req.params.workspaceId;
    const { name, description } = req.body;
    try {
        let imageUrl;
        try {
            const { data } = req.files.image;
            const extension = req.files.image.name.split('.')[1];
            const filename = `sprint-logo-${uuid()}`;
            imageUrl = `images/${filename}.${extension}`;
            await fs.writeFile(`public/${imageUrl}`, data);
        } catch (e) {
            imageUrl = 'images/workspace-default.jpg';
        }
        const sprint = new Sprint({ name, description, imageUrl, workspaceId });
        await sprint.save();
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

async function getSprints(req, res, next) {
    const workspaceId = req.params.workspaceId;
    const sprintsList = await Sprint.find({ workspaceId: workspaceId }).exec();
    res.status(200);
    res.json(sprintsList);
}

async function getSprint(req, res, next) {
    const workspaceId = req.params.workspaceId;
    const sprintId = req.params.id;
    try {
        const sprint = await Sprint.findOne({ _id: sprintId, workspaceId: workspaceId }).exec();
        if (sprint) {
            res.status(200);
            res.json(sprint);
        }
        else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(404);
    }
}

module.exports = {
    createSprint,
    getSprints,
    getSprint
}
