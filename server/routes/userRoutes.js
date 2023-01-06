const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  verifyToken
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/verify_token', verifyToken)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
