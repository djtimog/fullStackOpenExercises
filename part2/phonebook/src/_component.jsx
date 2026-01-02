const Input = ({ text, value, onChange }) => (
  <div>
    {text}: <input value={value} onChange={onChange} />
  </div>
);

export const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
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
