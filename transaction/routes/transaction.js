const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');

router.route("/")
    .get(transactionController.findAll)
    .post(transactionController.create);

router.route("/:id")
    .get(transactionController.findById)
    .put(transactionController.update)
    .delete(transactionController.delete);

module.exports = router;