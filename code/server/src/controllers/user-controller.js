const bcrypt = require('bcrypt');

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

    
  createToken = (firstname , lastname) =>  {
    const token = jwt.sign({firstname, lastname}, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
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

      userData.password = await bcrypt.hash(userData.password, 10);
      
      const user = await this.userService.createUser(userData);
      res.status(201).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
    res.status(201).json({ data: user, token: this.createToken(user.firstname, user.lastname) });
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

  likeGuideline = async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const guidelineId = parseInt(req.params.guidelineId);
      const user = await this.userService.likeGuideline(userId, guidelineId);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  unlikeGuideline = async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const guidelineId = parseInt(req.params.guidelineId);
      await this.userService.unlikeGuideline(userId, guidelineId);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  saveGuideline = async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const guidelineId = parseInt(req.params.guidelineId);
      const user = await this.userService.saveGuideline(userId, guidelineId);
      res.status(200).json({ data: { user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  unsaveGuideline = async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const guidelineId = parseInt(req.params.guidelineId);
      await this.userService.unsaveGuideline(userId, guidelineId);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  authenticateUser = async (req, res) => {
      const { email, password } = req.body;
      
      const user = await this.userService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
      res.status(200).json({ data: user, token: this.createToken(user.firstname, user.lastname) });  
  };
}
