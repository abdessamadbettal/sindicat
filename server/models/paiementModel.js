const mongoose = require('mongoose')

const paiementSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    date_paiement: {
        type: String,
        required: [true, 'Please add an date_paiement'],
    },
    montant: {
        type: Number,
        required: [true, 'Please add a montant'],
    },
    type_paiement: {
        type: String,
        required: [true, 'Please add a type_paiement'],
    },
    //  for the relation between paiement and house 
    house: {
        type: mongoose.Schema.ObjectId,
        ref: 'House',
        required: true,
    } ,
    date_new_paiement: {
        type: String,
        required: [true, 'Please add an date_new_paiement'],
    }


   
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Paiement', paiementSchema)
