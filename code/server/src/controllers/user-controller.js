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
      const includeGuide = req.query.includeGuide === 'true';

      const users = await this.userService.getAllUsers(includeGuide);

      res.status(200).json({ data: users });
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

      res.status(200).json({ data: user });
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

      res.status(200).json({ data: user });
    } catch (err) {
      console.error(err);
      res.status(400).json({ err: 'User not found.' });
    }
  };

  createUser = async (req, res) => {
    try {
      const userData = req.body;
      
      const user = await this.userService.createUser(userData);

      res.status(201).json({ data: user, token: this.createToken(user.firstname, user.lastname) });
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
