import React from "react";

function Search({
  setFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      type="text"
      name="filter"
      id="filter"
      onChange={(event) => setFilter(event.target.value)}
    />
  );
}

export default Search;
