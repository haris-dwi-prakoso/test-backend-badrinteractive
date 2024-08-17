const { User } = require('../models');

/**
 * Find all users
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = async (req, res) => {
    try {
        let users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Find one user
 * @param {*} req 
 * @param {*} res 
 */
exports.findById = async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        }
        else res.status(404).json({ error: "User not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Create one user
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        let newUser = await User.create({ name });
        res.status(200).json(newUser);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Update one user
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        let user = await User.findByPk(id);
        if (user) {
            let userUpdate = await user.update({ name: name })
            res.status(200).json(userUpdate);
        }
        else res.status(404).json({ error: "User not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Delete one user
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findByPk(id);
        if (user) {
            let userDelete = await user.destroy();
            res.status(200).json(userDelete);
        }
        else res.status(404).json({ error: "User not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}