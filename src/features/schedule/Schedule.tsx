import * as React from "react";
import DatePicker from "src/components/date-picker/DatePicker";
import "./Schedule.css";
import { DateTime } from "luxon";
import { ConnectedReduxProps, AppState } from "src/store";
import { connect } from "react-redux";
import { UpdateDate } from "src/store/schedule/actions";
import { ScheduleState } from "src/store/schedule/types";
import { returnProfessionals } from "src/mocks/apiMocks";
import Timesheet from "src/components/timesheet/Timesheet";
import { LayoutState } from "src/store/layout/types";
import { default as Modal } from "react-responsive-modal";
import { CloseModal, UpdateModalContent, OpenModal } from "src/store/layout/actions";
import Button from "src/components/button/Button";
import ScheduleForm from "src/containers/schedule-form/ScheduleForm";

interface SchedulePageProps extends ConnectedReduxProps<any> {
  schedule: ScheduleState;
  layout: LayoutState;
}

interface SchedulePageState {
  professionals: any[];
}

export class Schedule extends React.Component<
  SchedulePageProps,
  SchedulePageState
> {
  constructor(props: SchedulePageProps) {
    super(props);
    this.state = {
      professionals: []
    };
  }

  async componentDidMount() {
    const professionals = (await returnProfessionals()) as any[];
    this.setState({
      professionals
    });
  }

  onDateChange = (date: DateTime) => {
    this.props.dispatch(new UpdateDate(date));
  };

  closeModal = () =>{
    this.props.dispatch(new CloseModal());
  }
  openModal = () =>{
    const modalContent = () =>(<ScheduleForm/>);
    this.props.dispatch(new UpdateModalContent(modalContent));
    this.props.dispatch(new OpenModal());
  }

  render() {
    const { selectedDate, schedules } = this.props.schedule;
    const { openedModal, modalContent: ModalContent } = this.props.layout;
    const { professionals } = this.state;
    return (
      <div className="ScheduleContainer">
    
        <Button onClick={this.openModal} style={{marginTop: '10px'}}>Adicionar Agendamento </Button>
        <div className="DatePickerContainer">
          <DatePicker onChange={this.onDateChange} />
        </div>
        <Timesheet
          professionals={professionals}
          startHour={selectedDate.set({ hour: 8, minute: 0 })}
          endHour={selectedDate.set({ hour: 20, minute: 0 })}
          schedules={schedules}
        />

        {openedModal &&
          ModalContent && (
            <Modal
              open={openedModal}
              onClose={this.closeModal}
              showCloseIcon={false}
              classNames={{
                modal: 'Modal'
              }
              }
            >
                <ModalContent />
            </Modal>
          )}
      </div>
    );
  }
}

const mapStateToProps = (
  { schedule, layout }: AppState,
  props: SchedulePageProps
) => ({
  schedule,
  layout,
  ...props
});
export default connect(mapStateToProps)(Schedule);
