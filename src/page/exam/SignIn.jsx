import {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Text, View, TextInput} from 'react-native';
import {Button} from '@rneui/themed';
import {getSubject} from '../../utils/examData';
import {adminPass} from '../../config/config';
import {StackActions} from '@react-navigation/native';

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
  const mode = route.params.mode;
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [selected, setSelected] = useState('');
  const [subject, setSubject] = useState([]);
  const [error, setError] = useState('');

  const checkInfo = () => {
    setError('');
    if (mode === 'exam') {
      if (userName && selected) {
        navigation.dispatch(StackActions.replace('考试'), {
          name: userName,
          subject: selected,
        });
      }
      setError('请填写完整信息');
    } else if (mode === 'admin' && password === adminPass) {
      navigation.dispatch(StackActions.replace('试卷管理'));
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
  }, []);

  return (
    <View className="flex h-full justify-center items-center">
      <View className="flex items-center">
        <Text className="text-xl">{partition[mode].title}</Text>
        <TextInput
          className="border my-4 w-60 rounded"
          placeholder={partition[mode].placeholder}
          secureTextEntry={mode == 'admin'}
          onChangeText={text => {
            if (mode == 'exam') {
              setUserName(text);
            } else {
              setPassword(text);
            }
          }}
        />
        {mode == 'exam' ? (
          <View className="w-60 border rounded">
            <Picker
              selectedValue={selected}
              onValueChange={(itemValue, itemIndex) => {
                setSelected(itemValue);
              }}>
              <Picker.Item label="请选择科目" value={-1} enabled={false} />
              {subject.map(item => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
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
