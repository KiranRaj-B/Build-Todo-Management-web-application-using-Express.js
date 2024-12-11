const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const path = require("path")

app.set("view engine","ejs");

app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  try {
    const allTodos = await Todo.getTodos();  // Fetch todos from the database

    // Check if the request is for HTML or JSON response
    if (request.accepts("html")) {
      // If the request is for HTML, render the 'index.ejs' template with allTodos data
      response.render("index", { allTodos });
    } else {
      // If the request is for JSON, return the data as JSON
      response.json({ allTodos });
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    response.status(500).send("Server Error"); // Handle any errors
  }
});


app.use(express.static(path.join(__dirname,'public')));

app.get("/", function (request, response) {
  response.send("Hello World");
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll(); // Fetch all To-Dos from the database
    response.send(todos); // Send the list of To-Dos as a response
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const numDeleted = await Todo.destroy({
      where: { id: request.params.id }, // Specify the ID condition
    });
    response.send(numDeleted > 0); // Send true if deleted, false otherwise
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
