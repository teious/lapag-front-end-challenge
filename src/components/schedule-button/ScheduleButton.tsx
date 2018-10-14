import * as React from "react";
import { Schedule } from "src/utils/types";
import { Interval } from "luxon";
const colors = [
    'rgb(97, 105, 176)',
    '#7f8c8d'
]

interface ScheduleButtonProps {
  schedule: Schedule;
  onClick: (schedule: Schedule) => any;
}
interface ScheduleButtonState {
  styles: React.CSSProperties;
}
export default class ScheduleButton extends React.Component<
  ScheduleButtonProps,
  ScheduleButtonState
> {
  constructor(props: ScheduleButtonProps) {
    super(props);
    this.state = {
      styles: {
        position: "absolute",
        width: "80%",
        borderRadius: "3px",
        padding: "5px",
        color: "white",
        border: '1px solid white',
        cursor: 'pointer'
      }
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
      this.props.onClick(this.props.schedule)
  }

  randomColor = (): string => colors[~~(colors.length * Math.random())];

  componentDidMount() {
    const { schedule } = this.props;
    const { value: duration } = schedule.duration
    const startGap = Interval.fromDateTimes(
      schedule.startTime.set({ hour: 8, minute: 0, second: 0 }),
      schedule.startTime.set({second: 0})
    );
    const styles: React.CSSProperties = {
      top: (startGap.length('minutes') * 80) / 60,
      height: ((duration.minutes * 80) / 60),
      backgroundColor: this.randomColor()
    };
    this.setState((prev)=>({
      styles:{
          ...prev.styles,
          ...styles
      }
    }));
  }
  render() {
    const { styles } = this.state;
    const { schedule } = this.props;
    return (
      <div style={styles} onClick={this.onClick}>
        {schedule.customer.name.substring(
          0,
          schedule.customer.name.indexOf(" ")
        )}
      </div>
    );
  }
}
