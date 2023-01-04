const express = require('express')
const router = express.Router()
const {
    getPaiements,
    setPaiement,
    updatePaiement,
    deletePaiement,
    getPaiementById
} = require('../controllers/paiementController')

router.route('/').get(getPaiements).post(setPaiement)
router.route('/:id').put(updatePaiement).delete(deletePaiement).get(getPaiementById)

module.exports = router