const express = require("express");
const router = express.Router();
const authenticated = require("../middlewares/authenticated");

const authController = require("../controllers/todoControler");
router.get("/getAll", authenticated, authController.getTodoByUser);
router.post("/create", authenticated, authController.createTodo);
router.put("/update/:todoID", authenticated, authController.updateTodo);
router.delete("/delete/:todoID", authenticated, authController.deleteTodo);

module.exports = router;
