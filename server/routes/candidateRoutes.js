const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');


router.post('/', candidateController.createCandidate);


router.get('/', candidateController.getAllCandidates);


router.put('/:id/status', candidateController.updateCandidateStatus);


router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;