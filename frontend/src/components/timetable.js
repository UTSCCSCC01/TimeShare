import Timetable from 'react-timetable-events'


class Timeta extends Timetable{

    constructor(props) {
        super(props)
    }

    renderEvent(event, defaultAttributes, styles) {
        return (
          <div
            {...defaultAttributes}
            title={event.name}
            key={event.id}
            style={{
              ...defaultAttributes.style,
              background: event.colour ? event.colour : "white"
            }}
          >
            <span className={styles.event_info}>[ {event.name} ]</span>
            <span className={styles.event_info}>
              {event.startTime.format("HH:mm")} -{" "}
              {event.endTime.format("HH:mm")}
            </span>
          </div>
        );
      }
}


export const Timet = (id, events) => {
    console.log(id, events)
    return new Timeta(id={id}, events={events})}