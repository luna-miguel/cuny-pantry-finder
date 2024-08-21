const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

/*
schoolName:"TEST Hostos",
centerName:"HCC Food Pantry",
centerInfo:"One Stop Center, Savoy Building, Fl 1 D-101, Bronx, NY 10451",
email:"mcruz@hostos.cuny.edu",
phone:"718-518-4141",
appointmentInfo:"Appointment only",
link:"https://www.ccny.cuny.edu"
*/

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
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true
  },
  phone: {
    type: Number,
    required: true
  },
  appointmentRequired: {
    type: Boolean,
    required: true
  },
  link: {
    type:String,
    required: true
  }

  
});

module.exports = mongoose.model('School', CampusSchema);