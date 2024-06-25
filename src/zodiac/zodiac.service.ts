import { Injectable } from '@nestjs/common';
import { ZodiacSign } from './interface/IZodiac';

@Injectable()
export class ZodiacService {
  private zodiacSigns: ZodiacSign[] = [
    {
      name: 'Aries',
      horoscope: 'Ram',
      start: { month: 3, day: 21 },
      end: { month: 4, day: 19 },
    },
    {
      name: 'Taurus',
      horoscope: 'Bull',
      start: { month: 4, day: 20 },
      end: { month: 5, day: 20 },
    },
    {
      name: 'Gemini',
      horoscope: 'Twins',
      start: { month: 5, day: 21 },
      end: { month: 6, day: 21 },
    },
    {
      name: 'Cancer (Crab)',
      horoscope: 'Crab',
      start: { month: 6, day: 22 },
      end: { month: 7, day: 22 },
    },
    {
      name: 'Leo',
      horoscope: 'Lion',
      start: { month: 7, day: 23 },
      end: { month: 8, day: 22 },
    },
    {
      name: 'Virgo',
      horoscope: 'Virgin',
      start: { month: 8, day: 23 },
      end: { month: 9, day: 22 },
    },
    {
      name: 'Libra',
      horoscope: 'Balance',
      start: { month: 9, day: 23 },
      end: { month: 10, day: 23 },
    },
    {
      name: 'Scorpius',
      horoscope: 'Scorpion',
      start: { month: 10, day: 24 },
      end: { month: 11, day: 21 },
    },
    {
      name: 'Sagittarius',
      horoscope: 'Archer',
      start: { month: 11, day: 22 },
      end: { month: 12, day: 21 },
    },
    {
      name: 'Capricornus',
      horoscope: 'Goat',
      start: { month: 12, day: 22 },
      end: { month: 1, day: 19 },
    },
    {
      name: 'Aquarius',
      horoscope: 'Water Bearer',
      start: { month: 1, day: 20 },
      end: { month: 2, day: 18 },
    },
    {
      name: 'Pisces',
      horoscope: 'Fish',
      start: { month: 2, day: 19 },
      end: { month: 3, day: 20 },
    },
  ];

  getZodiacSign(date: Date): string {
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    for (const sign of this.zodiacSigns) {
      const { start, end } = sign;

      if (
        (month === start.month && day >= start.day) ||
        (month === end.month && day <= end.day)
      ) {
        return 'Zodiac: ' + sign.name + ', Horoscope: ' + sign.horoscope;
      }

      // Special case for Capricornus which spans across year boundary
      if (
        start.month > end.month &&
        ((month === start.month && day >= start.day) ||
          (month === end.month && day <= end.day))
      ) {
        return 'Zodiac: ' + sign.name + ', Horoscope: ' + sign.horoscope;
      }
    }

    return 'Unknown Zodiac Sign';
  }
}
