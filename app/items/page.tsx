import AddItem from "@/components/AddItem";
import React from "react";

const Items = () => {
  return (
    <div className="flex min-h-screen w-72 flex-col items-start px-4 pt-2">
      <div className="mx-auto w-full max-w-7xl">
        <AddItem />
      </div>
    </div>
  );
};

export default Items;
