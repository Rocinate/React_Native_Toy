import {useEffect, useState} from 'react';
import {View, Text, AppState} from 'react-native';
import {Button, Dialog} from '@rneui/themed';
import {StackActions} from '@react-navigation/native';
import {writePaper} from '../../../utils/examData';
import {ButtonGroup} from '@rneui/themed';

const Controller = ({
  mode,
  index,
  setIndex,
  paper,
  setPaper,
  navigation,
  name,
}) => {
  const [visible, setVisible] = useState(false);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    setScoreIndex(paper.score[index]);
  }, [index]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const Submit = () => {
    return (
      <>
        {mode != 'history' ? (
          <Button type="solid" onPress={() => submit()} disabled={disabled}>
            提 交
          </Button>
        ) : (
          <Button
            type="solid"
            onPress={() => navigation.dispatch(StackActions.replace('试卷管理'))}
            disabled={disabled}>
            返 回
          </Button>
        )}
      </>
    );
  };

  const userSubmit = async() => {
    setDisable(true);
    let checkResult = paper.check();
    console.log(checkResult)
    if (checkResult[0]) {
      paper.preJudge();
      await writePaper(
        {
          questions: paper.questions,
          score: paper.score,
          fileName: paper.fileName,
        },
        name,
      );
      return [true, -1];
    } else {
      setDisable(false);
      return [false, checkResult[1]];
    }
  };

  const adminSubmit = async() => {
    setDisable(true);
    paper.done = true;
    setPaper(paper);
    await writePaper(
      {
        questions: paper.questions,
        score: paper.score,
        fileName: paper.fileName,
      },
      name,
    );
    return true;
  };

  const submit = () => {
    if (mode == 'normal') {
      userSubmit().then(res => {
        if (res[0]) {
          navigation.dispatch(StackActions.replace('完成'));
        } else {
          toggleOverlay();
          setIndex(res[1]);
        }
      });
    } else {
      adminSubmit().then(res => {
        if (res) {
            navigation.dispatch(StackActions.replace('试卷管理'));
        }
      });
    }
  };

  return (
    <>
      <View className="flex flex-wrap flex-row justify-between">
        <Dialog isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>请完成所有题目，即将返回第{index + 1}题</Text>
        </Dialog>
        <Button
          disabled={index == 0}
          onPress={() => setIndex(index - 1)}>
          上一题
        </Button>
        {index != paper.questions.length - 1 ? (
          <Button type="solid" onPress={() => setIndex(index + 1)}>
            下一题
          </Button>
        ) : (
          <Submit />
        )}
      </View>
      {mode != 'normal' && index >= 40 ? (
        <ButtonGroup
          buttons={['0', '1', '2', '3', '4', '5']}
          disabled={mode=='history'}
          selectedIndex={scoreIndex}
          onPress={value => {
            paper.finalJudge(index, value);
            setScoreIndex(value);
            setPaper(paper);
          }}
        />
      ) : mode != 'normal' && index < 40 ? (
        <Text>得分: {paper.score[index]}</Text>
      ): <></>}
    </>
  );
};

export default Controller;
