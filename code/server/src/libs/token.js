import JWTService from '../services/jwt-service';

const jwtService = new JWTService();

export const parseTokenData = (req) => {
  try {
    const token = req.authorization.split(' ');
    const { decoded } = jwtService.verifyToken(token[1]);
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
};
