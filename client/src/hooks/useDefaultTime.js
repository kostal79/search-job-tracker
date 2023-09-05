import React from 'react'

export default function useDefaultTime() {
    const currentMonth = (new Date()).getMonth();
    const currentYear = (new Date()).getFullYear();
    const nextMonth = currentMonth + 1 < 12 ? currentMonth + 1 : 0;
  
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
  
    const DateFrom = (new Date(currentYear, currentMonth)).valueOf();
    const DateTo = (new Date(nextYear, nextMonth)).valueOf();
  
  return [DateFrom, DateTo]
}
