import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authRouter = Router();

/**
 * 1. Check if user with email exists (throw error if not)
 * 2. Compare passwords (throw error if incorrect)
 * 3. Generate a new token, and encrypt the user data in the token
 * 4. Send back the token
 */

authRouter.post('/login', async (req, res, _next) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    where: { email }
  });

  const throwError = () => {
    res.status(400);
    res.json({
      error: 'Invalid login credentials'
    });
  };

  if (!user) return throwError();
  if (!bcrypt.compareSync(password, user.password)) return throwError();

  const { password: p, ...userData } = user.toJSON() as User;
  const token = jwt.sign(userData, JWT_SECRET);

  res.json({
    token,
    userId: user.id
  });
});

// Create a user
authRouter.post('/signup', async (req, res, next) => {
  const { password: plainPass, email, ...userData } = req.body;
  const user = await User.findOne({
    where: { email }
  });

  const throwError = () => {
    res.json({
      error: 'Please use a different email.'
    });
  };

  if (user) return throwError();

  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(plainPass, salt);
    const user = new User({
      ...userData, email, password
    }); // NOTE: THIS IS DANGEROUS
    await user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
});

