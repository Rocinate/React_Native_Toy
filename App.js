import {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PermissionRequire from './src/PermissionRequire';
import Layout from './src/page/Layout';

const App = () => {
  const [ready, setReady] = useState(false);
  return (
    <SafeAreaProvider>
      {ready ? <Layout /> : <PermissionRequire setReady={setReady} />}
    </SafeAreaProvider>
  );
};

export default App;
