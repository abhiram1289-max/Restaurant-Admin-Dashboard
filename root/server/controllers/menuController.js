import MenuItem from "../models/MenuItem.js";

export const getMenu = async (req, res) => {
  const { category, isAvailable, minPrice, maxPrice } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (isAvailable !== undefined) filter.isAvailable = isAvailable;
  if (minPrice || maxPrice)
    filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

  const menu = await MenuItem.find(filter);
  res.json(menu);
};

export const searchMenu = async (req, res) => {
  const q = req.query.q;
  const results = await MenuItem.find({ $text: { $search: q } });
  res.json(results);
};

export const createMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};

export const updateMenuItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

export const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const toggleAvailability = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  item.isAvailable = !item.isAvailable;
  await item.save();
  res.json(item);
};
