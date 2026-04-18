const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  postTask,
  putTask,
  deleteTask,
  toggleTaskStatus
} = require("../controllers/taskControllers");

const { verifyAccessToken } = require("../middlewares.js");

// ✅ Routes
router.get("/", verifyAccessToken, getTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);

// 🔥 PUT THIS FIRST (IMPORTANT)
router.put("/:taskId/toggle", verifyAccessToken, toggleTaskStatus);

// Then normal update
router.put("/:taskId", verifyAccessToken, putTask);

router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;