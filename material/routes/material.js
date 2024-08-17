const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material');

router.route("/")
    .get(materialController.findAll)
    .post(materialController.create);

router.route("/:id")
    .get(materialController.findById)
    .put(materialController.update)
    .delete(materialController.delete);

module.exports = router;