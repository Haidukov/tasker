const UserInvite = require('../models/UserInvite');
const Workspace = require('../models/Workspace');
const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const generateError = require('../exceptions/errors-msg');
const HttpException = require('../exceptions/http-exception');
const MailTransport = require('../util/mail');
const UserRoles = require('../contstants/user-roles');
const { createToken } = require('../util/token');


async function createInvite(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }
    const workspaceId = req.params.workspaceId;
    const workspace = await Workspace.findOne({ _id: workspaceId }).exec();
    if (!workspace) {
        next(new HttpException(400, 'No workspace with such id'));
    }
    const userId = req.decoded.userId;
    const email = req.body.email;
    const currentUser = await User.findOne({ _id: userId }).exec();
    const currentUserEmail = currentUser.username;
    if (email === currentUserEmail) {
        next(new HttpException(400, 'You cannot invite yourself'));
    }
    const existedInvite = await UserInvite.findOne({ invitedEmail: email, workspaceId }).exec();
    if (existedInvite) {
        next(new HttpException(400, 'That user is already invited'));
    }
    const userInvite = new UserInvite({
        invitedEmail: email,
        authorId: userId,
        workspaceId
    });

    await userInvite.save();
    MailTransport.sendMail({
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: 'You have been envited to tasker',
        html: 'Please click on a link to confirm your invitation ' +
            `<a href="${process.env.FRONT_END_URL}/confirm/${userInvite._id}">link</a>`
    }, (err, info) => {
        if (err) {
            console.error(err);
            next(new HttpException(500));
        } else {
            console.log(info);
            res.sendStatus(201);
        }
    });
}

async function confirmInvite(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }
    const inviteId = req.params.inviteId;
    const userInvite = await UserInvite.findOneAndDelete(
        { _id: inviteId },
        { projection: { workspaceId: 1, invitedEmail: 1 } })
        .exec();
    if (!userInvite) {
        next(new HttpException(400, 'You invitation is wrong'));
    }
    console.log('hello');
    console.log(userInvite);
    const { workspaceId } = userInvite;
    const username = userInvite.invitedEmail;
    const { password, firstName, lastName } = req.body;
    const newUser = new User({ username, password, firstName, lastName, role: UserRoles.STUDENT });
    await newUser.save();
    await Workspace.findOneAndUpdate({ _id: workspaceId },
        {
            $push: { students: newUser._id }
        })
        .exec();
    const token = createToken(newUser);
    res.status(201);
    res.json(token);
};

module.exports = {
    createInvite,
    confirmInvite
}
