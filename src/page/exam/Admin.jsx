import {useEffect, useState} from 'react';
import {Text, View, TouchableHighlight, ScrollView} from 'react-native';
import LoadingPage from '../components/LoadingPage';

import {Button, SearchBar} from '@rneui/themed';
import {getPathList} from '../../utils/fileSystem';
import {PATH_TYPE, FOLDER_PATH} from '../../config/config';

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
  const [search, setSearch] = useState("");


  const updateSearch = (search) => {
    setSearch(search);
  }

  useEffect(() => {
    getPathList(FOLDER_PATH.PAPER, PATH_TYPE.FILE).then(res => {
      // setPaperList(res);
      setPaperList(res);
      setSearchList([1, 2]);
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
          <SearchBar
            placeholder="姓名"
            onChangeText={updateSearch}
            value={search}
            lightTheme
          />
        </>
      )}
    </>
    // <View style={styles.container}>
    //   <Search />
    //   <ScrollView>
    //     <View style={styles.listItem}>
    //       <Text style={styles.listDetail}>姓名</Text>
    //       <Text style={styles.listDetail}>当前得分</Text>
    //       <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
    //         <Text>审阅状态</Text>
    //         {/* <ToggleButton
    //           icon="filter"
    //           onPress={() => {
    //             setFilter(!filter);
    //             search(keyword);
    //           }}
    //         /> */}
    //       </View>
    //       <Text style={styles.listDetail}>答卷时间</Text>
    //       <Text style={styles.listDetail}>操作</Text>
    //     </View>
    //     {showPaper.length > 0 ? (
    //       showPaper.map((item, index) => (
    //         <TouchableHighlight
    //           onPress={() => {
    //             getPaperDetail(item.fileName), navigation.navigate('Paper');
    //           }}
    //           onLongPress={() => {
    //             deletePaper(item.fileName).then(loadPaperList());
    //           }}
    //           underlayColor="#DDD"
    //           key={index}>
    //           <View style={styles.listItem}>
    //             <Text style={styles.listDetail}>{item.userName}</Text>
    //             <Text style={styles.listDetail}>{item.score}</Text>
    //             <Text style={styles.listDetail}>{item.status}</Text>
    //             <Text style={styles.listDetail}>{item.time}</Text>
    //             <Button style={styles.listDetail}>导出</Button>
    //           </View>
    //         </TouchableHighlight>
    //       ))
    //     ) : (
    //       <Text style={styles.loading}>无试卷记录</Text>
    //     )}
    //   </ScrollView>
    // </View>
  );
};

export default Admin;
