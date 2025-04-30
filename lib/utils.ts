import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import parse from 'html-react-parser';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ne-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function parseHTML(html: string) {
  return parse(html);
}