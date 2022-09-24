import {View, Text} from 'react-native';
import {questionType} from '../../../config/config';
import {ButtonGroup} from '@rneui/themed';

const Choice = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const disabled = mode == 'normal' ? false : true;

  if (question.type == questionType.CHOICES) {
    return (
      <View>
        <Text>单选题</Text>
        <Text>{question.title}</Text>
        <ButtonGroup
          disabled={disabled}
          buttons={question.options.map(item => `${item.key}. ${item.value}`)}
          selectedIndex={question.user}
          onPress={value => {
            setSelectedIndex(value);
          }}
          containerStyle={{marginBottom: 20}}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>多选题</Text>
        <Text>{question.title}</Text>
        <ButtonGroup
          disabled={disabled}
          buttons={question.options}
          selectMultiple
          selectedIndexes={question.user}
          onPress={value => {
            paper.questions[index].user = value;
            setPaper(paper);
          }}
          containerStyle={{marginBottom: 20}}
        />
      </View>
    );
  }
};

const Complete = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const enabled = mode == 'normal' ? true : false;

  let part = question.title.split('_').filter(item => item);

  return (
    <View>
      <View>
        <Text className="flex-wrap">
          {part[0]}
          <Text className="text-red-500">①</Text>
          {part[1]}
          <Text className="text-red-500">②</Text>
          {part[2]}
        </Text>
      </View>
      <View>
        <Text>①</Text>
        <TextInput
          enabled={enabled}
          mode="outlined"
          onChangeText={text => {
            paper.questions[index].user[0] = text;
            setPaper(paper);
          }}
          value={question.user[0]}
        />
      </View>
      <View>
        <Text>②</Text>
        <TextInput
          enabled={enabled}
          mode="outlined"
          onChangeText={text => {
            paper.questions[index].user[1] = text;
            setPaper(paper);
          }}
          value={question.user[1]}
        />
      </View>
    </View>
  );
};

const Judgement = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const disabled = mode == 'normal' ? false : true;

  return (
    <View>
      <Text>{question.title}</Text>
      <ButtonGroup
        disabled={disabled}
        buttons={question.options}
        selectMultiple
        selectedIndexes={question.user}
        onPress={value => {
          paper.questions[index].user = value;
          setPaper(paper);
        }}
        containerStyle={{marginBottom: 20}}
      />
    </View>
  );
};

const Subjective = ({paper, mode, setPaper, index}) => {
  const question = paper.questions[index];
  const enabled = mode == 'normal' ? true : false;

  return (
    <View>
      <Text>{question.title}</Text>
      <TextInput
        enabled={enabled}
        mode="outlined"
        multiline={true}
        value={question.user}
        onChangeText={text => {
          paper.questions[index].user = text;
          setPaper(paper);
        }}
      />
    </View>
  );
};

const Quiz = ({paper, setPaper, index, mode}) => {
  switch (paper.questions[index].type) {
    case questionType.CHOICES:
      return (
        <Choice paper={paper} mode={mode} setPaper={setPaper} index={index} />
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
