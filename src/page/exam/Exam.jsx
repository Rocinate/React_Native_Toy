import {View} from 'react-native';
import {Quiz} from './components/Quiz';
import {Timer} from './components/Timer';
import Paper from '../../utils/paper';
import {writePaper} from '../../utils/examData'

import {useEffect, useState} from 'react';
import {Button} from '@rneui/themed';
import { StackActions } from '@react-navigation/native';

const Status = ({index, count}) => {
  return (
    <>
      <Timer />
      <View></View>
    </>
  );
};

const Exam = ({navigation, route}) => {
  const name = route.params.name;
  const subject = route.params.subject;
  const data = route.params.paper;

  const [paper, setPaper] = useState(null);
  const [index, setIndex] = useState(0);

  // 随机生成试卷
  useEffect(() => {
    if (data) {
      setPaper(new Paper(data));
    } else {
      const temp = new Paper();
      temp.randomInit(subject).then(res => setPaper(temp));
    }
  }, []);

  return (
    <>
      <Status index={index} count={paper.questions.length} />
      <Quiz paper={paper} setPaper={setPaper} index={index} mode={mode} />
      {mode == 'exam' ? (
        <View className="flex flex-wrap">
          <Button
            className="w-1/3"
            type="outline"
            disabled={index == 0}
            onPress={() => setIndex(index - 1)}>
            上一题
          </Button>
          <Button
            className="w-1/3"
            type="solid"
            onPress={() => setIndex(index + 1)}
            disabled={
              index == paper.questions.length ||
              !paper.questions[index].user.length
            }>
            下一题
          </Button>
          {mode == 'exam' ? (
            <Button
              className="w-1/3"
              type="solid"
              onPress={() => {
                writePaper(paper, name).then(res => {
                  navigation.navigation(StackActions.replace('完成'))
                })
              }}
              disabled={
                index != paper.questions.length &&
                paper.questions[index].user.length
              }>
              提交
            </Button>
          ) : (
            <Button className="w-1/3" type="solid" onPress={() => back()}>
              返回
            </Button>
          )}
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Exam;
