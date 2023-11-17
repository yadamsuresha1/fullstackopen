const Filter = ({ searchValue, handleSearch }) => {
    return (
      <div>
        Filter shown with <input value={searchValue} onChange={handleSearch} />
      </div>
    );
  };

  export default Filter