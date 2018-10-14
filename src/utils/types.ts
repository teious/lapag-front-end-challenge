import { DateTime, Duration } from "luxon";

export type Nullable<T> = { [P in keyof T]: T[P] | null }
export interface Schedule {
  _id?: string;
  customer: Client;
  professional: Professsional;
  startTime: DateTime;
  services: Service[];
  duration: DurationOpt;
}

export interface DurationOpt {
    label:string;
    value: Duration
  }
export interface Professsional {
    _id: string;
    name: string;
    nickname: string;
    document_number: string;
  }
  
  export interface Service {
    _id: string;
    name: string;
    duration: null | string;
    available_professionals: Array<{
      commission: string;
      cpf: string;
    }>;
  }
  
  export interface Client {
      _id: string;
      name: string;
  }