import React from 'react';
import { MdAddBox } from 'react-icons/md';

const CreateEventButton = () => {
  return (
    <button className="border px-4 py-2 rounded-full flex items-center shadow-md hover:shadow-2xl hover:bg-blue-600 hover:border-none group">
      <MdAddBox className="text-3xl mr-2 text-gray-600 group-hover:text-white" />
      <h2 className="text-xl font-semibold text-gray-600 group-hover:text-white">
        Create
      </h2>
    </button>
  );
};

export default CreateEventButton;
