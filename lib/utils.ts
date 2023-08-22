import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { BodyPart } from './config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);

  return date.toLocaleDateString('es-ES', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export const translateBodyPart = (bodyPart: BodyPart): string => {
  const translations = {
    [BodyPart.Bicep]: 'Bíceps',
    [BodyPart.Chest]: 'Pectoral',
    [BodyPart.Hips]: 'Caderas',
    [BodyPart.Neck]: 'Cuello',
    [BodyPart.Shoulders]: 'Espalda',
    [BodyPart.Thigh]: 'Muslo',
    [BodyPart.Waist]: 'Cintura',
  };

  return translations[bodyPart];
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const formatDateWithTime = (date: Date) => {
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
};
