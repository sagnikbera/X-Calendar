import React, { useState } from 'react';
import getMonth from './utils/dayjs';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import { useSelector } from 'react-redux';

const App = () => {
  // console.table(getMonth());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const showSidebar = useSelector((state) => state.calendar.showSidebar);

  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          {showSidebar && <Sidebar />}
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default App;
