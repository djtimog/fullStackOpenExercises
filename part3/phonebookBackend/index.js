let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const PORT = 3001;

const express = require("express");

const app = express();

app.get("/api/persons", (req, res) => {
  res.json(persons);
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

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((per) => per.id !== id);

  res.status(204).end();
});

app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);
