import {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {questionType} from '../../../config/config';
import {ButtonGroup} from '@rneui/themed';

const Choice = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const disabled = mode == 'normal' ? false : true;
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAnswer(paper.questions[index].user.charCodeAt() - 65);
  }, [index]);

  return (
    <View>
      <Text className="text-xl text-center mb-5">单选题</Text>
      <Text>{index+1}.{question.title}</Text>
      <ButtonGroup
        disabled={disabled}
        buttons={question.options.map(item => `${item.key}. ${item.value}`)}
        selectedIndex={answer}
        onPress={value => {
          setAnswer(value);
          paper.answer(index, String.fromCharCode(65 + value));
          setPaper(paper);
        }}
        innerBorderStyle={{color: 'rgba(1,1,1,0)'}}
        buttonStyle={{padding: 5}}
        buttonContainerStyle={{borderColor: 'rgb(227,227,227)', borderWidth: 1, marginBottom: 2}}
        containerStyle={{marginBottom: 20, marginTop: 20, display: 'flex', flexDirection: 'column', height: 'auto', borderWidth: 0}}
      />
    </View>
  );
};

const MultiChoices = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const disabled = mode == 'normal' ? false : true;
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAnswer(
      paper.questions[index].user.split('').map(item => item.charCodeAt() - 65),
    );
  }, [index]);

  return (
    <View>
      <Text className="text-xl text-center mb-5">多选题</Text>
      <Text>{index+1}.{question.title}</Text>
      <ButtonGroup
        disabled={disabled}
        buttons={question.options.map(item => `${item.key}. ${item.value}`)}
        selectMultiple
        selectedIndexes={answer}
        onPress={value => {
          setAnswer(value);
          const user = value.map(item => String.fromCharCode(65 + item));
          paper.answer(index, user.join(''));
          setPaper(paper);
        }}
        innerBorderStyle={{color: 'rgba(1,1,1,0)'}}
        buttonStyle={{padding: 5}}
        buttonContainerStyle={{borderColor: 'rgb(227,227,227)', borderWidth: 1, marginBottom: 2}}
        containerStyle={{marginBottom: 20, marginTop: 20, display: 'flex', flexDirection: 'column', height: 'auto', borderWidth: 0}}
      />
    </View>
  );
};

const Complete = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const editable = mode == 'normal' ? true : false;
  const [answer, setAnswer] = useState('');
  const part = question.title.split('_').filter(item => item);

  useEffect(() => {
    setAnswer(paper.questions[index].user);
  }, [index]);

  return (
    <View>
      <Text className="text-xl text-center mb-5">填空题</Text>
      <Text className="flex-wrap">
      {index+1}.{part[0]}
        <Text className="text-red-500">①</Text>
        {part[1]}
        <Text className="text-red-500">②</Text>
        {part[2]}
      </Text>
      <View className="flex flex-row items-center mt-5">
        <Text>①</Text>
        <TextInput
          className="w-full p-0 pl-2 m-0 border-b-slate-900 border-b"
          editable={editable}
          dense={true}
          onChangeText={text => {
            setAnswer([text, answer[1]]);
            paper.answer(index, [text, answer[1]]);
            setPaper(paper);
          }}
          value={answer[0]}
        />
      </View>
      <View className="flex flex-row items-center my-5">
        <Text>②</Text>
        <TextInput
          className="w-full p-0 m-0 pl-2 border-b-slate-900 border-b"
          editable={editable}
          mode="outlined"
          onChangeText={text => {
            setAnswer([answer[0], text]);
            paper.answer(index, [answer[0], text]);
            setPaper(paper);
          }}
          value={answer[1]}
        />
      </View>
    </View>
  );
};

const Judgement = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const disabled = mode == 'normal' ? false : true;
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAnswer(question.options.indexOf(paper.questions[index].user));
  }, [index]);

  return (
    <View>
      <Text className="text-xl text-center mb-5">判断题</Text>
      <Text>{index+1}.{question.title}</Text>
      <ButtonGroup
        disabled={disabled}
        buttons={question.options}
        selectedIndex={answer}
        onPress={value => {
          setAnswer(value);
          paper.answer(index, question.options[value]);
          setPaper(paper);
        }}
        innerBorderStyle={{color: 'rgba(1,1,1,0)'}}
        buttonStyle={{padding: 5}}
        buttonContainerStyle={{borderColor: 'rgb(227,227,227)', borderWidth: 1, marginBottom: 2}}
        containerStyle={{marginBottom: 20, marginTop: 20, display: 'flex', flexDirection: 'column', height: 'auto', borderWidth: 0}}
      />
    </View>
  );
};

const Subjective = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const editable = mode == 'normal' ? true : false;
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAnswer(paper.questions[index].user);
  }, [index]);

  return (
    <View>
      <Text className="text-xl text-center mb-5">简答题</Text>
      <Text>{index+1}.{question.title}</Text>
      <View>
        <TextInput
          editable={editable}
          className="w-full border p-2 my-5 rounded-sm"
          multiline={true}
          value={answer}
          onChangeText={text => {
            setAnswer(text);
            paper.answer(index, text);
            setPaper(paper);
          }}
        />
      </View>
    </View>
  );
};

const Quiz = ({paper, setPaper, index, mode}) => {
  switch (paper.questions[index].type) {
    case questionType.CHOICES:
      return (
        <Choice paper={paper} mode={mode} setPaper={setPaper} index={index} />
      );
    case questionType.MULTICHOICES:
      return (
        <MultiChoices
          paper={paper}
          mode={mode}
          setPaper={setPaper}
          index={index}
        />
      );
    case questionType.COMPLETE:
      return (
        <Complete paper={paper} mode={mode} setPaper={setPaper} index={index} />
      );
    case questionType.JUDGEMENT:
      return (
        <Judgement
          paper={paper}
          mode={mode}
          setPaper={setPaper}
          index={index}
        />
      );
    case questionType.SUBJECTIVE:
      return (
        <Subjective
          paper={paper}
          mode={mode}
          setPaper={setPaper}
          index={index}
        />
      );
  }
};

export default Quiz;
