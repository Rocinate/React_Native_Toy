import {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PermissionRequire from './src/PermissionRequire';
import Layout from './src/page/Layout';
import {StatusBar} from 'react-native';

const App = () => {
  const [ready, setReady] = useState(false);
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      {ready ? <Layout /> : <PermissionRequire setReady={setReady} />}
    </SafeAreaProvider>
  );
};

export default App;
