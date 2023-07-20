const mongoose = require('mongoose')
const options = { discriminatorKey: 'role' }

const UserSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v)
        },
        message: 'Invalid email format.',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    picture: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    socketId: {
      type: String,
      required: false,
    },
    deviceToken: {
      type: String,
      required: false,
    },
    connected: {
      type: Boolean,
      default: false,
    },
    resetCode: {
      type: String,
      required: false,
    },
  },
  options
)
const healthcareProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        if (this.role === 'laboratory' || this.role === 'medicalCentre') {
          return true
        } else return false
      },
      minlength: 3,
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved'],
      default: 'Pending',
    },
    type: {
      type: String,
      enum: ['doctor', 'medicalCentre', 'laboratory'],
      required: true,
      default: 'doctor',
    },
    appointmentprice: {
      type: Number,
    },
    firstName: {
      type: String,
      required: function () {
        if (this.type == 'doctor') {
          return true
        } else {
          return false
        }
      },
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: function () {
        if (this.type == 'doctor') {
          return true
        } else {
          return false
        }
      },
      minlength: 3,
      maxlength: 20,
    },
    speciality: {
      type: String,
    },
    patients: [
      {
        patientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient',
        },
        status: {
          type: String,
          enum: ['Pending', 'Approved'],
          default: 'Pending',
        },
      },
    ],
    description: {
      type: String,
      maxlength: 300,
    },
    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    buildingpictures: [
      {
        url: String,
      },
    ],
    verifciation: {
      type: String,
    },
  },
  options
)

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    dateofbirth: {
      type: Date,
      required: false,
    },
    civilstate: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
      default: 'Single',
    },
    nembredenfant: {
      type: String,
    },
    prescriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
      },
    ],
    emergencyContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmergencyContact',
      },
    ],
    healthcareproviders: [
      {
        healthcareproviderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        type: {
          type: String,
        },
        speciality: {
          type: String,
        },
        status: {
          type: String,
          enum: ['Pending', 'Approved'],
          default: 'Pending',
        },
      },
    ],
    allergys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allergy',
      },
    ],
    diseases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
      },
    ],
    healthcareMetrics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthMetric',
      },
    ],
    radiographies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Radiography',
      },
    ],
    surgeries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Surgerie',
      },
    ],
    symptomChecks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SymptomCheck',
      },
    ],
    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    labresult: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Labresult',
      },
    ],
  },
  options
)
const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
  },
  options
)

const User = mongoose.model('User', UserSchema)
const HealthcareProvider = User.discriminator(
  'HealthcareProvider',
  healthcareProviderSchema
)
const Patient = User.discriminator('Patient', patientSchema)
const Admin = User.discriminator('Admin', adminSchema)

module.exports = {
  User,
  HealthcareProvider,
  Patient,
  Admin,
}
