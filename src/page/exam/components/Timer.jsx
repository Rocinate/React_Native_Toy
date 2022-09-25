import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const getString = (num, significant = 2) => {
  let temp = num + '';
  while (temp.length < significant) {
    temp = '0' + temp;
  }
  return temp;
};

const Timer = ({timeEnd}) => {
  const [leftTime, setLeftTime] = useState(60 * 60);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    (function timer(num) {
      if (num == 0) {
        timeEnd();
      }
      setTimeout(function () {
        setLeftTime(num - 1);
      }, 1000);
    })(leftTime);
    // 更新时间
    setMinutes(getString(parseInt(leftTime / 60)));
    setSecond(getString(leftTime % 60));
  }, [leftTime]);
  return (
    <View className="flex items-center py-4">
      <View className="bg-black rounded-lg flex items-center justify-center w-40 h-10">
        <Text className="text-white text-4xl">
          {minutes} : {second}
        </Text>
      </View>
    </View>
  );
};

export default Timer;
