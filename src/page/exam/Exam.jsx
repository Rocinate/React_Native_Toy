import {View, Text} from 'react-native';
import Quiz from './components/Quiz';
import Timer from './components/Timer';
import {Paper} from '../../utils/paper';
import {writePaper} from '../../utils/examData';

import {useEffect, useState} from 'react';
import {Button} from '@rneui/themed';
import {StackActions} from '@react-navigation/native';

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <Text>试卷生成中，请稍后</Text>
    </View>
  );
};

const Status = ({index, count}) => {
  return (
    <>
      <Timer />
      <View>
        <Text>{index}:{count}</Text>
      </View>
    </>
  );
};

const Exam = ({navigation, route}) => {
  const name = route.params.name;
  const mode = route.params.mode;
  const subject = route.params.subject;
  const data = route.params.paper;

  const [loading, setLoading] = useState(true)
  const [paper, setPaper] = useState(new Paper());
  const [index, setIndex] = useState(0);

  // 随机生成试卷
  useEffect(() => {
    if (data) {
      setPaper(new Paper(data));
    } else {
      paper.randomInit(subject).then(res => {
        setPaper(paper)
        setLoading(false)
      });
    }
  }, []);

  if (loading) {
    return <Empty />;
  }
  return (
    <>
      {data ? <></> : <Status index={index} count={paper.questions.length} />}
      <Quiz paper={paper} setPaper={setPaper} index={index} mode={mode} />
      {mode == 'normal' ? (
        <View className="flex flex-wrap flex-row">
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
          {mode == 'normal' ? (
            <Button
              className="w-1/3"
              type="solid"
              onPress={() => {
                writePaper(paper, name).then(res => {
                  navigation.dispatch(StackActions.replace('完成'));
                });
              }}
              disabled={
                index != paper.questions.length ||
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
