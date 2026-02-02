import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const filter = status ? { status } : {};

  const orders = await Order.find(filter)
    .populate("items.menuItem")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(orders);
};

export const createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    orderNumber: `ORD-${Date.now()}`
  });
  res.status(201).json(order);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};
