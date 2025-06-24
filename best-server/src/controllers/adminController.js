const pool = require("../models/dbPool");

exports.listUser = async (req, res) => {
  const sql = `select id, name, email, role, date_format(indate, '%Y-%m-%d %H:%i:%s') as indate from members order by id desc`;

  try {
    const [result] = await pool.query(sql);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
