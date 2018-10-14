import * as React from "react";
import { ConnectedReduxProps, AppState } from "src/store";
import { connect } from "react-redux";
import { CloseModal } from "src/store/layout/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ScheduleForm.css";
import { returnProfessionals, returnServices } from "src/mocks/apiMocks";
import ClientAutocomplete from "src/components/client-autocomplete/ClientAutocomplete";
import Select from "react-select";
import { sumServicesDurations, createDurationOptions } from "src/utils/utils";
import Button from "src/components/button/Button";
import { DateTime, Duration } from "luxon";
import { AddSchedule } from "src/store/schedule/actions";
import { Professsional, Service, Client, Nullable, Schedule } from "src/utils/types";

interface ScheduleFormProps {}
interface ScheduleFormState {
  professionals: Professsional[];
  allServices: Service[];
  availableServices:  Service[];
  durationOptions: any[];
  newSchedule: Nullable<Schedule>;
  invalidStartTime: boolean;
}
const initialState: ScheduleFormState = {
  professionals: [],
  availableServices: [],
  allServices: [],
  durationOptions: [],
  newSchedule: {
    customer: null,
    professional: null,
    startTime: null,
    services: [],
    duration: null
  },
  invalidStartTime: false
};

export class ScheduleForm extends React.Component<
  ScheduleFormProps & ConnectedReduxProps & AppState,
  ScheduleFormState
> {
  constructor(props: ScheduleFormProps & ConnectedReduxProps & AppState) {
    super(props);
    this.state = initialState;
    this.closeModal = this.closeModal.bind(this);
    this.handleProfessionalChange = this.handleProfessionalChange.bind(this);
    this.handleServicesChange = this.handleServicesChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
  }

  componentDidMount = async () => {
    let professionals: Professsional[] = await returnProfessionals();
    professionals = professionals.map(professional => ({
      value: professional.document_number,
      label: professional.nickname,
      ...professional
    }));
    const allServices: Service[] = await returnServices();
    this.setState(prev => ({
      ...prev,
      professionals,
      allServices
    }));
  };
  handleCustomerChange(customer: Client) {
    this.setState(prev => ({
      ...prev,
      newSchedule: {
        ...prev.newSchedule,
        customer
      }
    }));
  }

  getAvailableServices(professional: any): Service[] {
    const { allServices } = this.state;
    return allServices.filter(service =>
      service.available_professionals.some(
        ({ cpf }) => cpf === professional.value
      )
    );
  }

  handleProfessionalChange(professional: any) {
    const availableServices = this.getAvailableServices(professional).map(
      service => ({
        value: service._id,
        label: service.name,
        ...service
      })
    );
    this.setState(prev => ({
      ...prev,
      newSchedule: {
        ...prev.newSchedule,
        professional,
        duration: null,
        services: []
      },
      availableServices
    }));
  }

  isFormValid = (): boolean => {
    const { newSchedule } = this.state;
    return Object.keys(newSchedule).every(key => newSchedule[key]);
  };

  addSchedule() {
    const { newSchedule } = this.state;
    this.props.dispatch(new AddSchedule(newSchedule as Schedule));
    this.props.dispatch(new CloseModal());
  }

  handleServicesChange(services: Service[]) {
    const durationSuggestion = sumServicesDurations(services);
    const durationOptions = createDurationOptions(durationSuggestion);

    this.setState(prev => ({
      ...prev,
      newSchedule: {
        ...prev.newSchedule,
        duration: null,
        services
      },
      durationOptions
    }));
  }
  handleDurationChange(duration:  {
    label:string;
    value: Duration
  }) {
    this.setState(prev => ({
      ...prev,
      newSchedule: {
        ...prev.newSchedule,
        duration
      }
    }));
  }

  handleStartTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { selectedDate } = this.props.schedule;
    const startTime = DateTime.fromFormat(e.target.value, "hh:mm").set({second: 0});
    if (startTime.hour >= 8 && startTime.hour < 20) {
      this.setState(prev => ({
        ...prev,
        newSchedule: {
          ...prev.newSchedule,
          startTime: selectedDate.set({
            hour: startTime.hour,
            minute: startTime.minute
          })
        },
        invalidStartTime: false
      }));
    } else {
      this.setState(prev => ({
        ...prev,
        invalidStartTime: true
      }));
    }
  }

  closeModal() {
    this.props.dispatch(new CloseModal());
  }
  render() {
    const {
      professionals,
      availableServices,
      durationOptions,
      newSchedule,
      invalidStartTime
    } = this.state;

    const isFormValid = this.isFormValid();
    return (
      <div className="ModalContainer">
        <div className="ModalHeader primary-bg">
          <div className="ModalActions">
            <a className="CloseButton" onClick={this.closeModal}>
              <FontAwesomeIcon icon="times-circle" />
            </a>
          </div>
          <div className="ModalTitle"> Agendar</div>
        </div>
        <div className="ModalContent">
          <div className="FormControl">
            <ClientAutocomplete onChange={this.handleCustomerChange} />
          </div>
          <div className="FormControl">
            <Select
              options={professionals}
              value={newSchedule.professional}
              onChange={this.handleProfessionalChange}
              placeholder="Selecione um profissional"
            />
          </div>
          <div className={"FormControl " + (invalidStartTime ? 'Error':'')}>
            <label>horário de inicio</label>
            <input
              type="time"
              min="08:00"
              max="20:00"
              onChange={this.handleStartTimeChange}
            />
            {invalidStartTime && <span>horário fora de atendimento ou inválido</span>}
          </div>
          <div className="FormControl">
            <Select
              isMulti={true}
              isDisabled={!newSchedule.professional}
              options={availableServices}
              value={newSchedule.services}
              onChange={this.handleServicesChange}
              placeholder={"Selecione o(s) serviços"}
            />
          </div>
          <div className="FormControl">
            <Select
              value={newSchedule.duration}
              options={durationOptions}
              onChange={this.handleDurationChange}
              placeholder={"Duração"}
            />
          </div>
        </div>
        <Button
          disabled={!isFormValid}
          className={"ModalButton "+ (!isFormValid? 'Disabled': '')}
          onClick={this.addSchedule}
        >
          Agendar
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (
  { layout, schedule }: AppState,
  props: ScheduleFormProps
) => ({
  layout,
  schedule,
  ...props
});

export default connect(mapStateToProps)(ScheduleForm);
