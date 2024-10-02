import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ handleInput, handleFilter, filterBy }) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="parallax">
      <div className="">
        <div onClick={handleFilter}
          className={`d-flex flex-row justify-content-center align-item-center my-20 ${styles.searchBar}`}
        >
          <input
            onChange={handleInput}
            className="flex-fill"
            type="text"
            id="byName"
            name="byName"
            defaultChecked={filterBy.byName}
            placeholder="Rechercher par nom"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
