const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema({
  schoolName: {
      type: String,
      required: true
  },
  centerName: {
      type: String,
      required: true
  },
  centerInfo: {
    type: Array, // array of strings
    required: true
  },
  centerHours: {
    type:Array,
    required:true
  },
  email: {
      type: String,
      required: true
  },
  phone: {
    type: String,
    required: true
  },
  appointmentRequired: {
    type: Boolean,
    required: true,
    default: true
  },
  appointmentLink: {
    type:String,
  },
  informationLink: {
    type:String,
    required: true
  },
  lat: {
    type:Number,
    required: true
  },
  lng: {
    type:Number,
    required: true
  },
  additionalInfo: {
    type:String,
  },
  cunywide: {
    type:Boolean,
    required: true,
    default: true
  },
  
});

module.exports = mongoose.model('School', CampusSchema);