export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

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

  // createUser = async (req, res) => {
  //   try {
  //     const userData = req.body;

  //     userData.password = await bcrypt.hash(userData.password, 10);

  //     const user = await this.userService.createUser(userData);
  //     res.status(201).json({ data: { user } });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ err: 'Internal server error.' });
  //   }
  //   res.status(201).json({ data: user, token: this.createToken(user.firstname, user.lastname) });
  // };
}
