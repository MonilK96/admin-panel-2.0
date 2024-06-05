import { useMemo } from 'react';
import merge from 'lodash/merge';

import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(events, selectEventId, selectedRange, openForm) {
  const currentEvent = events.find((event) => event.id === selectEventId);
  console.log("current : ",currentEvent);
  const defaultValues = useMemo(
    () => ({
      // id: '',
      event: "",
      leave_description: '',
      leave_type: '',
      startDate: selectedRange ? selectedRange.start : new Date().getTime(),
      endDate: selectedRange ? selectedRange.end : new Date().getTime(),


      // title: '',
      // description: '',
      // color: CALENDAR_COLOR_OPTIONS[1],
      // allDay: false,
      // start: selectedRange ? selectedRange.start : new Date().getTime(),
      // end: selectedRange ? selectedRange.end : new Date().getTime(),
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentEvent || selectedRange) {
    return merge({}, defaultValues, currentEvent);
  }

  return defaultValues;
}
