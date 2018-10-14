import { Duration, DateTime } from "luxon";
import { Schedule, Professsional, Service } from "./types";

export const sumServicesDurations = (services: Service[]) =>
  services.reduce(
    (duration, service) => duration + Number(service.duration),
    0
  );

export const createDurationOptions = (suggestion: number) => {
  if (suggestion < 45) suggestion = 60;
  const step = 15;
  const options = [
    Duration.fromObject({ minutes: suggestion - step * 2 }),
    Duration.fromObject({ minutes: suggestion - step }),
    Duration.fromObject({ minutes: suggestion }),
    Duration.fromObject({ minutes: suggestion + step * 2 }),
    Duration.fromObject({ minutes: suggestion + step * 2 })
  ];

  return options.map(duration => ({
    label: duration
      .toFormat("h mm")
      .replace(" ", "h")
      .concat("m"),
    value: duration
  }));
};

export const schedulesByDate = (schedules: Schedule[], date: DateTime) => {
  return schedules.filter(schedule => schedule.startTime.hasSame(date, "day"));
};

export const schedulesByProfessional = (
  schedules: Schedule[],
  professional: Professsional
) => {
  return schedules.filter(
    schedule => schedule.professional._id === professional._id
  );
};
