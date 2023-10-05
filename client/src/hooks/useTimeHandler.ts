import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import dateFormat from "dateformat";

interface TimeHandlerReturnType {
  date: string;
  increaseMonth: () => void;
  decreaseMonth: () => void;
}

export default function useTimeHandler(): TimeHandlerReturnType {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryDateFrom: number = Number(searchParams.get("time_from"));
  const currentDate: Date = queryDateFrom
    ? new Date(queryDateFrom)
    : new Date(new Date().getFullYear(), new Date().getMonth());
  const date: string = dateFormat(currentDate, "mmmm yyyy");

  const increaseMonth = useCallback(() => {
    const currentMonth: number = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    const nextMonth: number = currentMonth + 1 < 12 ? currentMonth + 1 : 0;
    const nextYear: number = nextMonth === 0 ? currentYear + 1 : currentYear;
    const nextMonthTo: number = nextMonth + 1 < 12 ? nextMonth + 1 : 0;
    const nextYearTo: number = nextMonthTo === 0 ? nextYear + 1 : nextYear;
    const newDateFrom: Date = new Date(nextYear, nextMonth);
    const newDateTo: Date = new Date(nextYearTo, nextMonthTo);
    searchParams.set("time_from", String(newDateFrom.valueOf()));
    searchParams.set("time_to", String(newDateTo.valueOf()));

    setSearchParams(searchParams);
  }, [currentDate]);

  const decreaseMonth = useCallback(() => {
    const currentMonth: number = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    const nextMonth: number = currentMonth - 1 >= 0 ? currentMonth - 1 : 11;
    const nextYear: number = nextMonth === 11 ? currentYear - 1 : currentYear;
    const newDateFrom: Date = new Date(nextYear, nextMonth);
    const newDateTo: Date = new Date(currentYear, currentMonth);
    searchParams.set("time_from", String(newDateFrom.valueOf()));
    searchParams.set("time_to", String(newDateTo.valueOf()));

    setSearchParams(searchParams);
  }, [currentDate]);

  return {date, increaseMonth, decreaseMonth};
}
