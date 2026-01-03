import { useState, useEffect } from "react";
import { Filter, PersonForm, Persons } from "./_component";
import person from "./person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchPersons, setSearchPersons] = useState([]);

  useEffect(() => {
    person.getAll().then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

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
      id: String(persons.length + 1),
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
      person.create(personObject).then((response) => {
        const allPersons = persons.concat(response.data);
        setPersons(allPersons);
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (confirm(`Delete ${personToDelete.name}?`)) {
      person.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
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
      <Persons personsToShow={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
