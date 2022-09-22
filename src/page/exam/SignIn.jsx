import {useEffect, useState} from 'react';
import {Text, TouchableHighlight, View, TextInput, Picker} from 'react-native';
import {Button} from '@rneui/themed';
import {getSubject} from '../../utils/examData'

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


const partition = {
    'exam' : {
        'title': '考试系统登录',
        'placeholder': '姓名',
        'buttonInfo': '开始',
        'navigate': '/exam'
    },
    'admin': {
        'title': '管理系统登录',
        'placeholder': '密码',
        'buttonInfo': '登录',
        'navigate': '/admin'
    }
}

const CheckIn = props => {
  const {mode, info, setInfo} = props;
  const [subject, setSubject] = useState([])
  useEffect(() => {
    getSubject().then(res => {
      res.length && setSubject(res)
    })
  })
  return (
    <View className="flex h-full justify-center items-center">
      <View className="flex items-center">
        <Text className="text-xl">{partition[mode].title}</Text>
        <TextInput
          className='border my-4 w-60 rounded'
          placeholder={partition[mode].placeholder}
          onChangeText={text => {
            setInfo(Object.assign(info, {password: text}));
          }}
        />
        {mode == 'exam' ? <Picker onValueChange={(itemValue, itemIndex) => {
          setInfo(Object.assign(info, {subject: itemValue}))
        }}>
          {subject.map((item) => (
            <Picker.Item label={item} value={item} key={item}/>
          ))}
        </Picker> : <></>}
        <Button size="md" buttonStyle={{width: 150}} onPress={() => {}} title={partition[mode].buttonInfo} />
      </View>
    </View>
  );
};

const SignIn = () => {
  const [mode, setMode] = useState('exam');
  const [info, setInfo] = useState({});
  return (
    <View className="flex bg-white">
      {/* <Choose setMode={setMode}/> */}
      <CheckIn mode={mode} setInfo={setInfo} info={info} />
    </View>
  );
};

export default SignIn;
