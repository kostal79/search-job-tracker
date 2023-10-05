interface DefaulTimeReturn {
  TimestampFrom: number;
  TimestampTo: number;
}

export default function useDefaultTime(): DefaulTimeReturn {
  const currentMonth: number = new Date().getMonth();
  const currentYear: number = new Date().getFullYear();
  const nextMonth: number = currentMonth + 1 < 12 ? currentMonth + 1 : 0;

  const nextYear: number = nextMonth === 0 ? currentYear + 1 : currentYear;

  const TimestampFrom: number = new Date(currentYear, currentMonth).valueOf();
  const TimestampTo: number = new Date(nextYear, nextMonth).valueOf();

  return { TimestampFrom, TimestampTo };
}
