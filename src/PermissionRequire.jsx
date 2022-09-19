import {useEffect, useState} from 'react';

const {Text} = require('@rneui/base');
const {View, PermissionsAndroid} = require('react-native');

import {makeAllFolder} from './utils/folderManage';

const PermissionRequire = props => {
  const {loading} = props;

  const [permission, setPermission] = useState(true);

  const requestPermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];

      const result = await PermissionsAndroid.requestMultiple(permissions);

      const allPermissionGranted = Object.values(result).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allPermissionGranted) {
        console.log('permission granted');
        // 创建资源文件夹
        await makeAllFolder();
        loading(false);
      } else {
        setPermission(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 请求权限并创建初始文件夹
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View className="flex justify-center items-center h-full">
      <Text>
        {permission ? '权限请求中' : '权限请求失败，请手动更改储存权限'}
      </Text>
    </View>
  );
};

export default PermissionRequire;
