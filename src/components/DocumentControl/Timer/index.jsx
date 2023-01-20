import React, { useState, useEffect } from 'react';
import useTimer from '@/hooks/useTimer';

function Timer({ initialTime }) {
  const timerText = useTimer(initialTime);
  return <div>{timerText}</div>;
}

export default Timer;
