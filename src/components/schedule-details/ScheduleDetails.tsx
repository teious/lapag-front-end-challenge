import * as React from "react";
import { Schedule } from "src/utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ScheduleDetails.css";
import { Interval } from "luxon";

interface ScheduleDetailsProps {
  schedule: Schedule;
  onDelete: (id: string) => any;
  onClose: () => any;
}

interface ScheduleDetailsState {
  interval: Interval;
}
export default class ScheduleDetails extends React.Component<
  ScheduleDetailsProps,
  ScheduleDetailsState
> {
  constructor(props: ScheduleDetailsProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    const {
      startTime,
      duration: { value: duration }
    } = props.schedule;
    this.state = {
      interval: Interval.fromDateTimes(
        startTime,
        startTime.plus({ minutes: duration.minutes })
      )
    };
  }

  closeModal() {
    this.props.onClose();
  }
  deleteSchedule() {
    const { schedule } = this.props;
    this.props.onDelete(schedule._id as string);
  }
  render() {
    const { customer, services } = this.props.schedule;
    const { interval } = this.state;
    return (
      <div className="ModalContainer">
        <div className="ModalHeader primary-bg">
          <div className="ModalActions">
            <a onClick={this.deleteSchedule}>
              <FontAwesomeIcon icon="trash-alt" />
            </a>
            <a onClick={this.closeModal}>
              <FontAwesomeIcon icon="times-circle" />
            </a>
          </div>
          <div className="CustomerName">
            <FontAwesomeIcon icon="user" /> {customer.name}
          </div>
        </div>
        <div className="ModalContent">
          <div className="Interval">
            <FontAwesomeIcon icon="clock" />
            {interval.start.toFormat("h:mm")} - {interval.end.toFormat("h:mm")}
          </div>
          <div className="Services">
            {services.map(service => (
              <span key={service._id}>{service.name}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
