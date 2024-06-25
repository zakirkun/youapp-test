// Define the Zodiac signs and their date ranges
export interface ZodiacSign {
  name: string;
  horoscope: string;
  start: { month: number; day: number };
  end: { month: number; day: number };
}
