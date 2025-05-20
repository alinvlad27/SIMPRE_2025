import { connectToDatabase } from '../../../lib/mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOk, sendBadRequest, sendServerError } from '../../../utils/apiMethods';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { users } = req.query;
  const action = users[0];

  if (req.method === 'POST' && action === 'register') {
    try {
      const { username, email, password } = req.body;
      const user = await db.collection('users').findOne({ email });
      if (user) {
        return sendBadRequest(res, 'The email already exists');
      }
      const usernameExists = await db.collection('users').findOne({ username });
      if (usernameExists) {
        return sendBadRequest(res, 'Username already exists');
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await db.collection('users').insertOne({
        username,
        email,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return sendOk(res, { msg: 'Sign up successful' });
    } catch (err) {
      return sendServerError(res, err.message);
    }
  }

  if (req.method === 'POST' && action === 'login') {
    try {
      const { email, password } = req.body;
      const user = await db.collection('users').findOne({ email });
      if (!user) {
        return sendBadRequest(res, 'User does not exist');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return sendBadRequest(res, 'Incorrect password');
      }
      const payload = { id: user._id.toString(), name: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
      return sendOk(res, { token });
    } catch (err) {
      return sendServerError(res, err.message);
    }
  }

  if (req.method === 'GET' && action === 'verify') {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(200).json(false);
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });
      if (!user) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  return res.status(404).json({ msg: 'Route not found' });
}