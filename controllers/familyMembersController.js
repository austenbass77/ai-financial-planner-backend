const pool = require("../config/db");

// Get all family members for the logged-in user
exports.getAllFamilyMembers = async (req, res) => {
  try {
    const { userId } = req.query; // Assuming userId is passed as a query parameter
    const result = await pool.query('SELECT * FROM family_members WHERE account_id = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching family members:', error);
    res.status(500).json({ error: 'Failed to fetch family members' });
  }
};

// Add a new family member
exports.addFamilyMember = async (req, res) => {
  try {
    const { accountId, relationship, firstName, lastName, preferredName, birthDate, email, additionalInfo } = req.body;
    const result = await pool.query(
      `INSERT INTO family_members (account_id, relationship, first_name, last_name, preferred_name, birth_date, email, additional_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [accountId, relationship, firstName, lastName, preferredName, birthDate, email, additionalInfo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding family member:', error);
    res.status(500).json({ error: 'Failed to add family member' });
  }
};

// Update an existing family member
exports.updateFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { relationship, firstName, lastName, preferredName, birthDate, email, additionalInfo } = req.body;
    const result = await pool.query(
      `UPDATE family_members SET relationship = $1, first_name = $2, last_name = $3, preferred_name = $4, birth_date = $5, email = $6, additional_info = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [relationship, firstName, lastName, preferredName, birthDate, email, additionalInfo, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating family member:', error);
    res.status(500).json({ error: 'Failed to update family member' });
  }
};

// Delete a family member
exports.deleteFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM family_members WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting family member:', error);
    res.status(500).json({ error: 'Failed to delete family member' });
  }
};
