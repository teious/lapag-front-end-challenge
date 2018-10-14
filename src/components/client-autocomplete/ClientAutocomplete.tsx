import * as React from "react";
import { returnClients } from "src/mocks/apiMocks";
import "./ClientAutocomplete.css";
import { Client } from "src/utils/types";

interface ClientAutocompleteProps {
  onChange: (client: any) => any;
  className?: string;
}

interface ClientAutocompleteState {
  clients: Client[];
  selectedClient?: any;
  opened: boolean;
}

export default class ClientAutocomplete extends React.Component<
  ClientAutocompleteProps,
  ClientAutocompleteState
> {
  constructor(props: ClientAutocompleteProps) {
    super(props);
    this.state = {
      clients: [],
      opened: false,
      selectedClient: ""
    };
    this.setClient = this.setClient.bind(this);
    this.handleClientClick = this.handleClientClick.bind(this);
  }
  onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    this.setState(prev => ({
      ...prev,
      selectedClient: inputValue
    }));

    const clients = await returnClients(inputValue);
    this.setState({
      clients,
      opened: clients.length > 0
    });

    if (clients.length === 1) {
      if (inputValue.toLowerCase() === clients[0].name.toLowerCase()) {
        this.setClient(clients[0].name);
      }
    }
  };
  handleClientClick(e: React.MouseEvent<HTMLDivElement>) {
    this.setClient(e.currentTarget.innerText);
  }
  setClient(clientName: string) {
    const { clients } = this.state;
    const selectedClient = clients.find(client => client.name === clientName);
    if (selectedClient) {
      this.props.onChange(selectedClient);
      this.setState(prev => ({
        ...prev,
        opened: false,
        selectedClient: selectedClient.name
      }));
    }
  }
  render() {
    const { clients, opened, selectedClient } = this.state;
    const { className } = this.props;
    return (
      <div className={"ClientAutocomplete " + className || ""}>
        <input
          type="text"
          placeholder="Pesquise um cliente"
          onChange={this.onInputChange}
          value={selectedClient}
        />
        {opened && (
          <div className="Clients">
            <div>
              {clients &&
                opened &&
                clients.map(client => (
                  <div onClick={this.handleClientClick} key={client._id}>
                    {client.name}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
