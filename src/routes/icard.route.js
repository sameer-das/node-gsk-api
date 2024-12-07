const express = require('express');
const router = express.Router();
const { getPdf } = require('../controllers/icard.controller');

router.get('/:userid', async (req, res, next) => {
    await getPdf(req, res, next);
});

module.exports = router;