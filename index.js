import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // For testing purposes. Replace '*' with your frontend URL (e.g., 'http://127.0.0.1:5500') for production.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const allTodos = [];

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

  allTodos.splice(index, 1);
  res.status(200).json({
    message: "todo deleted",
    todos: allTodos,
  });
});



app.put("/todo/:id", (req, res) => {
  const { id } = req.params;
  const index = allTodos.findIndex((item) => item.id === +id);

  if (index === -1) {
    return res.status(404).json({
      message: "todo not found",
    });
  }

  allTodos[index].title = req.body.title;

  res.status(200).json({
    message: "todo edited successfully",
    todos: allTodos,
  })

  
});
export default app;