import {
  professionalMocks,
  servicesMocks,
  clientsMocks,
} from "./mocks";
import { Professsional, Service, Client } from "src/utils/types";

export const returnProfessionals = (): Promise<Professsional[]> =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(professionalMocks);
    }, 100);
  });

export const returnServices = (): Promise<Service[]> =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(servicesMocks);
    }, 200);
  });

export const returnClients = (clientName: string = ""): Promise<Client[]> => {
  const filteredClients = clientsMocks.filter(e =>
    e.name.toUpperCase().includes(clientName.toUpperCase())
  );
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(filteredClients);
    }, 300);
  });
};
