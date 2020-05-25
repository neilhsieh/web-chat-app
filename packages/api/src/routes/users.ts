import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Conversation } from '../models/Conversation';
export const usersRouter = Router();

// CRUD of the User in REST API

// Get list of users
usersRouter.get('/', async (_req, res) => {
  // Fetch ALL the users
  const users = await User.findAll();
  // Send them in the pipe
  res.json(users);
});

// Get list of all users IN a convo
usersRouter.get('/convoUsers/:convoId', async (req, res) => {
  const { convoId } = req.params;
  // Fetch ALL the users
  const users = await User.findAll({
    include: [{
      model: Conversation,
      where: { id: convoId }
    }]
  });
  // Send them in the pipe
  res.json(users);
});


// Search for a user
usersRouter.get('/search', async (req, res, next) => {
  const query = req.query.q;
  try {
    const users = await User.findAll({
      where: {
        firstName: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.json(users.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName
    })));
  } catch (e) {
    next(e);
  }
});

// Get ONE user by ID
usersRouter.get('/:userID', async (req, res) => {
  const { userID } = req.params;

  const user = await User.findByPk(userID);
  res.json(user);
});


// // Create a user
// usersRouter.post('/', async (req, res, next) => {

//   try {
//     const { password: plainPass, ...userData } = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const password = bcrypt.hashSync(plainPass, salt);
//     const user = new User({
//       ...userData, password
//     }); // NOTE: THIS IS DANGEROUS
//     await user.save();

//     res.json(user);
//   } catch (e) {
//     next(e);
//   }
// });

// Update a user
usersRouter.patch('/:userID', async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.userID },
      returning: true // TODO: Fix this
    });
    const user = await User.findByPk(req.params.userID);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// Update a user
usersRouter.delete('/:userID', async (req, res, next) => {
  try {
    User.destroy({
      where: { id: req.params.userID }
    });
    res.json({
      message: 'Successfully deleted user'
    });
  } catch (e) {
    next(e);
  }
});
