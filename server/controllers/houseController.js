const asyncHandler = require('express-async-handler')

const House = require('../models/houseModel')

// @desc    Get houses
// @route   GET /api/houses
// @access  Private
const getHouses = asyncHandler(async (req, res) => {
  const houses = await House.find({})

  res.status(200).json(houses)
})

// @desc    Get house by ID
// @route   GET /api/houses/:id
// @access  Private
const getHouseById = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id)

  if (house) {
    res.status(200).json(house)
  } else {
    res.status(404)
    throw new Error('house not found')
  }
})

// @desc    Set house
// @route   POST /api/houses
// @access  Private
const setHouse = asyncHandler(async (req, res) => {
// console.log(req.body)
  if(!req.body.name || !req.body.address || !req.body.city || !req.body.rooms ||  !req.body.price || !req.body.etage || !req.body.bloc){
    res.status(400)
    throw new Error('Please fill all fields')
  }
  const house = await House.create({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    rooms: req.body.rooms,
    price: req.body.price,
    etage: req.body.etage,
    bloc: req.body.bloc
  })
  res.status(200).json(house)
})

// @desc    Update house
// @route   PUT /api/houses/:id
// @access  Private
const updateHouse = asyncHandler(async (req, res) => {
  console.log(req.body)
  const house = await House.findById(req.params.id)
  console.log(house)

  if (!house) {
    res.status(400)
    throw new Error('house not found')
  }
  const { name, address, city, rooms, price, etage, bloc } = req.body
  const updatedHouse = await House.findByIdAndUpdate(
    req.params.id,
    {
      name,
      address,
      city,
      rooms,
      price,
      etage,
      bloc
    },
    { new: true } // return the new house instead of the old one
  )

  res.status(200).json(updatedHouse)

})

// @desc    Delete house
// @route   DELETE /api/houses/:id
// @access  Private
const deleteHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id)

  if (!house) {
    res.status(400)
    throw new Error('house not found')
  }

  await house.remove()

  res.status(200).json({ message: 'house removed' })
})

module.exports = {
  getHouses,
  setHouse,
  updateHouse,
  deleteHouse,
  getHouseById,
}
