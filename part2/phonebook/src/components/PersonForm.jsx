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

export default PersonForm;