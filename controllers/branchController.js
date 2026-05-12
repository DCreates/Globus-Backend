import Branch from "../models/Branches.js";

const normalizeBranchPayload = (body) => ({
  ...body,
});

// GET all branches
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE branch
export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(normalizeBranchPayload(req.body));
    res.status(201).json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE branch
export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    Object.assign(branch, normalizeBranchPayload(req.body));
    await branch.save();
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};