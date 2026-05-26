const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactsController');

router.get('/', controller.list);
router.get('/:id', controller.getById);
// Allow public creation of contacts (no auth middleware)
router.post('/', controller.create);

module.exports = router;
