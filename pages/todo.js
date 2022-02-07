import React from "react";
import { useContext } from "react";
import AuthContext from "../stores/authContext";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Navbar from "./components/Navbar";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiSave } from "react-icons/gi";

export default function Todo() {
  const [edit, setEdit] = React.useState(null);
  const context = useContext(AuthContext);
  const ref = React.useRef();
  const [text, setText] = React.useState("");

  React.useEffect(async () => {
    if (context.user) {
      let response = await axios.get("https://todo-serif.herokuapp.com/todo", {
        headers: {
          Authorization: context.user._id,
        },
      });
      context.setTodos(response.data.todos || []);
    }
  }, [context.user]);

  let deleteTodo = async (todo) => {
    let response = await axios.delete(
      `https://todo-serif.herokuapp.com/todo/${todo._id}`,
      {
        headers: {
          Authorization: context.user._id,
        },
      }
    );
    if (response.status === 200) {
      context.setSnackbar({
        open: true,
        message: "Todo deleted successfully",
        variant: "success",
      });

      context.setTodos(context.todos.filter((t) => t._id !== todo._id));
      context.clearSnackbar();
    } else {
      context.setSnackbar({
        open: true,
        message: "Something went wrong",
        variant: "error",
      });
      context.clearSnackbar();
    }
  };
  let updateTodo = async (todo) => {
    let response = await axios.put(
      `https://todo-serif.herokuapp.com/todo/${todo._id}`,
      {
        title: text,
      },
      {
        headers: {
          Authorization: context.user._id,
        },
      }
    );
    if (response.status === 200) {
      context.setSnackbar({
        open: true,
        message: "Todo updated successfully",
        variant: "success",
      });
      context.setTodos(
        context.todos.map((t) => (t._id === todo._id ? response.data.todo : t))
      );
      setEdit(null);
      context.clearSnackbar();
    } else {
      context.setSnackbar({
        open: true,
        message: "Something went wrong",
        variant: "error",
      });
      context.clearSnackbar();
    }
  };

  let createTodo = async (e) => {
    e.preventDefault();

    let response = await axios.post(
      "https://todo-serif.herokuapp.com/todo",
      {
        title: e.target.elements.title.value,
      },
      {
        headers: {
          Authorization: context.user._id,
        },
      }
    );
    context.setTodos([...context.todos, response.data.todo]);
    ref.current.value = "";
  };
  let completeTodo = async (todo, e) => {
    let response = await axios.put(
      `https://todo-serif.herokuapp.com/todo/${todo._id}`,
      {
        completed: !todo.completed,
      },
      {
        headers: {
          Authorization: context.user._id,
        },
      }
    );
    context.setTodos(
      context.todos.map((t) => {
        if (t._id === response.data.todo._id) {
          return response.data.todo;
        }
        return t;
      })
    );
  };
  return (
    <div className={styles.todo}>
      <Navbar />
      <form className={styles.form} onSubmit={createTodo}>
        <input type="text" placeholder="Add todo" name="title" ref={ref} />
        <button type="submit">Add</button>
      </form>
      {context?.todos?.map((todo) => (
        <div className={styles.todosItems} key={todo._id}>
          <div className={styles.todosItemsCheckBox}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => completeTodo(todo, e)}
            />
            <div className={styles.todoTitle}>
              {edit === todo._id ? (
                <input
                  key={todo._id + "input"}
                  style={
                    todo.completed
                      ? {
                          textDecoration: "line-through",
                          color: "green",
                          width: "100%",
                        }
                      : { width: "100%", textDecoration: "none" }
                  }
                  type="text"
                  defaultValue={todo.title}
                  onChange={(e) => setText(e.target.value)}
                />
              ) : (
                <span
                  key={todo._id + "span"}
                  style={
                    todo.completed
                      ? {
                          textDecoration: "line-through",
                          color: "green",
                          width: "100%",
                        }
                      : { width: "100%", textDecoration: "none" }
                  }
                >
                  {todo.title}
                </span>
              )}
            </div>
          </div>
          <div className={styles.todosItemsChange}>
            <button onClick={() => deleteTodo(todo)}>
              <RiDeleteBin5Fill size={30} />
            </button>
            <button
              onClick={() =>
                edit === todo._id ? updateTodo(todo) : setEdit(todo._id)
              }
              disabled={todo.completed}
            >
              {edit === todo._id ? (
                <GiSave size={30} />
              ) : (
                <FaPencilAlt size={30} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
