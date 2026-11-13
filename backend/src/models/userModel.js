const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const userModel = {
  async create({ name, email, password, role = 'customer', gender, birth_date, province }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, gender, birth_date, province) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, name, email, role, gender, birth_date, province, created_at`,
      [name, email, hashedPassword, role, gender, birth_date, province]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query(
      `SELECT id, name, email, password, role, gender, birth_date, province, created_at 
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT id, name, email, role, gender, birth_date, province, created_at 
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  async getAllCustomers() {
    const result = await pool.query(
      `SELECT id, name, email, role, gender, birth_date, province, created_at 
       FROM users WHERE role = 'customer' 
       ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async updateProfile(id, updates) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = ['name', 'email', 'gender', 'birth_date', 'province'];
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING id, name, email, role, gender, birth_date, province, created_at`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },
};

module.exports = userModel;