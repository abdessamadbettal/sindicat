const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(401)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })


  if (user) {
    const token =  generateToken(user._id) ;
    user.token = token;
    await user.save();
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: user.token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // console.log("test")
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
    
  

  // Check for user email
  const user = await User.findOne({ email })
  // console.log(user)

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: user.token,
      api_token: user.token,
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Verify user
// @route   GET /api/users/verify_token
// @access  Public
const verifyToken = asyncHandler(async (req, res) => {
  console.log(req.headers)
  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decoded)
  const user = await User.findById(decoded.id)
  console.log(user)
  if (user.role === 'admin') {
    res.status(200).json({ 
      _id: user.id,
      name: user.name,
      email: user.email,
      token: user.token,
      api_token: user.token,
     }) 
  } else {
    res.status(401)
    throw new Error('Not authorized')
  }
  
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  verifyToken,
}
