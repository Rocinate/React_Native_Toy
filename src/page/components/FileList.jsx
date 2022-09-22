import {useEffect, useState} from 'react';
import LoadingPage from './LoadingPage';
import {getPathList, getRootFiles} from '../../utils/fileSystem';
import {PATH_TYPE} from '../../config/config';
import {View, Text, ScrollView} from 'react-native';
import {ListItem, Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <Text>该文件夹下暂时没有文件，请联系管理员添加</Text>
    </View>
  );
};

const FileList = props => {
  const {path, setFilePath} = props;
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getRootFiles()
    getPathList(path, PATH_TYPE.FILE).then(res => {
      console.log(path)
      // console.log(res)
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
        <ScrollView>
          {fileList.map(item => (
            <ListItem key={item.name}>
              <Button>
                <Icon name="pdffile1" />
              </Button>
            </ListItem>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default FileList;
