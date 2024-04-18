
import React, { useState, useEffect } from 'react';

export function Copyright() {

  const [dateYear, setDateYear] = useState();

  const getYear = () => setDateYear(new Date().getFullYear())


  useEffect(() => {
    getYear();
  }, [])
  return (
    <>
      &copy; {dateYear}
    </>
  );
}