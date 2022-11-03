import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {LinearProgress} from '@rneui/themed';

import Quiz from './components/Quiz';
import Timer from './components/Timer';
import Controller from './components/Controller';
import {Paper} from '../../utils/paper';
import {ScrollView} from 'react-native-gesture-handler';
import {loadPaperDetail} from '../../utils/examData';

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <Text>试卷生成中，请稍后</Text>
    </View>
  );
};

const Exam = ({navigation, route}) => {
  const name = route.params.name;
  const mode = route.params.mode;
  const subject = route.params.subject;
  const fileName = route.params.fileName;

  const [loading, setLoading] = useState(true);
  const [paper, setPaper] = useState(new Paper());
  const [index, setIndex] = useState(0);

  // 随机生成试卷
  useEffect(() => {
    if (fileName) {
      loadPaperDetail(fileName).then(res => {
        let temp = new Paper(res.questions, res.score, fileName);
        setPaper(temp);
        setLoading(false);

        if (mode == 'judge') {
          setIndex(40);
        }
      });
    } else {
      paper.randomInit(subject).then(res => {
        setPaper(paper);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <Empty />;
  }
  return (
    <ScrollView className="bg-white h-full w-full">
      {mode == 'normal' ? (
        <View>
          <LinearProgress value={index / paper.questions.length} />
          <Timer />
        </View>
      ) : (
        <></>
      )}
      <View className="w-1/2 mx-auto">
        <Quiz paper={paper} setPaper={setPaper} index={index} mode={mode} />
        <Controller
          name={name}
          mode={mode}
          index={index}
          setIndex={setIndex}
          paper={paper}
          setPaper={setPaper}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Exam;
