import RNFS from 'react-native-fs';
import {FOLDER_PATH, BASE, PATH_TYPE} from '../config/config';

// helper function to get list of files or folders
export const getPathList = async (path, type) => {
  const fullPath = getFullPath(path);
  const list = await RNFS.readDir(fullPath);

  let result = [];

  if (list && list.length > 0) {
    let files = [];
    if (type == PATH_TYPE.FILE) {
      files = list.filter(item => item.isFile());
    } else {
      files = list.filter(item => item.isDirectory());
    }
    result = files.map(item => {
      return {
        name: item.name,
        path: item.path,
      };
    });
  }
  return result;
};

export const isPathExist = async (path, cb = undefined) => {
  const fullPath = getFullPath(path);
  return await RNFS.exists(fullPath).then(res => {
    cb && cb(res);
    return res;
  });
};

export const getRootFiles = async () => {
  const fullPath = getFullPath(RNFS.ExternalStorageDirectoryPath);
  return await RNFS.readDir(fullPath).then(res => {
    console.log(res);
  });
};

export const initAssets = async () => {
  try {
    await makeFolder('');
    // create folder
    for (var name in FOLDER_PATH) {
      await makeFolder(FOLDER_PATH[name]);
    }

    // copy basic assets
    await createTemplate();
  } catch (err) {
    console.log(err);
  }
};

export const createTemplate = async () => {
  await RNFS.copyFileAssets(
    '模板.xlsx',
    `${RNFS.ExternalStorageDirectoryPath}${BASE}${FOLDER_PATH.QUESTION}/模板.xlsx`,
  ).then(res => {
    console.log('copy success');
  });
};

export const makeFolder = async path => {
  const fullPath = getFullPath(path);
  return await RNFS.mkdir(fullPath);
};

const getFullPath = path => {
  let fullPath = '';
  if (path.indexOf(RNFS.ExternalStorageDirectoryPath) !== -1) {
    fullPath = path;
  } else {
    fullPath = `${RNFS.ExternalStorageDirectoryPath}${BASE}${path}`;
  }
  return fullPath;
};
