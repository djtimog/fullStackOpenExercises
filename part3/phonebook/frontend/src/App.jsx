import { useState, useEffect } from "react";
import { Filter, Notification, PersonForm, Persons } from "./_component";
import person from "./person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchPersons, setSearchPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

  useEffect(() => {
    person
      .getAll()
      .then((response) => {
        const data = response.data;
        setPersons(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const notify = (message, color = "green", timer) => {
    setNotificationMessage(message);
    setNotificationColor(color);
    setTimeout(() => {
      setNotificationMessage(null);
    }, timer);
  };

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
    };

    let existPerson = false;

    persons.forEach((person) => {
      if (person.name === newName) {
        existPerson = true;
      }
    });

    if (!existPerson) {
      person
        .create(personObject)
        .then((response) => {
          const allPersons = persons.concat(response.data);
          setPersons(allPersons);
          notify(`Added ${newName}`, "green", 3000);
        })
        .catch((error) => console.log(error));
    } else {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((p) => p.name === newName);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        person
          .update(updatedPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : response.data
              )
            );
          })
          .catch((error) => {
            console.log(error);
            notify(
              `Information of ${newName} has already been removed from server`,
              "red",
              3000
            );
            setPersons(persons.filter((p) => p.id !== updatedPerson.id));
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (confirm(`Delete ${personToDelete.name}?`)) {
      person.remove(id).catch((error) => {
        console.log(error);
        notify(
          `Information of ${newName} has already been removed from server`,
          "red",
          3000
        );
      });
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
      <Notification message={notificationMessage} color={notificationColor} />
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
