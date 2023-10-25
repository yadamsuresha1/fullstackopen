import { useState } from "react";

const Filter = ({ searchValue, handleSearch }) => {
  return (
    <div>
      <input value={searchValue} onChange={handleSearch} />
    </div>
  );
};

const PersonForm = (props) => {
  const { newName, newNumber, handleFormSubmit, handleNewName, handleNumber } =
    props;
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input type="tel" value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewname] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleNewName = (event) => setNewname(event.target.value);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      return;
    }
    const nameAlereadyExists = persons
      .map((person) => person.name)
      .includes(newName);
    const numberAlreadyExists = persons
      .map((person) => person.number)
      .includes(newNumber);
    if (nameAlereadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else if (numberAlreadyExists) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewname("");
      setNewNumber("");
    }
  };

  const handleNumber = (event) => setNewNumber(event.target.value);

  const handleSearch = (event) => setSearchValue(event.target.value);

  const personsToShow =
    searchValue.length > 0
      ? persons.filter((person) => person.name.startsWith(searchValue))
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleFormSubmit={handleFormSubmit}
        handleNewName={handleNewName}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
