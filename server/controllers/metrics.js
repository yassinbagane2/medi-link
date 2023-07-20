const db = require('../models/models');

const getmetrics = async (req, res) => {
  try {
    const metrics = await db.Metric.findById(req.params.id);

    if (!metrics) {
      return res.status(404).json({ message: 'metrics not found' });
    }

    res.status(200).json({ data: metrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while fetching the metrics' });
  }
};

const createmetrics = async (req, res) => {
  try {
    const nom = req.body.metric;
    const metrics = await db.Metric.create({ nom });

    res.status(201).json({ message: 'metrics created successfully', data: metrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while creating the metrics' });
  }
};

const updatemetrics = async (req, res) => {
  try {

    const metrics = await db.Metric.findById(req.params.id);

    if (!metrics) {
      return res.status(404).json({ message: 'metrics not found' });
    }

    metrics.nom = req.body.metric;

    const updatedmetrics = await metrics.save();
    res.status(200).json({ message: 'metrics updated successfully', data: updatedmetrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while updating the metrics' });
  }
};

const deletemetrics = async (req, res) => {
  try {


    const metrics = await db.Metric.findById(req.params.id);

    if (!metrics) {
      return res.status(404).json({ message: 'metrics not found' });
    }

    await db.Metric.deleteOne({ _id: metrics._id })
    res.status(200).json({ message: 'metrics deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while deleting the metrics' });
  }
};

const getallmetrics = async (req, res) => {
  try {
    const allmetrics = await db.Metric.find();
    res.status(200).json({ data: allmetrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred\n while fetching the metrics' });
  }
};

const metrics = {
  createmetrics,
  getmetrics,
  updatemetrics,
  deletemetrics,
  getallmetrics
};

module.exports = metrics;
