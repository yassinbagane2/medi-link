const db = require('../models/models')



const getPatients = async (req, res) => {
  try {
    const healthcareProvider = await db.HealthcareProvider.findById(req.user.id);

    if (!healthcareProvider) {
      return res.status(404).json({status:false, message: "Healthcare provider not found" });
    }

    const patientsIds = healthcareProvider.patients
      .filter((p) => p.status === "Approved")
      .map((p) => p.patientId);
    const patients = await db.Patient.find({ _id: patientsIds });

    res.status(200).json({ status: true, data: patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, message: "An error occurred while fetching patients" });
  }
};
const getPendingPatients = async (req, res) => {
  try {
    console.log(req.user.id)
    const healthcareProvider = await db.HealthcareProvider.findById(req.user.id);

    if (!healthcareProvider) {
      return res.status(404).json({status: false, message: "Healthcare provider not found" });
    }

    const patientsIds = healthcareProvider.patients
      .filter((p) => p.status === "Pending")
      .map((p) => p.patientId);
    const patients = await db.Patient.find({ _id: patientsIds });

    res.status(200).json({ status: true, data: patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({status :false, message: "An error occurred while fetching patients" });
  }
};

const getProviderRatingsAndReviews = async (req, res) => {
  try {
    const provider = await db.HealthcareProvider.findById(req.params.providerId)
      .populate('ratings')
      .exec();

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const ratingsAndReviews = provider.ratings;
    return res.status(200).json({ data: ratingsAndReviews });
  } catch (error) {
  
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const setavailibility = async (req, res) => {
  try {
    const healthcareProvider = await db.HealthcareProvider.findById(req.user.id);

    if (!healthcareProvider) {
      return res.status(404).json({ message: "Healthcare provider not found" });
    }

    const newAvailibility = new db.Availability({
      provider: healthcareProvider._id,
      day: req.body.day,
      start: req.body.start,
      end: req.body.end
    });

    const savedAvailibility = await newAvailibility.save();
    healthcareProvider.availability.push(savedAvailibility._id);
    await healthcareProvider.save();

    res.status(201).json({ message: 'availability added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding availability' });
  }
};

const setexperience = async (req, res) => {
  try {
    const healthcareProvider = await db.HealthcareProvider.findById(req.user.id);

    if (!healthcareProvider) {
      return res.status(404).json({ message: "Healthcare provider not found" });
    }

    const newexperience = new db.Experience({
      provider: healthcareProvider._id,
      position: req.body.position,
      institution: req.body.institution,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
    });

    const savedexperience = await newexperience.save();
    healthcareProvider.experience.push(savedexperience._id);
    await healthcareProvider.save();

    res.status(201).json({ message: 'experience added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding experience' });
  }
};
const seteducation = async (req, res) => {
  try {
    const healthcareProvider = await db.HealthcareProvider.findById(req.user.id);

    if (!healthcareProvider) {
      return res.status(404).json({ message: "Healthcare provider not found" });
    }

    const neweducation = new db.Education({
      provider: healthcareProvider._id,
      degree: req.body.degree,
      institution: req.body.institution,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
    });

    const savededucation = await neweducation.save();
    healthcareProvider.education.push(savededucation._id);
    await healthcareProvider.save();

    res.status(201).json({ message: 'education added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding education' });
  }
};

const updateavailibility = async (req, res) => {
  const UserId = req.params.UserId;

  try {
    const availability = await db.Availability.findById(UserId);

    if (!availability) {
      return res.status(404).json({ message: "availability not found" });
    }

    const isAuthorized = availability.provider === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const availibilityUpdates = {};
    const availibilityFields = ['day', 'start', 'end'];

    availibilityFields.forEach((field) => {
      if (req.body[field]) {
        availibilityUpdates[field] = req.body[field];
      }
    });

    Object.assign(availability, availibilityUpdates);

    const updatedavailibility = await availability.save();
    res.status(200).json({ message: 'Availibility updated successfully', data: updatedavailibility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the Availibility' });
  }
};

const updateexperience = async (req, res) => {
  const UserId = req.params.UserId;

  try {
    const experience = await db.Experience.findById(UserId);

    if (!experience) {
      return res.status(404).json({ message: "experience not found" });
    }

    const isAuthorized = experience.provider === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const experienceUpdates = {};
    const experienceFields = ['position', 'institution', 'startYear', 'endYear'];

    experienceFields.forEach((field) => {
      if (req.body[field]) {
        experienceUpdates[field] = req.body[field];
      }
    });

    Object.assign(experience, experienceUpdates);

    const updatedexperience = await experience.save();
    res.status(200).json({ message: 'experience updated successfully', data: updatedexperience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the experience' });
  }
};
const updateeducation = async (req, res) => {
  const UserId = req.params.UserId;

  try {
    const education = await db.Education.findById(UserId);

    if (!education) {
      return res.status(404).json({ message: "education not found" });
    }

    const isAuthorized = education.provider === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const educationUpdates = {};
    const educationFields = ['degree', 'institution', 'startYear', 'endYear'];

    educationFields.forEach((field) => {
      if (req.body[field]) {
        educationUpdates[field] = req.body[field];
      }
    });

    Object.assign(education, educationUpdates);

    const updatededucation = await education.save();
    res.status(200).json({ message: 'education updated successfully', data: updatededucation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the education' });
  }
};

const getavailibility = async (req, res) => {
  try {
    const availibility = await db.Availability.findById(req.params.id);

    if (!availibility) {
      return res.status(404).json({ message: 'availibility not found' });
    }

    const provider = await db.HealthcareProvider.findById(availibility.provider);
    const isAuthorized =
      provider._id === req.user.id ||
      provider.patients.some(
        patient =>
          patient.patientId === req.user.id &&
          patient.status === 'Approved'
      );

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json({ data: availibility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the availibility' });
  }
};
const getexperience = async (req, res) => {
  try {
    const experience = await db.Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const provider = await db.HealthcareProvider.findById(experience.provider);
    const isAuthorized =
      provider._id === req.user.id ||
      provider.patients.some(
        patient =>
          patient.patientId === req.user.id &&
          patient.status === 'Approved'
      );

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json({ data: experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the experience' });
  }
};

const geteducation = async (req, res) => {
  try {
    const education = await db.Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    const provider = await db.HealthcareProvider.findById(education.provider);
    const isAuthorized =
      provider._id === req.user.id ||
      provider.patients.some(
        patient =>
          patient.patientId === req.user.id &&
          patient.status === 'Approved'
      );

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json({ data: education });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the education' });
  }
};


const provider = {
  getPatients,
  getPendingPatients,
  getProviderRatingsAndReviews,
  setavailibility,
  seteducation,
  setexperience,
  getavailibility,
  geteducation,
  getexperience,
  updateavailibility,
  updateeducation,
  updateexperience,
}


module.exports = provider