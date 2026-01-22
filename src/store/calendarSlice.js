import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { instructorEvents } from '../data/data';

const initEvents = () => {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvent = storageEvents ? JSON.parse(storageEvents) : [];

  const processedEvents = instructorEvents.map((event, index) => ({
    id: `ext-${index}`,
    title: event.title,
    description: 'JSON feed',
    day: dayjs(event.start).valueOf(),
    endDate: dayjs(event.end).valueOf(),
    label: event.color,
    tags: [],
  }));

  return [...processedEvents, ...parsedEvent];
};

const initLabels = () => {
  const storageLabels = localStorage.getItem('savedLabels');
  return storageLabels ? JSON.parse(storageLabels) : [];
};

const initTags = () => {
  const storageTags = localStorage.getItem('savedTags');
  return storageTags ? JSON.parse(storageTags) : [];
};

const initialState = {
  monthIndex: dayjs().month(),
  smallCalendarMonth: null,
  daySelected: dayjs().valueOf(),
  showEventModal: false,
  selectedEvent: null,
  labels: initLabels(),
  tags: initTags(),
  savedEvents: initEvents(),
  showSidebar: true,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    //change month index
    setMonthIndex: (state, action) => {
      state.monthIndex = action.payload;
    },

    //small cal m -> big cal m
    setSmallCalendarMonth: (state, action) => {
      state.smallCalendarMonth = action.payload;
      state.monthIndex = action.payload;
    },

    //day select
    setDaySelected: (state, action) => {
      state.daySelected = action.payload;
    },

    // open close modal
    toggleEventModal: (state) => {
      state.showEventModal = !state.showEventModal;
      if (!state.showEventModal) state.selectedEvent = null;
    },

    //edit event
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },

    //! CURD

    //add new event
    pushEvent: (state, action) => {
      state.savedEvents.push(action.payload);
      localStorage.setItem('savedEvents', JSON.stringify(state.savedEvents));
    },

    //update event
    updateEvent: (state, action) => {
      state.savedEvents = state.savedEvents.map((event) => {
        return event.id === action.payload.id ? action.payload : event;
      });
      localStorage.setItem('savedEvents', JSON.stringify(state.savedEvents));
    },

    //delete event
    deleteEvent: (state, action) => {
      state.savedEvents = state.savedEvents.filter((event) => {
        return event.id !== action.payload.id;
      });
      localStorage.setItem('savedEvents', JSON.stringify(state.savedEvents));
    },

    //!TODO: Lebel
    //list unique label from events
    setLabels: (state) => {
      const uniqueLabels = [
        ...new Set(state.savedEvents.map((event) => event.label)),
      ];
      state.labels = uniqueLabels.map((label) => {
        const currentLabel = state.labels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    },

    //check uncheck label
    updateLabel: (state, action) => {
      state.labels = state.labels.map((lbl) => {
        return lbl.label === action.payload.label ? action.payload : lbl;
      });
      localStorage.setItem('savedLabels', JSON.stringify(state.labels));
    },

    //set tag
    setTags: (state) => {
      const allTags = state.savedEvents.flatMap((event) => event.tags || []);
      const uniqueTags = [...new Set(allTags)];

      state.tags = uniqueTags.map((tag) => {
        const currentTag = state.tags.find((t) => t.tag === tag);
        return {
          tag,
          checked: currentTag ? currentTag.checked : true,
        };
      });

      localStorage.setItem('savedTags', JSON.stringify(state.tags));
    },

    // check uncheck tag
    updateTag: (state, action) => {
      state.tags = state.tags.map((t) =>
        t.tag === action.payload.tag ? action.payload : t
      );
      localStorage.setItem('savedTags', JSON.stringify(state.tags));
    },

    //sidebar in main page
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const {
  setMonthIndex,
  setSmallCalendarMonth,
  setDaySelected,
  toggleEventModal,
  setSelectedEvent,
  pushEvent,
  updateEvent,
  deleteEvent,
  setLabels,
  setTags,
  updateLabel,
  updateTag,
  toggleSidebar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
