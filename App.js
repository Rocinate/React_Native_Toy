import {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PermissionRequire from './src/PermissionRequire'
import Layout from './src/page/Layout'

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <SafeAreaProvider>
        {loading ? <PermissionRequire loading={setLoading} /> : <Layout />}
    </SafeAreaProvider>
  );
};

export default App;