import {View} from 'react-native';
import {questionType} from '../../config/config';
import {Quiz} from './components/Quiz';
import {Timer} from './components/Timer';
import {generatePaper} from '../../utils/examData';

import {useEffect, useState} from 'react';

const Status = ({index, count, submit}) => {
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
      <Status index={index} count={paper.questions.length} submit={submit} />
      <Quiz paper={paper} setPaper={setPaper} index={index} mode={mode} />
    </>
  );
};

export default Exam;
