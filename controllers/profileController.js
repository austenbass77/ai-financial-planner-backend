const pool = require("../config/db");

const getProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM user_profiles WHERE user_id = $1", [userId]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { first_name, last_name, phone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO user_profiles (user_id, first_name, last_name, phone) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET first_name = $2, last_name = $3, phone = $4 RETURNING *",
      [userId, first_name, last_name, phone]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
