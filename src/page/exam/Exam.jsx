import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button, LinearProgress, Dialog} from '@rneui/themed';
import {StackActions} from '@react-navigation/native';

import Quiz from './components/Quiz';
import Timer from './components/Timer';
import {Paper} from '../../utils/paper';
import {writePaper} from '../../utils/examData';
import {ScrollView} from 'react-native-gesture-handler';
import {ButtonGroup} from '@rneui/base';

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <Text>试卷生成中，请稍后</Text>
    </View>
  );
};

const Controller = ({mode, index, setIndex, paper, navigation, name}) => {
  const [visible, setVisible] = useState(false);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    setScoreIndex(paper.score[index]);
  }, [index]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const userSubmit = () => {
    let checkResult = paper.check();
    setDisable(true)
    // if (checkResult[0]) {
    if (true) {
      paper.preJudge();
      writePaper(
        {
          questions: paper.questions,
          score: paper.score,
          fileName: paper.fileName,
        },
        name
      );
      return [true, -1];
    } else {
      return [false, checkResult[1]];
    }
    setDisable(false)
  };

  const adminSubmit = () => {
    paper.done = true
    setPaper(paper);
    writePaper({
        questions: paper.questions,
        score: paper.score,
        fileName: paper.fileName
      }, name)
    return true
  };

  const submit = () => {
    if (mode == 'normal') {
      const result = userSubmit();
      if (result[0]) {
        navigation.dispatch(StackActions.replace('完成'));
      } else {
        toggleOverlay();
        setIndex(result[1]);
      }
    } else {
      const result = adminSubmit();
      if (result) {
        navigation.dispatch(StackActions.replace('试卷管理'));
      }
    }
  };

  return (
    <>
      <View className="flex flex-wrap flex-row justify-between">
        <Dialog isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>请完成所有题目，即将返回第{index + 1}题</Text>
        </Dialog>
        <Button
          // type="outline"
          disabled={index == 0}
          onPress={() => setIndex(index - 1)}>
          上一题
        </Button>
        {index != paper.questions.length - 1 ? (
          <Button type="solid" onPress={() => setIndex(index + 1)}>
            下一题
          </Button>
        ) : (
          <Button type="solid" onPress={() => submit()} disabled={disabled}>
            提 交
          </Button>
        )}
      </View>
      {mode == 'judge' ? (
        <ButtonGroup
          buttons={['0', '1', '2', '3', '4', '5']}
          selectedIndex={scoreIndex}
          onPress={value => {
            paper.finalJudge(index, value)
            setScoreIndex(value)
            setPaper(paper)
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const Exam = ({navigation, route}) => {
  const name = route.params.name;
  const mode = route.params.mode;
  const subject = route.params.subject;
  const data = route.params.paper;

  const [loading, setLoading] = useState(true);
  const [paper, setPaper] = useState(new Paper());
  const [index, setIndex] = useState(0);

  // 随机生成试卷
  useEffect(() => {
    if (data) {
      setPaper(new Paper(data));
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
      <View>
        <LinearProgress value={index / paper.questions.length} />
        <Timer />
      </View>
      <View className="w-1/2 mx-auto">
        <Quiz paper={paper} setPaper={setPaper} index={index} mode={mode} />
        <Controller
          name={name}
          mode={mode}
          index={index}
          setIndex={setIndex}
          paper={paper}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Exam;
