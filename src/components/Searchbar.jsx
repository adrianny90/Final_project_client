import { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="searchbar-div">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="searchbar-input"
      />
    </div>
  );
};

export default Searchbar;
