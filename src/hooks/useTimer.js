import { useState, useEffect, useRef } from 'react';

const MS_IN_SEC = 1000;
const MS_IN_MIN = 60000;
const MS_IN_HOUR = 3600000;

function getTimeoutFromTimestamp(timeDifference) {
  if (timeDifference <= MS_IN_SEC * 5) {
    return MS_IN_SEC * 5;
  } else if (timeDifference - MS_IN_SEC <= MS_IN_MIN) {
    return MS_IN_SEC;
  } else if (timeDifference - MS_IN_MIN < MS_IN_HOUR) {
    return MS_IN_MIN;
  } else {
    return MS_IN_HOUR;
  }
}

function getFormatFromTimestamp(timeDifference) {
  if (timeDifference <= MS_IN_SEC * 5) {
    return 'сейчас';
  } else if (timeDifference < MS_IN_MIN) {
    return `${Math.floor(timeDifference / MS_IN_SEC)}с назад`;
  } else if (timeDifference < MS_IN_MIN) {
    return 'меньше минуты назад';
  } else if (timeDifference < MS_IN_HOUR) {
    return `${Math.floor(timeDifference / MS_IN_MIN)}м назад`;
  } else if (timeDifference < 60000 * 60) {
    return `${Math.floor(timeDifference / MS_IN_HOUR)}ч назад`;
  } else {
    const date = new Date(Date.now() - timeDifference);
    return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
  }
}

const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(Date.now() - initialTime);

  useEffect(() => {
    setTimeLeft(Date.now() - initialTime);
  }, [initialTime]);

  useEffect(() => {
    const timeDifference = Date.now() - initialTime;
    const timeout = getTimeoutFromTimestamp(timeDifference);
    const timer = setTimeout(() => {
      setTimeLeft(timeDifference);
    }, timeout);

    return () => clearTimeout(timer);
  });

  return getFormatFromTimestamp(timeLeft);
};

export default useTimer;
