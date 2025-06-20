import React from "react";
import { GridLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen text-gray-600">
      <GridLoader color="#0b6af9" margin={2} />
    </div>
  );
}

export default Loader;
