const asyncHandler = require('express-async-handler')

const House = require('../models/houseModel')
const Paiement = require('../models/paiementModel')

// @desc    Get Paiements
// @route   GET /api/paiements
// @access  Private
const getPaiements = asyncHandler(async (req, res) => {
    const paiements = await Paiement.find({}).populate('house', 'name')

    res.status(200).json(paiements)
    
})

// @desc    Set Paiement
// @route   POST /api/paiements
// @access  Private
const setPaiement = asyncHandler(async (req, res) => {
    if (! req.body.name || !req.body.type_paiement || !req.body.date_new_paiement || !req.body.montant || !req.body.date_paiement || !req.body.house) {
        res.status(400)
        throw new Error('Please fill all fields')
    }
    const paiement = await Paiement.create({
        name: req.body.name,
        type_paiement: req.body.type_paiement,
        date_new_paiement: req.body.date_new_paiement,
        montant: req.body.montant,
        date_paiement: req.body.date_paiement,
        house: req.body.house
    })
    res.status(200).json(paiement)
})

// @desc    Update Paiement
// @route   PUT /api/paiements/:id
// @access  Private
const updatePaiement = asyncHandler(async (req, res) => {
    console.log(req.body)
    const paiement = await Paiement.findById(req.params.id)


    if (!paiement) {
        res.status(400)
        throw new Error('Paiement not found')
    }
    
    paiement.name = req.body.name || paiement.name
    paiement.type_paiement = req.body.type_paiement || paiement.type_paiement
    paiement.date_new_paiement = req.body.date_new_paiement || paiement.date_new_paiement
    paiement.montant = req.body.montant || paiement.montant
    paiement.date_paiement = req.body.date_paiement || paiement.date_paiement
    paiement.house = req.body.house || paiement.house

    const updatedPaiement = await paiement.save()

    res.status(200).json(updatedPaiement)
        
    })

// @desc    Delete Paiement
// @route   DELETE /api/paiements/:id   
// @access  Private
const deletePaiement = asyncHandler(async (req, res) => {
    const paiement = await Paiement.findById(req.params.id)

    if (!paiement) {
        res.status(400)
        throw new Error('Paiement not found')
    }

    await paiement.remove()

    res.status(200).json({ message: 'Paiement removed' })

            
 })

// @desc    Get Paiement by id
// @route   GET /api/paiements/:id
// @access  Private
const getPaiementById = asyncHandler(async (req, res) => {
    const paiement = await Paiement.findById(req.params.id)

    if (paiement) {
        res.status(200).json(paiement)
    } else {
        res.status(404)
        throw new Error('Paiement not found')
    }

})

module.exports = {
    getPaiements,
    setPaiement,
    updatePaiement,
    deletePaiement,
    getPaiementById
}

