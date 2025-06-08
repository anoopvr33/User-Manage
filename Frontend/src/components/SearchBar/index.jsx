import "./style.css";
import FormData from "../FormData";
import Button from "../Button";
import { useEffect, useState } from "react";

const SearchBar = ({ Event }) => {
  const [data, setData] = useState(null);

  const OnInput = (e) => {
    setData(e.target.value);
  };

  const OnSearch = () => {
    Event(data);
  };

  useEffect(() => {}, [data]);

  return (
    <div className="search-bar">
      <FormData
        className={"search-inp"}
        onChange={OnInput}
        placeholder={"search user"}
      ></FormData>
      <Button
        className={"search-btn"}
        children={"Search"}
        onClick={OnSearch}
      ></Button>
    </div>
  );
};

export default SearchBar;
