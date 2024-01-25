import React, { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Box,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { CustomInput } from "../CustomInput/CustomInput";
import { PrimaryButton } from "../BaseButton/BaseButton";
import { HttpClient } from "../../apis/api";

const StyledListItem = styled(ListItem)({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodosList] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const navigate = useNavigate();
  const [empty, setEmpty] = useState(null);

  const addTodo = async () => {
    if (todo.trim() === "") {
      setEmpty("You can not add empty task");
    }
    if (todo.trim() !== "") {
      if (editTodoId != null) {
        const response = await HttpClient.put(`/todo/update/${editTodoId}`, {
          title: todo,
        });
        if (response?.status === 200) {
          setTodosList((prevTasks) => {
            return prevTasks.map((t) =>
              t._id === editTodoId ? { ...t, title: todo } : t
            );
          });
          setTodo("");
          setEditTodoId(null);
          setEmpty(null);
        }
      } else {
        const response = await HttpClient.post("/todo/create", { title: todo });
        setTodosList((prevState) => [...prevState, response.todo]);
        setTodo("");
        setEmpty(null);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = async (taskId) => {
    try {
      const res = await HttpClient.delete(`/todo/delete/${taskId}`);
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      console.log("error delete", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("session-tid");
    navigate("/");
  };

  const handleEditTodo = (taskId) => {
    const findTodo = todos.find((item) => item?._id === taskId);
    setTodo(findTodo?.title);
    setEditTodoId(taskId);
  };

  const getData = async () => {
    try {
      const response = await HttpClient.get("/todo/getAll");
      setTodosList(response?.data);
    } catch (error) {
      setTodosList([]);
      error.response.status === 401 && navigate("/");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>ToDo App</h1>
        <PrimaryButton
          variant="outlined"
          color="error"
          sx={{ color: "rgba(211, 47, 47, 0.9)" }}
          onClick={handleLogout}
        >
          Logout
        </PrimaryButton>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <CustomInput
          labelText="Add Todo"
          placeholder="write a todo"
          fullWidth
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
            todo.length >= 0 && setEmpty(null);
          }}
          onKeyPress={(event) => handleKeyPress(event)}
        />
        {empty != null && <span style={{ color: "red" }}>{empty}</span>}
        <PrimaryButton
          variant="contained"
          color="primary"
          sx={{ maxWidth: "20%" }}
          onClick={addTodo}
        >
          {editTodoId ? "Update" : "Add todo"}
        </PrimaryButton>
      </Box>
      <List>
        {todos.length <= 0 ? (
          <h1>NO Data Found</h1>
        ) : (
          todos.map((t, index) => (
            <StyledListItem key={t.id} dense>
              <Box>{index + 1}.</Box>
              <ListItemText primary={t?.title} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(t._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ ml: "1rem" }}
                  onClick={() => {
                    handleEditTodo(t._id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </StyledListItem>
          ))
        )}
      </List>
    </Container>
  );
};
