const db = require('../models/models');

const getSpeciality = async (req, res) => {
  try {
    const speciality = await db.Speciality.findById(req.params.id);

    if (!speciality) {
      return res.status(404).json({ message: 'Speciality not found' });
    }

    res.status(200).json({ data: speciality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while fetching the speciality' });
  }
};

const createSpeciality = async (req, res) => {
  try {
    
    const nom = req.body.speciality;
    const speciality = await db.Speciality.create({ nom });
    
    res.status(201).json({ message: 'Speciality created successfully', data: speciality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while creating the speciality' });
  }
};

const updateSpeciality = async (req, res) => {
  try {

    const speciality = await db.Speciality.findById(req.params.id);

    if (!speciality) {
      return res.status(404).json({ message: 'Speciality not found' });
    }

    speciality.nom = req.body.speciality;

    const updatedSpeciality = await speciality.save();
    res.status(200).json({ message: 'Speciality updated successfully', data: updatedSpeciality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while updating the speciality' });
  }
};

const deleteSpeciality = async (req, res) => {
  try {


    const speciality = await db.Speciality.findById(req.params.id);

    if (!speciality) {
      return res.status(404).json({ message: 'Speciality not found' });
    }
    await db.Speciality.deleteOne({ _id: speciality._id })

    res.status(200).json({ message: 'Speciality deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while deleting the speciality' });
  }
};

const getSpecialities = async (req, res) => {
  try {
    const specialities = await db.Speciality.find();

    res.status(200).json({ data: specialities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while fetching the specialities' });
  }
};

const speciality = {
  createSpeciality,
  getSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getSpecialities
};

module.exports = speciality;
