import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLabel } from '../store/calendarSlice';

const Labels = () => {
  const labels = useSelector((state) => state.calendar.labels);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-1">Label Filter</p>

      {labels.length === 0 && (
        <p className="text-xs font-semibold text-gray-400 italic">
          No Labels Yet
        </p>
      )}

      {labels.map(({ label, checked }, idx) => {
        //  Hex Code/ Tailwind Class
        const isHex = label.startsWith('#');

        // label name
        const displayName = isHex
          ? `Event Color ${idx + 1}`
          : label.includes('-')
            ? label.split('-')[1]
            : label;

        return (
          <label
            key={idx}
            className="flex items-center mt-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                dispatch(updateLabel({ label, checked: !checked }))
              }
              // Hex dynamic accentColor
              style={{ accentColor: isHex ? label : '' }}
              className={`form-checkbox h-4 w-4 rounded cursor-pointer ${!isHex ? label.replace('bg-', 'text-') : ''}`}
            />

            <span
              style={{
                // Hex color
                backgroundColor: isHex && checked ? `${label}33` : '',
                color: isHex && checked ? label : '',
                border:
                  isHex && checked
                    ? `1px solid ${label}`
                    : '1px solid transparent',
              }}
              // ৩. CSS class fallback
              className={`ml-2 px-2 py-0.5 rounded-md capitalize flex-1 text-sm transition-all
                ${!isHex && checked ? `${label} bg-opacity-20 ${label.replace('bg-', 'text-')}` : ''} 
                ${!checked ? 'text-gray-500' : 'font-semibold text-gray-700'}`}
            >
              {/* text empty ? 'Unnamed' */}
              {displayName || 'Unnamed'}
            </span>
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default Labels;
