const Todo = require("../models/Todo");
const ObjectId = require("mongodb").ObjectId;

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      userDetail: req.user.id,
    });

    res.status(201).json({
      status: 201,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodoByUser = async (req, res) => {
  try {
    const userTodos = await Todo.find({
      userDetail: ObjectId(req.user.id),
    });

    res.status(200).json({
      status: 200,
      message: "Todos retrieved successfully.",
      data: userTodos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.todoID });

    if (result.deletedCount === 1) {
      return res.json({ status: 200, message: "Todo deleted successfully." });
    }

    res.status(404).json({ message: "Todo not found. Nothing deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.todoID },
      {
        $set: {
          title: req.body.title,
        },
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found. Nothing updated." });
    }

    res.json({
      status: 200,
      message: "Todo updated successfully.",
      updatedTodo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
