import React, { FC, useState, useEffect } from 'react';

type ClockProps = {
  label?: string;
};

export const Clock: FC<ClockProps> = ({ label }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => setTime(new Date()), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <span>
      {label} {time.toLocaleTimeString()}
    </span>
  );
};
