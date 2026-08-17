import { prisma } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';
/**
 * Registers a new user, hashes their password, and returns a token + user data.
 */
export const register = async (data) => {
    console.log("=== INCOMING DATA ===", data); // Let's verify what arrived!
    try {
        // 1. Check if username or email already exists
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
        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // 3. Create the user
        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
            },
        });
        // 4. Generate JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        return {
            token,
            user,
        };
    }
    catch (error) {
        // THIS is the magic line. It forces the full Prisma error into your terminal!
        console.error("🔥 PRISMA CRASHED! Here is the real reason:");
        console.dir(error, { depth: null });
        throw new Error("Database crashed. Check the terminal for details.");
    }
};
/**
 * Verifies a user's credentials and returns a token + user data.
 */
export const login = async (data) => {
    // 1. Find the user by email
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    // 2. Compare the provided password with the hashed password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password.');
    }
    // 3. Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return {
        token,
        user,
    };
};
//# sourceMappingURL=auth.service.js.map