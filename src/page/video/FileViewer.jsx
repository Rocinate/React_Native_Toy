import {TouchableHighlight} from 'react-native';
import Video from 'react-native-video';

const FileViewer = ({navigation, route}) => {
  const path = route.params.path;
  const [paused, setPaused] = useState(false);
  const source = {uri: path};
  return (
    <TouchableHighlight
      onPress={() => setPaused(!paused)}
      underlayColor="#DDD"
      className="w-full v-full">
      <Video
        source={source}
        paused={paused}
        resizeMode="contain"
        className="w-full v-full"
      />
    </TouchableHighlight>
  );

};

export default FileViewer;
