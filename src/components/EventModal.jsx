import React, { useEffect, useState } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEvent,
  pushEvent,
  toggleEventModal,
  updateEvent,
} from '../store/calendarSlice';
import { MdOutlineSchedule } from 'react-icons/md';
import { RiMenu3Fill } from 'react-icons/ri';
import { FaRegBookmark } from 'react-icons/fa';
import dayjs from 'dayjs';
import { SiTicktick } from 'react-icons/si';
import { MdDelete } from 'react-icons/md';
import { MdLabelOutline } from 'react-icons/md';

const labelsClasses = [
  'bg-indigo-400',
  'bg-gray-500',
  'bg-green-600',
  'bg-blue-400',
  'bg-red-400',
  'bg-purple-500',
  'bg-amber-500',
];

const EventModal = () => {
  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);
  const daySelected = useSelector((state) => state.calendar.daySelected);
  const dispatch = useDispatch();
  const [tagInput, setTagInput] = useState('');
  const [tags, setTagsList] = useState([]);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [endDate, setEndDate] = useState(
    dayjs(daySelected).format('YYYY-MM-DD')
  );

  useEffect(() => {
    if (selectedEvent) {
      setTagsList(selectedEvent.tags || []);
      setSelectedLabel(selectedEvent.label);
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description || '');
      setEndDate(
        dayjs(selectedEvent.endDate || selectedEvent.day).format('YYYY-MM-DD')
      );
    } else {
      setTagsList([]);
      setSelectedLabel(labelsClasses[0]);
      setTitle('');
      setDescription('');
      setEndDate(dayjs(daySelected).format('YYYY-MM-DD'));
    }
  }, [selectedEvent]);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTagsList([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const calendarEvent = {
      title: title,
      description: description,
      label: selectedLabel,
      tags: [...tags],
      day: selectedEvent ? selectedEvent.day : daySelected,
      endDate: dayjs(endDate).valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(), // in case of edit id should be same
    };

    if (selectedEvent) {
      dispatch(updateEvent(calendarEvent));
    } else {
      dispatch(pushEvent(calendarEvent));
    }

    dispatch(toggleEventModal());
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50 bg-black/50 p-4">
      <form className="rounded-lg shadow-2xl w-full max-w-lg md:w-1/4 bg-white overflow-hidden">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {selectedEvent && (
              <span
                className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => {
                  dispatch(deleteEvent(selectedEvent));
                  dispatch(toggleEventModal());
                }}
              >
                <MdDelete className="text-2xl" />
              </span>
            )}
            <MdDragHandle className="text-2xl text-gray-400 cursor-move hidden md:block" />
          </div>
          <button type="button" onClick={() => dispatch(toggleEventModal())}>
            <MdClose className="text-2xl text-gray-500 hover:text-gray-800" />
          </button>
        </header>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-[1fr_5fr] items-end gap-y-6 md:gap-y-7">
            {/* title  */}
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              required
              className="pt-3 border-0 text-gray-600 text-lg md:text-xl font-semibold pb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* schedule */}
            <MdOutlineSchedule className="text-gray-500 text-2xl justify-self-center" />
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 font-medium text-sm">
                Start:{' '}
                {dayjs(selectedEvent ? selectedEvent.day : daySelected).format(
                  'dddd, MMMM DD'
                )}
              </p>
              {/* <--- end date */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold">
                  Ends on:
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-xs border-b border-gray-300 focus:outline-none text-blue-600 font-bold cursor-pointer"
                />
              </div>
            </div>

            {/* description */}
            <RiMenu3Fill className="text-gray-500 text-2xl justify-self-center" />
            <input
              type="text"
              placeholder="Add a description"
              className="pt-1 font-medium border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 text-sm md:text-base"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* tag  */}
            <MdLabelOutline className="text-gray-500 text-2xl justify-self-center" />
            <div>
              <div className="flex flex-wrap gap-1 mb-2 max-h-24 overflow-y-auto">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] md:text-xs flex items-center font-bold"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() =>
                        setTagsList(tags.filter((tag) => tag !== t))
                      }
                      className="ml-1 font-bold text-blue-400 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 text-sm md:text-base"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            {/* labels */}
            <FaRegBookmark className="text-gray-500 text-2xl justify-self-center" />
            <div className="flex flex-wrap gap-2">
              {/* avoid conflic */}
              {labelsClasses.map((col, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(col)}
                  className={`w-5 h-5 md:w-6 md:h-6 ${col} rounded-full cursor-pointer transition-transform hover:scale-110 flex items-center justify-center`}
                >
                  {selectedLabel === col && (
                    <SiTicktick className="text-white text-xs md:text-sm" />
                  )}
                </span>
              ))}
              {/* (Hex Code)  */}
              {selectedEvent?.label.startsWith('#') &&
                !labelsClasses.includes(selectedLabel) && (
                  <span
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center scale-110"
                    style={{ backgroundColor: selectedLabel }}
                  >
                    <SiTicktick className="text-white text-xs md:text-sm" />
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Footer - save btn */}
        <footer className="flex justify-end border-t p-3 mt-4 md:mt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-2 rounded-3xl text-white font-bold transition-all shadow-md active:scale-95 text-sm md:text-base"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
