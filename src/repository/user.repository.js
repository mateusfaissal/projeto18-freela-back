import { db } from "../database/db.connection.js";

export function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export function createUser(name, email, hash, phone, cpf) {
    return db.query(`
    INSERT INTO users 
      (name, email, password, phone, cpf)
    VALUES 
     ($1, $2, $3, $4, $5);
    `, [name, email, hash, phone, cpf]);
}

export function loginUser(email) {
  return db.query(`
  SELECT users.id, users.name, users.email, users.password, sessions.token
  FROM users
  LEFT JOIN sessions ON users.id = sessions."userId"
  WHERE users.email = $1;
`, [email])
}

export function getToken(token) {
  return db.query(`
  SELECT users.id, users.name, users.email, sessions.token
  FROM sessions
  LEFT JOIN users ON users.id = sessions."userId"
  WHERE sessions.token = $1;
  `, [token])
}