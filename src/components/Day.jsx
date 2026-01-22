import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDaySelected,
  setSelectedEvent,
  toggleEventModal,
} from '../store/calendarSlice';

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const dispatch = useDispatch();

  const daySelected = useSelector((state) => state.calendar.daySelected);
  const savedEvents = useSelector((state) => state.calendar.savedEvents);
  const labels = useSelector((state) => state.calendar.labels);
  const tags = useSelector((state) => state.calendar.tags);

  useEffect(() => {
    const events = savedEvents.filter((event) => {
      const start = dayjs(event.day).startOf('day');
      const end = event.endDate
        ? dayjs(event.endDate).endOf('day')
        : start.endOf('day');

      const isWithinRange =
        (day.isSame(start, 'day') || day.isAfter(start, 'day')) &&
        (day.isSame(end, 'day') || day.isBefore(end, 'day'));

      //filter label
      const currentLabel = labels.find((lbl) => lbl.label === event.label);
      const isLabelVisible = currentLabel ? currentLabel.checked : true;

      //filter tag
      const eventTags = event.tags || [];
      const isTagVisible =
        eventTags.length === 0 ||
        eventTags.some((t) => {
          const foundTag = tags.find((tagObj) => tagObj.tag === t);
          return foundTag ? foundTag.checked : true;
        });

      return isWithinRange && isLabelVisible && isTagVisible;
    });
    setDayEvents(events);
  }, [savedEvents, day, labels, tags]);

  function getCurrentDayClass() {
    let classes = '';
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && dayjs(daySelected).format(format);

    if (currDay === nowDay) {
      classes += 'bg-blue-600 text-white rounded-full w-7 ';
    }

    if (currDay === slcDay) {
      classes += 'bg-blue-100 text-blue-600 font-bold rounded-full w-7 ';
    }

    return classes;
  }

  return (
    <div className="border border-gray-200 flex flex-col min-h-25 md:min-h-0 h-full">
      <header className="flex flex-col items-center">
        {/* day  */}
        {rowIdx === 0 && (
          <p className="text-xs md:text-sm mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        {/* date  */}
        <p
          className={`text-xs md:text-sm font-semibold p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format('DD')}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer overflow-y-auto px-1"
        onClick={() => {
          dispatch(setDaySelected(day.valueOf()));
          dispatch(toggleEventModal());
        }}
      >
        {dayEvents.map((event, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setSelectedEvent(event));
              dispatch(toggleEventModal());
            }}
            // hex color code
            style={{
              backgroundColor: event.label.startsWith('#') ? event.label : '',
              color: 'white',
            }}
            // Tailwind class
            className={`${!event.label.startsWith('#') ? event.label : ''} p-1 mr-1 text-[10px] md:text-sm rounded mb-1 truncate font-bold shadow-sm`}
          >
            {/* { console.log(event.label)} */}
            {event.title}
          </div>
        ))}
      </div>
      <div className="cursor-pointer">{/*event list*/}</div>
    </div>
  );
};

export default Day;
