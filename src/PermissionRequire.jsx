import {useEffect, useState} from 'react';

const {Text} = require('@rneui/base');
const {View, PermissionsAndroid} = require('react-native');

import {isPathExist, initAssets, createTemplate} from './utils/fileSystem';

const Status = {
  getPermission: '权限请求中',
  initAssets: '资源初始化，请稍等',
  permissionFailed: '权限请求失败，请手动更改储存权限',
};

const PermissionRequire = props => {
  const {setReady} = props;

  const [progress, setProgress] = useState(Status.getPermission);

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

        // check basic folder
        if (!await isPathExist('')) {
          setProgress(Status.initAssets);
          await initAssets();
        }
        setReady(true);
      } else {
        setProgress(Status.permissionFailed);
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
        {progress == Status.getPermission
          ? '权限请求中'
          : progress == Status.permissionFailed
          ? '权限请求失败，请手动更改储存权限'
          : '资源初始化，请稍等'}
      </Text>
    </View>
  );
};

export default PermissionRequire;
