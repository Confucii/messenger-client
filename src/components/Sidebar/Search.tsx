import React from "react";

function Search({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      type="text"
      name="filter"
      id="filter"
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
    />
  );
}

export default Search;
