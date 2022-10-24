import {useEffect, useState} from 'react';
import {Text, View, TouchableHighlight, ScrollView} from 'react-native';
import LoadingPage from '../components/LoadingPage';

import {Button, SearchBar} from '@rneui/themed';
import {getPathList} from '../../utils/fileSystem';
import {PATH_TYPE, FOLDER_PATH} from '../../config/config';
import moment from 'moment';
import 'moment/locale/zh-cn'

const Empty = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <Text>暂无考试记录</Text>
    </View>
  );
};

const Admin = ({navigation}) => {
  const [paperList, setPaperList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
    setSearchList(paperList.filter(item => item.name.indexOf(search)!==-1))
  };

  useEffect(() => {
    getPathList(FOLDER_PATH.PAPER, PATH_TYPE.FILE).then(res => {
      const result = res.map(item => {
        const part = item.name.split('.')[0].split('-');
        return {
          fileName: item.name,
          name: part[0],
          time: parseInt(part[1]),
          done: part[2],
          score: part[3],
        };
      });
      result.sort((a, b) => b.time - a.time)
      setPaperList(result);
      setSearchList(result);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : searchList.length == 0 ? (
        <Empty />
      ) : (
        <>
          <ScrollView className="min-h-full bg-white">
            <SearchBar
              placeholder="姓名"
              onChangeText={updateSearch}
              value={search}
              lightTheme
            />
            <View className="flex flex-row justify-between p-5 border-b ">
              <Text className="w-1/4 text-xl">姓名</Text>
              <Text className="w-1/4 text-xl">当前得分</Text>
              <Text className="w-1/4 text-xl">已批阅</Text>
              <Text className="w-1/4 text-xl">答卷时间</Text>
            </View>
            {searchList.map(item => (
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('考试', {
                    mode: item.done=="0" ? 'judge' : 'history',
                    fileName: item.fileName,
                    name: item.name
                  });
                }}
                key={item.time}
                underlayColor="#DDD">
                <View className="flex flex-row justify-between p-5 border-b">
                  <Text className="w-1/4 text-xl">{item.name}</Text>
                  <Text className="w-1/4 text-xl">{item.score}</Text>
                  <Text className="w-1/4 text-xl">{item.done === '1' ? "是": "否"}</Text>
                  <Text className="w-1/4 text-xl">{moment(item.time).locale('zh-cn').format('lll')}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Admin;
