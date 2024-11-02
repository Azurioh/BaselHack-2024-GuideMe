import { AjvService } from '../services/ajv-service.js';

const requestValidator = (schema) => {
  const ajvService = new AjvService();

  return (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).json({ err: 'No body provided.' });
      }

      ajvService.validate(req.body, schema);

      next();
    } catch (err) {
      console.error(err);
      return res.status(400).json({ err: 'Invalid request body.' });
    }
  };
};

export default requestValidator;
