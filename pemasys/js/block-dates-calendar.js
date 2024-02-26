let extract_jsonArray = [];
$(function() {
    var events = [];

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        selectable: true, // Enable selectable dates
        select: function(start, end, jsEvent, view) {
            // This function is triggered when a date range is selected
            //console.log('Selected range: ' + start.format() + ' to ' + end.format());
            // Check if an event already exists for the selected date
            var selectedDate = start.format('YYYY-MM-DD');
            // Get all events on the selected date
            var eventsOnSelectedDate = calendar.fullCalendar('clientEvents', function(event) {
                return event.start.format('YYYY-MM-DD') === selectedDate;
            });

            // Count the number of events on the selected date
            var eventCount = eventsOnSelectedDate.length;
            if (eventCount == 0) {
                // Create a new event object
                var newEvent = {
                    title: 'Blocked day to leave',
                    start: selectedDate,
                    //end: end,
                    allDay: true,
                    backgroundColor: '#dc3545', // You can customize the event appearance
                    borderColor: '#dc3545',
                    url: '#',
                    editable: true
                };

                // Add the new event to the calendar and events array
                calendar.fullCalendar('renderEvent', newEvent, true);
                events.push(newEvent);
            } else {
                // If events exist for the selected date, remove them
                for (var i = 0; i < eventsOnSelectedDate.length; i++) {
                    calendar.fullCalendar('removeEvents', eventsOnSelectedDate[i]._id);
                }
                // Filter out the entry where start is "2024-01-01"
                events = events.filter(item => item.start !== `${selectedDate}`);
            }
            // Extracting "start" dates and creating new JSON objects
            const startDates = events.map(item => {
                return {
                    start: item.start
                    // You can add other properties as needed
                };
            });

            // Sort the dates in ascending order
            startDates.sort((a, b) => new Date(a.start) - new Date(b.start));

            let result = [];
            extract_jsonArray = [];
            let startRange = null;
            let endRange = null;

            for (let i = 0; i < startDates.length; i++) {
                const currentDate = new Date(startDates[i].start);

                if (startRange === null) {
                    startRange = currentDate;
                    endRange = currentDate;
                } else if (currentDate - endRange === 86400000) { // 86400000 milliseconds in a day
                    endRange = currentDate;
                } else {
                    result.push({ start: startRange.toISOString().split('T')[0], end: endRange.toISOString().split('T')[0] });
                    startRange = currentDate;
                    endRange = currentDate;
                }
            }

            // Push the last range
            if (startRange !== null && endRange !== null) {
                result.push({ start: startRange.toISOString().split('T')[0], end: endRange.toISOString().split('T')[0] });
                extract_jsonArray.push(result);
            }
            console.log("extract_jsonArray: "+JSON.stringify(extract_jsonArray));
        },
        events: events
    });
});