import {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import {Button, Search} from '@rneui/themed';
import {getPathList} from '../../utils/fileSystem'
import { PATH_TYPE, FOLDER_PATH } from '../../config/config';

const Admin = ({navigation}) => {
  const [paperList, setPaperList] = useState([])

  useEffect(() => {
    getPathList(FOLDER_PATH.PAPER, PATH_TYPE.FILE).then(res => {
      setPaperList(res)
    })
  }, []);
  return (
    <View></View>
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

export default Admin