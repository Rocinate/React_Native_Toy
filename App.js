import {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import PermissionRequire from './src/PermissionRequire'
import Layout from './src/page/Layout'

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {loading ? <PermissionRequire ready={setLoading} /> : <Layout />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;