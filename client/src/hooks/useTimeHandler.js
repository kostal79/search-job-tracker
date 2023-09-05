import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom';
import dateFormat from "dateformat";


export default function useTimeHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryDateFrom = Number(searchParams.get("time_from"));
  const currentDate = queryDateFrom ? new Date(queryDateFrom) : new Date((new Date()).getFullYear(), (new Date()).getMonth());
  const date = dateFormat(currentDate, "mmmm yyyy");

  const increaseMonth = useCallback(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const nextMonth = currentMonth + 1 < 12 ? currentMonth + 1 : 0;
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
    const newDateFrom = new Date(nextYear, nextMonth);
    const nextMonthTo = nextMonth + 1 < 12 ? nextMonth + 1 : 0;
    const nextYearTo = nextMonthTo === 0 ? nextYear + 1 : nextYear;
    const newDateTo = new Date(nextYearTo, nextMonthTo);
    searchParams.set("time_from", newDateFrom.valueOf());
    searchParams.set("time_to", newDateTo.valueOf());

    setSearchParams(searchParams)
  }, [currentDate])

  const decreaseMonth = useCallback(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const nextMonth = currentMonth - 1 >= 0 ? currentMonth -1 : 11;
    const nextYear = nextMonth === 11 ? currentYear - 1 : currentYear;
    const newDateFrom = new Date(nextYear, nextMonth);
    const newDateTo = new Date(currentYear, currentMonth);
    searchParams.set("time_from", newDateFrom.valueOf());
    searchParams.set("time_to", newDateTo.valueOf());

    setSearchParams(searchParams)
  }, [currentDate])

  return [date, increaseMonth, decreaseMonth]
}
