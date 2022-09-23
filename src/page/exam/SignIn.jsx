import {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Text, View, TextInput} from 'react-native';
import {Button} from '@rneui/themed';
import {getSubject} from '../../utils/examData';
import {adminPass} from '../../config/config';

const partition = {
  exam: {
    title: '考试系统登录',
    placeholder: '姓名',
    buttonInfo: '开始',
    navigate: 'exam',
  },
  admin: {
    title: '管理系统登录',
    placeholder: '密码',
    buttonInfo: '登录',
    navigate: 'admin',
  },
};

const SignIn = ({navigation, route}) => {
  const mode = route.params.mode
  const [info, setInfo] = useState({});
  const [subject, setSubject] = useState([]);
  const [error, setError] = useState('');

  const checkInfo = () => {
    setError('');
    if (mode === 'exam') {
      info.name && info.subject && navigation.navigate('考试', info);
      setError('请填写完整信息');
    } else if (mode === 'admin' && info.password === adminPass) {
      navigation.navigate('试卷管理', info);
    } else {
      setError('密码错误');
    }
  };

  useEffect(() => {
    if (mode === 'exam') {
      getSubject().then(res => {
        res.length && setSubject(res);
      });
    }
  });

  return (
    <View className="flex h-full justify-center items-center">
      <View className="flex items-center">
        <Text className="text-xl">{partition[mode].title}</Text>
        <TextInput
          className="border my-4 w-60 rounded"
          placeholder={partition[mode].placeholder}
          type={mode == 'exam' ? 'text' : 'password'}
          onChangeText={text => {
            if (mode == 'exam') {
              setInfo(Object.assign(info, {name: text}));
            } else {
              setInfo({password: text});
            }
          }}
        />
        {mode == 'exam' ? (
          <Picker
            onValueChange={(itemValue, itemIndex) => {
              setInfo(Object.assign(info, {subject: itemValue}));
            }}>
            {subject.map(item => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        ) : (
          <></>
        )}
        <Text>{error}</Text>
        <View>
          <Button
            size="md"
            buttonStyle={{width: 150}}
            onPress={checkInfo}
            title={partition[mode].buttonInfo}
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;
