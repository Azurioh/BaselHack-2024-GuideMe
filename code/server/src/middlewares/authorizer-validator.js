import JWTService from '../services/jwt-service.js';

const authorizerValidator = () => {
  const jwtService = new JWTService();

  return (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(403).json({ err: 'Forbidden.' });
      }

      const token = req.headers.authorization.split(' ');
      if (token.length !== 2 || token[0] !== 'Bearer') {
        return res.status(403).json({ err: 'Forbidden.' });
      }

      const { _, expired } = jwtService.verifyToken(token[1]);

      if (expired) {
        return res.status(403).json({ err: 'Forbidden.' });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({ err: 'Forbidden.' });
    }
  };
};

export default authorizerValidator;
