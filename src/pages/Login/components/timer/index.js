import { Text } from '@nextui-org/react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useEffect, useState } from 'react';

const Timer = () => {
  moment.locale('pt-br');

  const getDateNow = () => moment().format('LLL');

  const [date, setDate] = useState(getDateNow());

  useEffect(() => {
    let updateDateInterval = setInterval(() => {
      setDate(getDateNow());
    }, 100);

    return () => {
      clearInterval(updateDateInterval);
    };
  }, [date]);
  return (
    <Text
      css={{
        color: '$white',
        fontSize: '20px',
      }}
    >
      {date}
    </Text>
  );
};
export default Timer;
