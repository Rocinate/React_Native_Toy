import {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PermissionRequire from './src/PermissionRequire';
import Layout from './src/page/Layout';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  const [ready, setReady] = useState(false);
  // let timerId = null
  // const [done, setDone] = useState(false);

  useEffect(() => {
    SplashScreen.show()
    setTimeout(() => {
      SplashScreen.hide()
    }, 3000)
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      {ready ? <Layout /> : <PermissionRequire setReady={setReady} />}
    </SafeAreaProvider>
  );
};

export default App;
