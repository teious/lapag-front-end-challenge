import * as React from "react";
import { connect } from "react-redux";
import { ConnectedReduxProps, AppState } from "src/store";
import { ScheduleState } from "src/store/schedule/types";
import { schedulesByDate, schedulesByProfessional } from "src/utils/utils";
import { DateTime } from "luxon";
import { Professsional, Schedule } from "src/utils/types";
import ScheduleButton from "src/components/schedule-button/ScheduleButton";
import { UpdateModalContent, OpenModal } from "src/store/layout/actions";

interface SchedulesByProfessionalProps {
  professional: Professsional;
}
interface SchedulesByProfessionalState {
  professionalSchedules: Schedule[];
}
class SchedulesByProfessional extends React.Component<
  SchedulesByProfessionalProps &
    ConnectedReduxProps & { schedule: ScheduleState },
  SchedulesByProfessionalState
> {
  constructor(
    props: SchedulesByProfessionalProps &
      ConnectedReduxProps & { schedule: ScheduleState }
  ) {
    super(props);
    this.state = {
      professionalSchedules: []
    };
    this.openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    const {
      professional,
      schedule: { schedules, selectedDate }
    } = this.props;
    const professionalSchedules = this.findSchedules(
      professional,
      schedules,
      selectedDate
    );
    this.setState(prev => ({
      ...prev,
      professionalSchedules
    }));
  }
  componentWillReceiveProps(
    props: SchedulesByProfessionalProps & { schedule: ScheduleState }
  ) {
    const {
      professional,
      schedule: { schedules, selectedDate }
    } = props;
    const professionalSchedules = this.findSchedules(
      professional,
      schedules,
      selectedDate
    );
    this.setState(prev => ({
      ...prev,
      professionalSchedules
    }));
  }

  findSchedules(
    professional: Professsional,
    schedules: Schedule[],
    selectedDate: DateTime
  ) {
    const schedulesOnSelectedDate = schedulesByDate(schedules, selectedDate);
    const professionalSchedules = schedulesByProfessional(
      schedulesOnSelectedDate,
      professional
    );
    return professionalSchedules;
  }

  scheduleModal = (schedule: Schedule) => () => (
    <div>{schedule.customer.name}</div>
  );

  openModal(schedule: Schedule) {
    this.props.dispatch(new UpdateModalContent(this.scheduleModal(schedule)));
    this.props.dispatch(new OpenModal());
  }
  render() {
    const { professionalSchedules } = this.state;
    return professionalSchedules.map(schedule => (
      <ScheduleButton
        key={schedule._id}
        schedule={schedule}
        onClick={this.openModal}
      />
    ));
  }
}

const mapStateToProps = (
  { schedule }: AppState,
  props: SchedulesByProfessionalProps
) => ({
  ...props,
  schedule
});
export default connect(mapStateToProps)(SchedulesByProfessional);
