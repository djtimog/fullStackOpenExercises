import { useState } from "react";
import { Filter, PersonForm, Persons } from "./_component";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchPersons, setSearchPersons] = useState([]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let existPerson = false;

    persons.forEach((person) => {
      if (person.name === newName) {
        existPerson = true;
        alert(`${newName} is already added to phonebook`);
        return;
      }
    });

    if (!existPerson) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const personsToShow = searchPersons.length !== 0 ? searchPersons : persons;

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        search={search}
      />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
