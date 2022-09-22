import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {ListItem, Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <Text>该文件夹下暂时没有文件，请联系管理员添加</Text>
    </View>
  );
};

const FolderList = props => {
  const {data, setFolderPath} = props;

  return (
    <>
      {data.length == 0 ? (
        <Empty />
      ) : (
        <ScrollView>
          <View className="flex-1 p-5 w-full flex-wrap flex-row">
            {data.map(item => (
              <TouchableHighlight
                className="w-1/6"
                key={item.name}
                onPress={() => {
                  setFolderPath(item.path);
                }}
                underlayColor="#DDD">
                <View className="flex items-center py-5">
                  <Icon name="folder-open" size={60} />
                  <Text>{item.name}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default FolderList;
