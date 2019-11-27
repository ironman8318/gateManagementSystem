const router = require('express').Router();

const admin = require('../controllers/admin');

router.get('/', admin.home);
router.post('/checkIn', admin.postcheckIn);
router.get('/checkIn', admin.getcheckIn);
router.get('/checkOut', admin.getcheckOut);
router.post('/checkOut', admin.postcheckOut);
module.exports = router;
