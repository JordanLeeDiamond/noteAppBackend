const {User, Note} = require("../models");
const bcrpyt = require("bcryptjs");

exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).send({
            user: user,
            token: req.token,
            message: `${userName} Added!`
        })
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({userName: req.body.userName});
        if (await bcrpyt.compare(req.body.password, user.password)) {
            res.status(200).send({
                user: user,
                token: req.token,
                message: "Login Succesful"
            })
        }
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.tokenLogin = (req, res) => {
    try {
        res.status(200).send({
                user: req.user})
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.updateOne(
            {userName: req.body.userName},
            {$Set: {[req.body.key]: req.body.update}}
        ); res.status(200).send({
            message: `${userName} Updated `
        });
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User,deleteOne({userName: req.params.userName});
        res.status(200).send({
            message: `${userName} Deleted`
        });
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.addNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(200).send({
            user: user,
            token: req.token,
            message: `${title} Posted`
        })
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.updateNote = async (req, res) => {
    try {
        await Note.updateOne(
            {email: req.body.email},
            {$Set: {[req.body.key]: req.body.update}}
        );
        res.status(200).send({
            message: `${title} Updated`
        });
    } catch (error) {
        res.status(500).send({err: error})
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await Note.deleteOne({title: req.params.title});
        res.status(200).send({
            message: `${title} Deleted`
        });
    } catch (error) {
        res.status(500).send({err: error})
    }
};