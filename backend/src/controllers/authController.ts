import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import User from '../models/User';

// 1. REGISTER CONTROLLER
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false, 
        message: 'User already registered with this email'
      });
      return;
    }

  
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash,
      role: role || 'Sales User'
    });

    await newUser.save();

    res.status(201).json({
      success: true, 
      message: 'User registered successfully!',
      user: {
        id: String(newUser._id),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// 2. LOGIN CONTROLLER
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }
const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

   const secretKey: Secret = process.env.JWT_SECRET || 'fallbackSecretKey123';

   const token = jwt.sign(
      {
        id: String(user._id),
        role: user.role
      },
      secretKey,
      {
        expiresIn: '1d' 
      } as SignOptions
    );

   res.status(200).json({
      success: true, 
      message: 'Login successful',
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};