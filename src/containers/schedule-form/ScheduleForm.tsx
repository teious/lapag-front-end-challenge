import * as React from "react";
import { ConnectedReduxProps, AppState } from "src/store";
import { connect } from "react-redux";
import { CloseModal } from "src/store/layout/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ScheduleForm.css';
// import { returnProfessionals } from "src/mocks/apiMocks";
import ClientAutocomplete from "src/components/client-autocomplete/ClientAutocomplete";

interface ScheduleFormProps {}

export class ScheduleForm extends React.Component<
  ScheduleFormProps & ConnectedReduxProps & Partial<AppState>
> {
  constructor(props: ScheduleFormProps & ConnectedReduxProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount= async () =>{
  //  const professionals: any[] = await returnProfessionals() as any[];
    
  
  } 
  setCustomer(){

  }

  closeModal() {
    this.props.dispatch(new CloseModal());
  }
  render() {
    return (
      <div>
        <div className="ModalHeader primary-bg">
           <div className="ModalActions">
               <a className="CloseButton" onClick={this.closeModal}>
                <FontAwesomeIcon icon="times-circle"/>
               </a>
           
           </div>
          <div className="ModalTitle"> Agendar</div>

       
        </div>
        <div className="ModalContent">
            <ClientAutocomplete onChange={this.setCustomer}/>
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
