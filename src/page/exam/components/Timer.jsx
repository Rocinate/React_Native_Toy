import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const Timer = ({timeEnd}) => {
  const [second, setSecond] = useState(60 * 60);

  useEffect(() => {
    (function timer(num) {
      if (second == 0) {
        timeEnd();
      }
      setTimeout(function () {
        setSecond(num - 1);
      }, 1000);
    })(second);
  }, [second]);
  return (
    <View>
      <Text>{`${parseInt(second/60)}:${second%60}`}</Text>
    </View>
  );
};

export default Timer;
