const fs = require('fs').promises;
const uuid = require('uuid');
const Workspace = require('../models/Workspace');
const { validationResult } = require('express-validator/check');
const generateError = require('../exceptions/errors-msg');

async function createWorkspace(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }

    const userId = req.decoded.userId;
    const { name, description } = req.body;
    const { data } = req.files.image;
    const extension = req.files.image.name.split('.')[1];
    const filename = `workspace-logo-${uuid()}`;
    const imageUrl = `images/${filename}.${extension}`;
    try {
        await fs.writeFile(`public/${imageUrl}`, data);
        const workspace = new Workspace({ name, description, imageUrl, authorId: userId });
        await workspace.save();
        res.sendStatus(202);
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
        const workspace = await Workspace.find({ _id: workspaceId, authorId: userId }).exec();
        console.log(workspace);
        if (workspace) {
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

module.exports = {
    createWorkspace,
    getWorkspaces,
    getWorkspace
}
