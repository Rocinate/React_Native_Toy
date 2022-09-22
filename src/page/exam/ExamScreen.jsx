import {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

const Choose = props => {
  const {setMode} = props;
  return (
    <View className="flex-1 h-full justify-center items-center flex-row">
      <TouchableHighlight
        className="w-1/2 h-full"
        underlayColor="#DDD"
        onPress={() => {
          setMode('exam');
        }}>
        <View className="flex items-center py-5 h-full justify-center">
          <Text>我是考生</Text>
        </View>
      </TouchableHighlight>
      <View className="h-full bg-zinc-200" style={{width: 1}}></View>
      <TouchableHighlight
        className="w-1/2"
        underlayColor="#DDD"
        onPress={() => {
          setMode('admin');
        }}>
        <View className="flex items-center py-5 h-full justify-center">
          <Text>我是考官</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const CheckIn = props => {
  const {mode, info, setInfo} = props;
  return (
    <View className="flex h-full justify-center items-center">
      <View>
        <Text>{mode == 'exam' ? '考试系统登录' : '管理系统登录'}</Text>
        {mode == 'exam' ? (
          <ExamSign setInfo={setInfo} info={info}/>
        ) : (
          <AdminSign setInfo={setInfo} info={info}/>
        )}
      </View>
    </View>
  );
};

const ExamSign = props => {
  const {info, setInfo} = props;
  return (
    <>
      <TextInput
        placeholder="姓名"
        style={styles.inputText}
        onChangeText={text => {
          setInfo(Object.assign(info, {name: text}));
        }}
      />
      <Button
        onPress={() => {}}
        title="开始"
      />
    </>
  );
};

const AdminSign = props => {
  const {info, setInfo} = props;
  return (
    <>
      <TextInput
        placeholder="密码"
        style={styles.inputText}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button
        color={colors.brand.primary}
        style={styles.checkButton}
        onPress={() => {
          if (onAdminLogin(password)) {
            loadPaperList();
            navigation.navigate('ExamList');
          }
        }}
        title="登录"
      />
    </>
  );
};

const ExamScreen = () => {
  const [mode, setMode] = useState('');
  const [info, setInfo] = useState({});
  return (
    <View className="flex bg-white">
      {/* <Choose setMode={setMode}/> */}
      <CheckIn mode={mode} setInfo={setInfo} />
    </View>
  );
};

export default ExamScreen;
