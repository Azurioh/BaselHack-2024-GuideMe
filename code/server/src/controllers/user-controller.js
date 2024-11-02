export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    try {
      const includeGuide = req.query.includeGuide === 'true';

      const users = await this.userService.getAllUsers(includeGuide);

      res.status(200).json({ data: { users } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  getUserById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const includeGuide = req.query.includeGuide === 'true';

      const user = await this.userService.getUserById(id, includeGuide);

      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(400).json({ err: 'User not found.' });
    }
  };

  createUser = async (req, res) => {
    try {
      const userData = req.body;

      const user = await this.userService.createUser(userData);

      res.status(201).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
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
}
