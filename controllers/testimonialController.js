import Testimonial from "../models/Testimonials.js";

// GET all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE testimonial
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};