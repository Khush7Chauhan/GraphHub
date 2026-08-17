import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export const getAuthenticatedUser = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;
    if (!token) {
        return null;
    }
    try {
        if (!JWT_SECRET) {
            return null;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=auth.js.map