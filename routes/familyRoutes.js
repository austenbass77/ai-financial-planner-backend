const express = require('express');
const { getFamilyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember } = require('../controllers/familyController');
const { authenticateUser } = require('../middleware/authenticateUser');

const router = express.Router();

// Apply the authenticateUser middleware to all routes
router.use(authenticateUser);

// Routes
router.get('/', getFamilyMembers);
router.post('/', addFamilyMember);
router.put('/:id', updateFamilyMember);
router.delete('/:id', deleteFamilyMember);

module.exports = router;
