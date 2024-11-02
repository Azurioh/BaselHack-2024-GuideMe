import jwt from 'jsonwebtoken';

export default class JWTService {
  constructor() {
    this.secretKey = process.env.JWT_SECRET;
  }

  signToken = (payload, expiresIn = '72h') => {
    try {
      const token = jwt.sign(payload, this.secretKey, { expiresIn });
      return `Beare ${token}`;
    } catch (error) {
      console.error('Error signing the token:', error);
      throw new Error('Error when signing token: ', error);
    }
  };

  signTokenNoExpiration = (payload) => {
    try {
      const token = jwt.sign(payload, this.secretKey);
      return `Beare ${token}`;
    } catch (error) {
      console.error('Error signing the token:', error);
      throw new Error('Error when signing token: ', error);
    }
  };

  verifyToken = (token) => {
    let decoded;
    let tokenExpired = false;

    try {
      decoded = jwt.verify(token, this.secretKey);
    } catch (error) {
      console.error('Error verifying the token:', error);
      if (error instanceof jwt.TokenExpiredError) {
        console.error('Token expired');
        tokenExpired = true;
      } else {
        throw new Error('Invalid token');
      }
    }

    return { decoded, tokenExpired };
  };
}
