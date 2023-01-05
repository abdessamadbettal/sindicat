const express = require('express')
const router = express.Router()
const {
  getHouses,
  setHouse,
  updateHouse,
  deleteHouse,
  getHouseById ,
} = require('../controllers/houseController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get( getHouses).post( setHouse)
router.route('/:id').delete( deleteHouse).put( updateHouse).get( getHouseById)

module.exports = router
