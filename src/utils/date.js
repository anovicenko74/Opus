export function getFormatFromTimestamp(timeDifference) {
  const MS_IN_SEC = 1000;
  const MS_IN_MIN = 60000;
  const MS_IN_HOUR = 3600000;

  if (timeDifference <= MS_IN_SEC * 5) {
    return 'сейчас';
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
