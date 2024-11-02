import { encryptPassword, verifyPassword } from '../libs/password.js';
import JWTService from '../services/jwt-service.js';

const jwtService = new JWTService();

export class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  loginUser = async (req, res) => {
    const userData = req.body;

    try {
      const user = await this.userService.getUserByEmail(userData.email, false);

      if (!verifyPassword(userData.password, user.password)) {
        return res.status(404).json({ err: 'Email and/or password invalid.' });
      }

      const { password, ...userWithoutPassword } = user;

      const token = jwtService.signToken(userWithoutPassword);

      return res.status(200).json({ data: { token } });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ err: 'Email and/or password invalid.' });
    }
  };

  registerUser = async (req, res) => {
    let userData = req.body;

    try {
      userData.password = encryptPassword(userData.password);

      const user = await this.userService.createUser(userData);

      const { password, ...userWithoutPassword } = user;

      const token = jwtService.signToken(userWithoutPassword);

      return res.status(201).json({ data: { token } });
    } catch (err) {
      console.error(err);
      throw new Error("Can't create the user now.");
    }
  };
}
