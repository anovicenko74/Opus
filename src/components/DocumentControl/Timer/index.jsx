import React, { useState, useEffect } from 'react';
import { getFormatFromTimestamp } from '@/utils/date.js';
import useTimer from '@/hooks/useTimer';

function Timer({ initialTime }) {
  console.log(initialTime);
  const timerText = useTimer(initialTime);
  return <div>{timerText}</div>;
}

export default Timer;
