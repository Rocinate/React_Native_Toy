import {View, Text, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';

const FileViewer = ({navigation, route}) => {
  const path = route.params.path;
  const source = {uri: path, cache: true};

  return (
    <View className="w-full v-full">
      <Pdf source={source} className="w-full v-full" />
    </View>
  );
};

export default FileViewer;
