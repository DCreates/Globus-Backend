import Product from "../models/Product.js";

const normalizeProductPayload = (body) => {
  const payload = { ...body };

  if (payload.peice !== undefined && payload.price === undefined) {
    payload.price = payload.peice;
  }

  if (payload.price !== undefined && payload.price !== null && payload.price !== "") {
    const parsedPrice = Number(payload.price);
    if (!Number.isNaN(parsedPrice)) {
      payload.price = parsedPrice;
    }
  }

  delete payload.peice;
  return payload;
};

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(normalizeProductPayload(req.body));
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.updateOne(normalizeProductPayload(req.body));
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};