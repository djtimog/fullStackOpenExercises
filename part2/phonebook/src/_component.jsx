const Input = ({ text, value, onChange }) => (
  <div>
    {text}: <input value={value} onChange={onChange} />
  </div>
);

export const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export const PersonForm = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input text="name" value={newName} onChange={handleNameChange} />
      <Input text="number" value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export const Filter = ({ handleSearch, handleSearchChange, search }) => {
  return (
    <form onSubmit={handleSearch}>
      <Input
        text="filter shown with"
        value={search}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export const Notification = ({ message, color }) => {
  if (message === null) return null;

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        borderColor: color,
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: "10px",
        padding: "0px 10px",
        marginBottom: "10px",
      }}
    >
      <h3 style={{ color: color }}>{message}</h3>
    </div>
  );
};
