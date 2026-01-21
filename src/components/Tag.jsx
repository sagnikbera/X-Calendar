import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTag } from '../store/calendarSlice';

const Tags = () => {
  const tags = useSelector((state) => state.calendar.tags);
  const dispatch = useDispatch();

  return (
    <div className="mt-5">
      <p className="text-gray-500 font-bold">Tag Filter</p>
      {tags.length === 0 && (
        <p className="text-xs font-semibold text-gray-400 italic">
          No Tags Yet
        </p>
      )}
      {tags.map(({ tag, checked }, idx) => (
        <label key={idx} className="flex items-center mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => dispatch(updateTag({ tag, checked: !checked }))}
            className="form-checkbox h-4 w-4 text-blue-600 rounded"
          />
          <span className="ml-2 text-gray-700 text-sm capitalize font-semibold">{tag}</span>
        </label>
      ))}
    </div>
  );
};

export default Tags;
