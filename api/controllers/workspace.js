const fs = require('fs').promises;
const uuid = require('uuid');
const Workspace = require('../models/Workspace');
const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const generateError = require('../exceptions/errors-msg');

async function createWorkspace(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }

    const userId = req.decoded.userId;
    const { name, description } = req.body;
    try {
        let imageUrl;
        try {
            const { data } = req.files.image;
            const extension = req.files.image.name.split('.')[1];
            const filename = `workspace-logo-${uuid()}`;
            imageUrl = `images/${filename}.${extension}`;
            await fs.writeFile(`public/${imageUrl}`, data);
        } catch (e) {
            imageUrl = 'images/workspace-default.jpg';
        }
        const workspace = new Workspace({ name, description, imageUrl, authorId: userId });
        await workspace.save();
        res.sendStatus(201);
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

module.exports = {
    createWorkspace,
    getWorkspaces,
    getWorkspace
}
