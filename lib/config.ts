/* eslint-disable no-unused-vars */
export enum UnitOfTime {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export enum RevisionFrequency {
  '1w' = '1w',
  '2w' = '2w',
  '1m' = '1m',
}

export enum ChallengeDuration {
  '1m' = '1m',
  '2m' = '2m',
  '3m' = '3m',
  '4m' = '4m',
  '6m' = '6m',
  '1y' = '1y',
}

export enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum GoalType {
  Gain = 'Gain',
  Lose = 'Lose',
}

export enum GoalFrequency {
  Revision = 'Revision',
  Total = 'Total',
}

export enum BodyPart {
  Neck = 'Neck',
  Shoulders = 'Shoulders',
  Chest = 'Chest',
  Bicep = 'Bicep',
  Waist = 'Waist',
  Hips = 'Hips',
  Thigh = 'Thigh',
}

export enum PhotoType {
  front = 'front',
  side = 'side',
  back = 'back',
}

export enum ChallengeStatus {
  Active = 'Active',
  Canceled = 'Canceled',
  Finished = 'Finished',
}

export const weekDays = [
  { id: WeekDay.Monday, title: 'Lunes' },
  { id: WeekDay.Tuesday, title: 'Martes' },
  { id: WeekDay.Wednesday, title: 'Miércoles' },
  { id: WeekDay.Thursday, title: 'Jueves' },
  { id: WeekDay.Friday, title: 'Viernes' },
  { id: WeekDay.Saturday, title: 'Sábado' },
  { id: WeekDay.Sunday, title: 'Domingo' },
];

export const challengeStatuses = [
  { id: ChallengeStatus.Active, title: 'Activo' },
  { id: ChallengeStatus.Canceled, title: 'Cancelado' },
  { id: ChallengeStatus.Finished, title: 'Finalizado' },
];

export const goalTypes = [
  { id: GoalType.Gain, title: 'Aumentar' },
  { id: GoalType.Lose, title: 'Reducir' },
];

export const goalFrequencies = [
  { id: GoalFrequency.Revision, title: 'En cada revisión' },
  { id: GoalFrequency.Total, title: 'En total' },
];

export const revisionFrequencies = [
  { id: RevisionFrequency['1w'], title: 'Cada semana' },
  { id: RevisionFrequency['2w'], title: 'Cada 2 semanas' },
  { id: RevisionFrequency['1m'], title: 'Una vez al mes' },
];

export const unitsOfTime = [
  { id: UnitOfTime.Day, title: 'Día' },
  { id: UnitOfTime.Week, title: 'Semana' },
  { id: UnitOfTime.Month, title: 'Mes' },
  { id: UnitOfTime.Year, title: 'Año' },
];

export const bodyParts = [
  { id: BodyPart.Bicep, title: 'Bíceps' },
  { id: BodyPart.Chest, title: 'Pectoral' },
  { id: BodyPart.Hips, title: 'Cadera' },
  { id: BodyPart.Neck, title: 'Cuello' },
  { id: BodyPart.Shoulders, title: 'Espalda' },
  { id: BodyPart.Thigh, title: 'Muslo' },
  { id: BodyPart.Waist, title: 'Cintura' },
];
