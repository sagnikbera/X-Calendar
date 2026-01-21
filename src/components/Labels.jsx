import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLabel } from '../store/calendarSlice';

const Labels = () => {
  const labels = useSelector((state) => state.calendar.labels);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-1">Label Filter</p>
      {labels.map(({ label, checked }, idx) => {
        return (
          <label key={idx} className="flex items-center mt-1 Cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                dispatch(updateLabel({ label, checked: !checked }))
              }
              className={`form-checkbox h-4 w-4 ${label.replace('bg-', 'text-')} rounded`}
            />
            <span
              className={`ml-2 px-2 py-0.5 rounded-md capitalize flex-1 ${checked ? `${label} bg-opacity-20 ${label.replace('bg-', 'text-').replace('400', '300').replace('500', '300')}` : 'text-gray-500'}`}
            >
              {label.split('-')[1]}
            </span>
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default Labels;
