const { Transaction } = require('../models');
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Jakarta");
const axios = require('axios');

/**
 * Find all transactions
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = async (req, res) => {
    try {
        let transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Find one transaction
 * @param {*} req 
 * @param {*} res 
 */
exports.findById = async (req, res) => {
    const id = req.params.id;
    try {
        let transaction = await Transaction.findByPk(id);
        if (transaction) {
            let findVendor = await axios.get(`http://localhost:3001/api/user/${transaction.vendorId}`);
            let findCustomer = await axios.get(`http://localhost:3001/api/user/${transaction.customerId}`);
            let findMaterial = await axios.get(`http://localhost:3002/api/material/${transaction.materialId}`);
            let returnData = {
                ...transaction.dataValues,
                vendorName: findVendor.data.name,
                customerName: findCustomer.data.name,
                materialName: findMaterial.data.name
            }
            res.status(200).json(returnData);
        }
        else res.status(404).json({ error: "Transaction not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Create one transaction
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    const { vendorId, customerId, materialId, transactionDate } = req.body;
    try {
        let findVendor = await axios.get(`http://localhost:3001/api/user/${vendorId}`);
        if (findVendor.status != 200) res.status(400).json({ error: "Vendor not found" });
        let findCustomer = await axios.get(`http://localhost:3001/api/user/${customerId}`);
        if (findCustomer.status != 200) res.status(400).json({ error: "Customer not found" });
        let findMaterial = await axios.get(`http://localhost:3002/api/material/${materialId}`);
        if (findMaterial.status != 200) res.status(400).json({ error: "Material not found" });
        let momentTxDate = moment(transactionDate).toDate();
        let newTransaction = await Transaction.create({ vendorId: vendorId, customerId: customerId, materialId: materialId, transactionDate: momentTxDate });
        res.status(200).json(newTransaction);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Update one transaction
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    const { vendorId, customerId, materialId, transactionDate } = req.body;
    let toUpdate = {};
    try {
        if (vendorId) {
            let findVendor = await axios.get(`http://localhost:3001/api/user/${vendorId}`);
            if (findVendor.status != 200) res.status(400).json({ error: "Vendor not found" });
            else toUpdate.vendorId = vendorId;
        }
        if (customerId) {
            let findCustomer = await axios.get(`http://localhost:3001/api/user/${customerId}`);
            if (findCustomer.status != 200) res.status(400).json({ error: "Customer not found" });
            else toUpdate.customerId = customerId;
        }
        if (materialId) {
            let findMaterial = await axios.get(`http://localhost:3002/api/material/${materialId}`);
            if (findMaterial.status != 200) res.status(400).json({ error: "Material not found" });
            else toUpdate.materialId = materialId;
        }
        if (transactionDate) {
            let momentTxDate = moment(transactionDate).toDate();
            toUpdate.transactionDate = momentTxDate;
        }
        let transaction = await Transaction.findByPk(id);
        if (transaction) {
            let transactionUpdate = await transaction.update(toUpdate);
            res.status(200).json(transactionUpdate);
        }
        else res.status(404).json({ error: "Transaction not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Delete one transaction
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        let transaction = await Transaction.findByPk(id);
        if (transaction) {
            let transactionDelete = await transaction.destroy();
            res.status(200).json(transactionDelete);
        }
        else res.status(404).json({ error: "Transaction not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}