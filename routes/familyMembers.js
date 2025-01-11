const express = require('express');
const router = express.Router();
const familyMembersController = require('../controllers/familyMembersController');

// Define routes for family members
router.get('/', familyMembersController.getAllFamilyMembers);
router.post('/', familyMembersController.addFamilyMember);
router.put('/:id', familyMembersController.updateFamilyMember);
router.delete('/:id', familyMembersController.deleteFamilyMember);

module.exports = router;
