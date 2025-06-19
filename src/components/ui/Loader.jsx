import React from "react";
import { GridLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex  text-center justify-center items-center mx-auto">
      <GridLoader color="#0b6af9" margin={2} />
    </div>
  );
}

export default Loader;
