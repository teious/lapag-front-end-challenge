import * as React from "react";
import { DateTime, Interval } from "luxon";
import "./Timesheet.css";
import TimesheetColumn from "../timesheet-column/TimesheetColumn";

interface TimesheetProps {
  professionals: any[];
  startHour: DateTime;
  endHour: DateTime;
  schedules: any[];
}
interface TimesheetState {
  interval: Interval;
}
export default class Timesheet extends React.Component<
  TimesheetProps,
  TimesheetState
> {
  constructor(props: TimesheetProps) {
    super(props);
    this.state = {
      interval: Interval.fromDateTimes(props.startHour, props.endHour)
    };
  }

  render() {
    const { professionals } = this.props;
    const { interval } = this.state;
    const dividedIntervals: Interval[] = interval.divideEqually(
      interval.length("hours")
    );
    return (
      <div className="Timesheet">
        <div className="Hours">
          {dividedIntervals.map(hour => (
            <div key={hour.start.toString()}>{hour.start.hour}h</div>
          ))}
        </div>
        {professionals.map(professional => (
          <TimesheetColumn
            key={professional._id}
            professional={professional}
            interval={interval}
          />
        ))}
      </div>
    );
  }
}
