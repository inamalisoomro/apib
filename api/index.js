import express from "express";
import cors from 'cors';


const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());


const allTodos = [];

const checkMiddleware = (req, res, next) => {
  console.log("check middleware");
  next();
};

app.get("/", checkMiddleware, (req, res) => {
  res.send("Hello World!");
});


app.post("/todo", (req, res) => {
  const { title } = req.body;
  allTodos.push({
    title,
    id: Date.now(),
  });

  res.status(201).json({
    message: "New todo created",
    todos: allTodos,
  });
});



app.get("/todo", (req, res) => {
  res.status(200).json({
    todo: allTodos,
  });
});



app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const index = allTodos.findIndex((item) => item.id === +id);
  console.log(index, id);

  if (index === -1) {
    return res.status(404).json({
      message: "todo not found",
    });
  }

  res.status(200).json({
    todos: allTodos[index],
  });
});



app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const index = allTodos.findIndex((item) => item.id === +id);

  if (index === -1) {
    return res.status(404).json({
      message: "todo not found",
    });
  }

  allTodos.splice(index , 1);
  res.status(204).json({
    message: 'todo deleted',
    todos: allTodos
  })
});


app.put("/todo/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const todo = allTodos.find((item) => item.id === +id);

  if (!todo) {
    return res.status(404).json({
      message: "todo not found",
    });
  }

  todo.title = title;

  res.status(200).json({
    message: "todo updated successfully",
    todo,
  });
});


export default app;