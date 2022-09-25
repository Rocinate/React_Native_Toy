import {View, TouchableHighlight, Text} from 'react-native'

const Choose = props => {
  const {navigation} = props;
  return (
    <View className="flex-1 h-full justify-center items-center flex-row bg-white">
      <TouchableHighlight
        className="w-1/2 h-full bg-white"
        underlayColor="#DDD"
        onPress={() => {
          navigation.navigate("登录", {mode: 'exam'})
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
            navigation.navigate("登录", {mode: 'admin'})
        }}>
        <View className="flex items-center py-5 h-full justify-center">
          <Text>我是考官</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Choose;
