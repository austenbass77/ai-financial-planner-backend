const { FamilyMember } = require('../models');

const getFamilyMembers = async (req, res) => {
  try {
    const familyMembers = await FamilyMember.findAll({
      where: { account_id: req.user.id },
    });
    res.json(familyMembers);
  } catch (error) {
    console.error('Error fetching family members:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addFamilyMember = async (req, res) => {
  try {
    const { relationship, firstName, lastName, preferredName, birthDate, email, additionalInfo } = req.body;

    const newFamilyMember = await FamilyMember.create({
      account_id: req.user.id,
      relationship,
      first_name: firstName,
      last_name: lastName,
      preferred_name: preferredName,
      birth_date: birthDate,
      email,
      additional_info: additionalInfo,
    });

    res.json(newFamilyMember);
  } catch (error) {
    console.error('Error adding family member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { relationship, firstName, lastName, preferredName, birthDate, email, additionalInfo } = req.body;

    const familyMember = await FamilyMember.findOne({
      where: { id, account_id: req.user.id },
    });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    familyMember.relationship = relationship || familyMember.relationship;
    familyMember.first_name = firstName || familyMember.first_name;
    familyMember.last_name = lastName || familyMember.last_name;
    familyMember.preferred_name = preferredName || familyMember.preferred_name;
    familyMember.birth_date = birthDate || familyMember.birth_date;
    familyMember.email = email || familyMember.email;
    familyMember.additional_info = additionalInfo || familyMember.additional_info;

    await familyMember.save();

    res.json(familyMember);
  } catch (error) {
    console.error('Error updating family member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;

    const familyMember = await FamilyMember.findOne({
      where: { id, account_id: req.user.id },
    });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    await familyMember.destroy();

    res.json({ message: 'Family member deleted successfully' });
  } catch (error) {
    console.error('Error deleting family member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
};
