import * as React from "react";
import { Interval } from "luxon";
import "./TimesheetColumn.css";
interface TimesheetColumnProps {
  professional: any;
  interval: Interval;
}
export default class TimesheetColumn extends React.Component<
  TimesheetColumnProps
> {
  render() {
    const { professional, interval } = this.props;
    const dividedIntervals: Interval[] = interval.divideEqually(
      interval.length("hours")
    );
    return (
      <div className="TimesheetColumn">
        <div>{professional.nickname}</div>
        {dividedIntervals.map(hour => (
          <div key={hour.start.hour}>
            <div /> <div />
          </div>
        ))}
      </div>
    );
  }
}
