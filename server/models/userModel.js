const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    } ,
    token: {
      type: String,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
