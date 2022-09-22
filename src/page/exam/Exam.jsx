import {View} from 'react-native';
import {questionType} from '../../config/config';
import {Quiz} from './components/Quiz';
import {Timer} from './components/Timer';
import {generatePaper} from '../../utils/examData';

import {useEffect, useState} from 'react';
import {Button} from '@rneui/themed';

const Status = ({index, count}) => {
  return (
    <>
      <Timer />
      <View></View>
    </>
  );
};

const Exam = props => {
  const {mode, data, subject} = props;
  const [paper, setPaper] = useState({});
  const [index, setIndex] = useState(0);

  // 随机生成试卷
  useEffect(() => {
    if (mode == 'normal') {
      generatePaper(subject).then(res => {
        setPaper(res);
      });
    } else {
      setPaper(data);
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
              onPress={() => submit()}
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
