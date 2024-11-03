import { parseTokenData } from '../libs/token';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    try {
      const includeGuide = req.query.includeGuide === 'true';

      const users = await this.userService.getAllUsers(includeGuide);

      res.status(200).json({
        data: users.map((user) => {
          const { password, ...userData } = user;

          return userData;
        }),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.body;
      const includeGuide = req.query.includeGuide === 'true';

      const user = await this.userService.getUserById(id, includeGuide);

      const { password, ...userData } = user;

      res.status(200).json({ data: userData });
    } catch (err) {
      console.error(err);
      res.status(400).json({ err: 'User not found.' });
    }
  };

  getUserByEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const includeGuide = req.query.includeGuide === 'true';

      const user = await this.userService.getUserByEmail(email, includeGuide);

      const { password, ...userData } = user;

      res.status(200).json({ data: userData });
    } catch (err) {
      console.error(err);
      res.status(400).json({ err: 'User not found.' });
    }
  };

  getUserMe = async (req, res) => {
    try {
      const token = parseTokenData(req);
      const includeGuide = req.query.includeGuide === 'true';
      const user = await this.userService.getUserById(token.id, includeGuide);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(403).json({ err: 'Forbidden.' });
    }
  };


  updateUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userData = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  updateUserMe = async (req, res) => {
    try {
      const token = parseTokenData(req);
      const userData = req.body;
      const user = await this.userService.updateUser(token.id, userData);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await this.userService.deleteUser(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  likeGuideline = async (req, res) => {
    try {
      const token = parseTokenData(req);
      const guidelineId = parseInt(req.params.guidelineId);
      const user = await this.userService.likeGuideline(token.id, guidelineId);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  unlikeGuideline = async (req, res) => {
    try {
      const token = parseTokenData(req);
      const guidelineId = parseInt(req.params.guidelineId);
      await this.userService.unlikeGuideline(token.id, guidelineId);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  saveGuideline = async (req, res) => {
    try {
      const token = parseTokenData(req);
      const guidelineId = parseInt(req.params.guidelineId);
      const user = await this.userService.saveGuideline(token.id, guidelineId);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  unsaveGuideline = async (req, res) => {
    try {
      const token = parseTokenData(req);
      const guidelineId = parseInt(req.params.guidelineId);
      await this.userService.unsaveGuideline(token.id, guidelineId);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };
}
