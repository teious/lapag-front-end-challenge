import * as React from "react";
import { ConnectedReduxProps, AppState } from "src/store";
import { LayoutState } from "src/store/layout/types";
import { connect } from "react-redux";
import { CloseModal } from "src/store/layout/actions";
import './ScheduleForm.css';

interface ScheduleFormProps {}

interface PropsFromState {
  layout: LayoutState;
}
export class ScheduleForm extends React.Component<
  ScheduleFormProps & ConnectedReduxProps & PropsFromState
> {
  constructor(props: ScheduleFormProps & ConnectedReduxProps & PropsFromState) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.dispatch(new CloseModal());
  }
  render() {
    return (
      <div>
        <div className="ModalHeader primary-bg">
          {" "}
          <a onClick={this.closeModal}>X</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ layout }: AppState, props: ScheduleFormProps) => ({
  layout,
  ...props
});

export default connect(mapStateToProps)(ScheduleForm);
