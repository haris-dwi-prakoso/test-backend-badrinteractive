const { Material } = require('../models');

/**
 * Find all materials
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = async (req, res) => {
    try {
        let materials = await Material.findAll();
        res.status(200).json(materials);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Find one material
 * @param {*} req 
 * @param {*} res 
 */
exports.findById = async (req, res) => {
    const id = req.params.id;
    try {
        let material = await Material.findByPk(id);
        if (material) {
            res.status(200).json(material);
        }
        else res.status(404).json({ error: "Material not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Create one material
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        let newMaterial = await Material.create({ name });
        res.status(200).json(newMaterial);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Update one material
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        let material = await Material.findByPk(id);
        if (material) {
            let materialUpdate = await material.update({ name: name })
            res.status(200).json(materialUpdate);
        }
        else res.status(404).json({ error: "Material not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Delete one material
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        let material = await Material.findByPk(id);
        if (material) {
            let materialDelete = await material.destroy();
            res.status(200).json(materialDelete);
        }
        else res.status(404).json({ error: "Material not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}