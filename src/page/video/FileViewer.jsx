import {TouchableHighlight} from 'react-native';
import Video from 'react-native-video';
import {useState} from 'react'

const FileViewer = ({navigation, route}) => {
  const path = route.params.path;
  const [paused, setPaused] = useState(false);
  const source = {uri: path};
  return (
    <TouchableHighlight
      onPress={() => setPaused(!paused)}
      underlayColor="#DDD"
      className="w-full h-full">
      <Video
        source={source}
        paused={paused}
        resizeMode="contain"
        className="w-full h-full"
      />
    </TouchableHighlight>
  );

};

export default FileViewer;
