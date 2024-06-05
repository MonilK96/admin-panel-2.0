import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useState, useEffect, useCallback } from 'react';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { isAfter, isBetween } from 'src/utils/format-time';

import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';
import { updateEvent, useGetCalendar, useGetEvents } from 'src/api/calendar';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import { StyledCalendar } from '../styles';
import CalendarForm from '../calendar-form';
import { useEvent, useCalendar } from '../hooks';
import CalendarToolbar from '../calendar-toolbar';
import CalendarFilters from '../calendar-filters';
import CalendarFiltersResult from '../calendar-filters-result';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const defaultFilters = {
  colors: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function CalendarView() {
  const theme = useTheme();

  const dummyLeave = [
    {
      // _id: '665aedf6e9c824721663307b',
      // event: 'sdsdsd',
      // startDate: '2024-06-18T18:30:00.000Z',
      // endDate: '2024-06-23T18:30:00.000Z',
      // company_id: '664ec7b3671bf9a7f5366599',
      // event_user_id: '664ec7b3671bf9a7f536659b',
      // leave_type: 'festival holiday',
      // leave_description: 'sdsdsdsdsds',
      // leave_status: 'office',
      // created_at: '2024-05-31T06:56:13.842Z',
      // updated_at: '2024-05-31T06:56:13.842Z',
      // deleted_at: null,
      // __v: 0,
      // firstName: 'Jeel  ',
      // lastName: 'Kakadiya',
      // color: 'blue',
      // textColor: 'blue',

      event: 'gothan chholano',
      startDate: 1718003577806,
      endDate: 1718176857806,
      leave_type: 'festival holiday',
      leave_description: 'gothan cholavathi eja pohachi che raja aapava namra vinanti',
      leave_status: 'Pending',
    },
    {
      startDate: Date(),
      endDate: Date(),
      event: 'Test Event 2',
      leave_description: 'Description 2',
      leave_status: 'Pending',
      leave_type: 'other',
      student: 'Student Name 2',
    },
  ];

  // Transform the dummyLeave data to use `start` and `end` instead of `startDate` and `endDate`

  const settings = useSettingsContext();

  const smUp = useResponsive('up', 'sm');

  const openFilters = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const { events, eventsLoading } = useGetEvents();
  const { calendar } = useGetCalendar();

  const leaveTypeColors = {
    'festival holiday': 'blue',
    'Student Leave': 'yellow',
    'recaption leave': 'brown',
    'other': 'red',
  };
  const transformedDummyLeave = dummyLeave.map((event) => ({
    ...event,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    title: event.event,
    color: [leaveTypeColors[event.leave_type]] || 'gray',
    textColor: [leaveTypeColors[event.leave_type]] || 'gray',
  }));

  const dateError = isAfter(filters.startDate, filters.endDate);

  const {
    calendarRef,
    view,
    date,
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    openForm,
    onOpenForm,
    onCloseForm,
    selectEventId,
    selectedRange,
    onClickEventInFilters,
  } = useCalendar();
  console.log("eve : ",dummyLeave);
  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);

  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const canReset = !!filters.colors.length || (!!filters.startDate && !!filters.endDate);

  const dataFiltered = applyFilter({
    inputData: events,
    filters,
    dateError,
  });

  const renderEventContent = (eventInfo) => {
    return (
      <Box
        sx={{ height: "14px", fontSize: '12px', fontWeight: "600", alignSelf: "center" }}
      >
        {eventInfo.event.title}
      </Box>
    );
  };

  const renderResults = (
    <CalendarFiltersResult
      filters={filters}
      onFilters={handleFilters}
      canReset={canReset}
      onResetFilters={handleResetFilters}
      results={dataFiltered.length}
      sx={{ mb: { xs: 3, md: 5 } }}
    />
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Typography variant="h4">Calendar</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
            New Event
          </Button>
        </Stack>

        {canReset && renderResults}

        <Card>
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
              onOpenFilters={openFilters.onTrue}
            />
            <Calendar
              weekends
              editable
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              events={transformedDummyLeave}
              eventContent={renderEventContent}
              headerToolbar={false}
              select={onSelectRange}
              eventClick={onClickEvent}
              height={smUp ? 720 : 'auto'}
              eventDrop={(arg) => {
                onDropEvent(arg, updateEvent);
              }}
              eventResize={(arg) => {
                onResizeEvent(arg, updateEvent);
              }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </StyledCalendar>
        </Card>
      </Container>
              {console.log("CE : ",currentEvent)}
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={onCloseForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        <DialogTitle sx={{ minHeight: 76 }}>
          {openForm && <> {currentEvent ? 'Edit Event' : 'Add Event'}</>}
        </DialogTitle>

        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          onClose={onCloseForm}
        />
      </Dialog>

      <CalendarFilters
        open={openFilters.value}
        onClose={openFilters.onFalse}
        filters={filters}
        onFilters={handleFilters}
        canReset={canReset}
        onResetFilters={handleResetFilters}
        dateError={dateError}
        events={events}
        colorOptions={CALENDAR_COLOR_OPTIONS}
        onClickEvent={onClickEventInFilters}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, dateError }) {
  const { colors, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  inputData = stabilizedThis.map((el) => el[0]);

  if (colors.length) {
    inputData = inputData.filter((event) => colors.includes(event.color));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((event) => isBetween(event.start, startDate, endDate));
    }
  }

  return inputData;
}
