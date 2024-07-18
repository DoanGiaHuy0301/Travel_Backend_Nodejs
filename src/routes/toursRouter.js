const express = require('express');
const router = express.Router();

const toursController = require('../app/controllers/ToursController');

router.get('/create', toursController.create);
router.post('/store', toursController.store);
router.get('/:id/edit', toursController.edit);
router.put('/:id', toursController.update);
router.patch('/:id/restore', toursController.restore);
router.delete('/:id', toursController.delete);
router.delete('/:id/force', toursController.forceDestroy);
router.get('/trash', toursController.showTourDeleted);
router.get('/:slug', toursController.show);

module.exports = router;