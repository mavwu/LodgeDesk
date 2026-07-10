const express = require('express');
const { getPublicRooms, getRoomBySlug } = require('../controllers/roomController');

const router = express.Router();

router.get('/', getPublicRooms);
router.get('/:slug', getRoomBySlug);

module.exports = router;
