const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'All fields required' });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ success: false, message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    success: true,
    data: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id),
  });
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'All fields required' });

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ success: false, message: 'Invalid email or password' });

  res.json({
    success: true,
    data: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id),
  });
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};

module.exports = { register, login, getMe };