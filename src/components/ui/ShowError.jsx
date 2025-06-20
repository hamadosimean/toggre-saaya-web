import React from "react";
import { AlertCircle } from "lucide-react";
function ShowError({ error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{error}</h2>
    </div>
  );
}

export default ShowError;
