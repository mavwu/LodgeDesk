const express = require('express');
const { getAdminBookings, updateBookingStatus } = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);
router.get('/', getAdminBookings);
router.patch('/:id/status', updateBookingStatus);

module.exports = router;
