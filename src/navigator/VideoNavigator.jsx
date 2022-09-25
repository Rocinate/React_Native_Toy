import {createStackNavigator} from '@react-navigation/stack';

import VideoScreen from '../page/video/VideoScreen';
import FileList from '../page/components/FileList';
import FileViewer from '../page/video/FileViewer';

const Stack = createStackNavigator();

const VideoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          borderBottomColor: '#DDD',
          borderBottomWidth: 1,
        },
      }}>
      <Stack.Screen name="学习视频" component={VideoScreen} />
      <Stack.Screen name="视频列表" component={FileList} />
      <Stack.Screen name="视频预览" component={FileViewer} />
    </Stack.Navigator>
  );
};

export default VideoNavigator;
