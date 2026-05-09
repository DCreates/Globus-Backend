import Branch from "../models/Branches.js";

// GET all branches
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE branch
export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};