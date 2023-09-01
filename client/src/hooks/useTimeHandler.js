import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getYearMonth } from '../utils/getYearMont';
import dateFormat from "dateformat";


export default function useTimeHandler() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentTime = () => {
      const timeFrom = searchParams.get("time_from")
      if (timeFrom) {
        return(getYearMonth(Number(timeFrom)))
      } else {
        const now = Date.now()
        return(getYearMonth(now))
      }
    };
  
    const [currentDate, setCurrentDate] = useState(currentTime());
    const date = dateFormat(currentDate, "mmmm yyyy");
  
    const increaseMonth = useCallback(() => {
      const newDate = currentDate.setMonth(currentDate.getMonth() + 1);
      setCurrentDate(new Date(newDate));
      searchParams.set("time_from", newDate);
      const timeTo = currentDate.setMonth(currentDate.getMonth() + 1);
      searchParams.set("time_to", timeTo);
      searchParams.set("page", 1)
      setSearchParams(searchParams);
    },[currentDate])
  
    const decreaseMonth = useCallback(() => {
      const newDate = currentDate.setMonth(currentDate.getMonth() - 1);
      setCurrentDate(new Date(newDate));
      searchParams.set("time_from", newDate);
      const timeTo = currentDate.setMonth(currentDate.getMonth() + 1);
      searchParams.set("time_to", timeTo);
      searchParams.set("page", 1)
      setSearchParams(searchParams);
    }, [currentDate])

  return [date, increaseMonth, decreaseMonth]
}
