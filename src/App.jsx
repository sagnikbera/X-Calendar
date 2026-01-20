import React, { useEffect, useState } from 'react';
import getMonth from './utils/dayjs';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import { useSelector } from 'react-redux';
import EventModal from './components/EventModal';

const App = () => {
  // console.table(getMonth());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const showSidebar = useSelector((state) => state.calendar.showSidebar);
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const showEventModal = useSelector((state) => state.calendar.showEventModal);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className="h-screen flex flex-col">
        {showEventModal && <EventModal />}
        <CalendarHeader />
        <div className="flex flex-1 overflow-hidden">
          {showSidebar && <Sidebar />}
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default App;
