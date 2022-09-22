import {ActivityIndicator, View} from 'react-native'

const LoadingPage = () => {
  return (
    <View className="flex-1 h-full justify-center items-center">
      <ActivityIndicator size="large"/>
    </View>
  );
};

export default LoadingPage;