import { prisma } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';
export const register = async (data: RegisterInput) => {
  console.log("=== INCOMING DATA ===", data); // Let's verify what arrived!

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email },
        ],
      },
    });

    if (existingUser) {
      throw new Error('Username or email is already taken.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user,
    };

  } catch (error: any) {
    console.error(" PRISMA CRASHED! Here is the real reason:");
    console.dir(error, { depth: null }); 
    throw new Error("Database crashed. Check the terminal for details.");
  }
};

export const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid email or password.');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  return {
    token,
    user,
  };
};