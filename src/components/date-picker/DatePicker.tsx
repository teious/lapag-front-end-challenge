import * as React from "react";
import { DateTime } from "luxon";
import "./DatePicker.css";

export interface DatePickerState {
    selectedDate: DateTime;
}

export interface DatePickerProps {
    startDate?: DateTime;
    onChange: (date?: DateTime) => any;
}

export default class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      selectedDate: props.startDate || DateTime.local()
    };
  }

  patchDate = (selectedDate: DateTime) => {
    this.setState({
      selectedDate
    });
    this.props.onChange(selectedDate);
  };

  prevDayHandler = () => {
    const { selectedDate } = this.state;
    this.patchDate(selectedDate.minus({ days: 1 }));
  };

  nextDayHandler = () => {
    const { selectedDate } = this.state;
    this.patchDate(selectedDate.plus({ days: 1 }));
  };

  inputChangeHandler = (e: any) => {
    this.patchDate(DateTime.fromISO(e.target.value));
  };

  render() {
    const { selectedDate } = this.state;
    return (
      <div>
        <div className="DatePicker">
          <a onClick={this.prevDayHandler}>{"<"}</a>
          <input
            type="date"
            value={selectedDate.toISODate()}
            onChange={this.inputChangeHandler}
          />
          <a onClick={this.nextDayHandler}>{">"}</a>
        </div>
        <div className="WeekDay">
          <small>{selectedDate.weekdayLong}</small>
        </div>
      </div>
    );
  }
}
