const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const cuurentDate = new Date();
  const data = `<p>Phonebook has info for ${persons.length} people</p>
  <p>${cuurentDate}</p>`;

  res.send(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = persons.find((per) => per.id === id);

  if (!person) return res.status(404).end();

  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body.name) {
    return res.status(400).json({
      error: "Name is missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "Number is missing",
    });
  }

  console.log(body.name, body.number);

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((per) => per.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 8109738931;
// 8117081658;
