import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "../src/services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewname] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.get().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNewName = (event) => setNewname(event.target.value);

  const resetPerson = () => {
    setNewname("");
    setNewNumber("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      return;
    }
    const nameAlereadyExists = persons
      .map((person) => person.name.toLowerCase())
      .includes(newName.toLowerCase());
    const numberAlreadyExists = persons
      .map((person) => person.number)
      .includes(newNumber);
    if (nameAlereadyExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to update the phone number?`
        )
      ) {
        const person = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedPerson = {
          name: newName,
          number: newNumber,
        };
        personsService
          .updatePerson(person.id, updatedPerson)
          .then((response) => {
            setNotification({
              message: `New number has been updated successfully!`,
              status: "success",
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);

            setPersons(
              persons.map((p) => (p.id === response.id ? response : p))
            );
            resetPerson();
          })
          .catch((error) => {
            console.log("error", error);
            setNotification({
              message: error.response.data.error,
              status: "error",
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
            setPersons(persons.filter((p) => p.id !== person.id));
            resetPerson();
          });
      }
    } else if (numberAlreadyExists) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personsService
        .add(newPerson)
        .then((response) => {
          console.log("added", response);
          setNotification({
            message: `${newName} added to the phonebook successfully!`,
            status: "success",
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
          setPersons(persons.concat(response));
          resetPerson();
        })
        .catch((err) => {
          console.log("error", err);
          setNotification({
            message: err.response.data.error,
            status: "error",
          });
        });
    }
  };

  const handleNumber = (event) => setNewNumber(event.target.value);

  const handleSearch = (event) => setSearchValue(event.target.value);

  const handleDelete = (person) => {
    const { id, name } = person;
    if (window.confirm(`Delete ${name} ?`)) {
      personsService.deletePerson(id).then((response) => {
        setNotification({
          message: `Person with name ${name} has been deleted successfully!`,
          status: "success",
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);

        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personsToShow =
    searchValue.length > 0
      ? persons.filter((person) => person.name.startsWith(searchValue))
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
