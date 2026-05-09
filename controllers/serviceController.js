import Service from "../models/CommunityServices.js";

// GET all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE service
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};