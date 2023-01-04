const asyncHandler = require('express-async-handler')

const House = require('../models/houseModel')
const Paiement = require('../models/paiementModel')

// @desc    Get Paiements
// @route   GET /api/paiements
// @access  Private
const getPaiements = asyncHandler(async (req, res) => {
    
})

// @desc    Set Paiement
// @route   POST /api/paiements
// @access  Private
const setPaiement = asyncHandler(async (req, res) => {
        
    })

// @desc    Update Paiement
// @route   PUT /api/paiements/:id
// @access  Private
const updatePaiement = asyncHandler(async (req, res) => {
        
    })

// @desc    Delete Paiement
// @route   DELETE /api/paiements/:id   
// @access  Private
const deletePaiement = asyncHandler(async (req, res) => {
            
        })

// @desc    Get Paiement by id
// @route   GET /api/paiements/:id
// @access  Private
const getPaiementById = asyncHandler(async (req, res) => {

})

module.exports = {
    getPaiements,
    setPaiement,
    updatePaiement,
    deletePaiement,
    getPaiementById
}

