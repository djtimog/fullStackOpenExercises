let person = [
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
  res.json(person);
});

app.get("/info", (req, res) => {
  const cuurentDate = new Date();
  const data = `<p>Phonebook has info for ${person.length} people</p>
  <p>${cuurentDate}</p>`;

  res.send(data);
});

app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);
