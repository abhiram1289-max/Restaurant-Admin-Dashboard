import express from "express";
import {
  getMenu, searchMenu, createMenuItem,
  updateMenuItem, deleteMenuItem, toggleAvailability
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getMenu);
router.get("/search", searchMenu);
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/availability", toggleAvailability);

export default router;
