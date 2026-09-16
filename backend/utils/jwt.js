const jwt = require('jsonwebtoken');

/**
 * Generate a signed JSON Web Token (JWT)
 * @param {Object} payload - User information payload (e.g. { id, email })
 * @returns {String} Signed JWT
 */
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing.');
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
    issuer: 'securex-auth',
    audience: 'securex-client',
  });
};

/**
 * Verify a JSON Web Token
 * @param {String} token - Bearer JWT token string
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer: 'securex-auth',
    audience: 'securex-client',
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
