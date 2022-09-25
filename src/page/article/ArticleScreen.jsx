import {View} from 'react-native';
import {getPathList} from '../../utils/fileSystem';
import {PATH_TYPE, FOLDER_PATH} from '../../config/config';
import {useEffect, useState} from 'react';

import LoadingPage from '../components/LoadingPage';
import FolderList from '../components/FolderList';

const ArticleScreen = ({navigation}) => {
  const [folderList, setFolderList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取文件夹列表
  useEffect(() => {
    getPathList(FOLDER_PATH.ARTICLE, PATH_TYPE.FOLDER).then(res => {
      setFolderList(res);
      setLoading(false);
    });
  }, []);

  return (
    <View className="flex h-full w-full bg-white">
      {loading ? (
        <LoadingPage />
      ) : (
        <FolderList data={folderList} navigation={navigation}/>
      )}
    </View>
  );
};

export default ArticleScreen;
