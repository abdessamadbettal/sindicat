const mongoose = require('mongoose')

const houseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    etage: {
      type: Number,
      required: [true, 'Please add a etage'],
    },
    rooms: {
      type: Number,
      required: [true, 'Please add a rooms'],
    },
    bloc: {
      type: String,
      required: [true, 'Please add a bloc'],
    }


   
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('House', houseSchema)
