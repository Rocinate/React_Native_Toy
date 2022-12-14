import {useEffect, useState} from 'react';
import LoadingPage from './LoadingPage';
import {getPathList, getRootFiles} from '../../utils/fileSystem';
import {PATH_TYPE} from '../../config/config';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center bg-white">
      <Text>该文件夹下暂时没有文件，请联系管理员添加</Text>
    </View>
  );
};

const FileList = props => {
  const {navigation, route} = props;
  const path = route.params.path;
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getPathList(path, PATH_TYPE.FILE).then(res => {
      setFileList(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : fileList.length == 0 ? (
        <Empty />
      ) : (
        <ScrollView className='h-min-full bg-white'>
          <View className="flex-1 p-5 w-full flex-wrap flex-row bg-white">
            {fileList.map(item => (
              <TouchableHighlight
                className="w-1/6"
                key={item.name}
                onPress={() => {
                  if (path.indexOf("video") !== -1) {
                    navigation.navigate('视频预览', {path: item.path});
                  } else {
                    navigation.navigate('文件预览', {path: item.path});
                  }
                }}
                underlayColor="#DDD">
                <View className="flex items-center py-5">
                  <Icon name="pdffile1" size={60} />
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

export default FileList;
