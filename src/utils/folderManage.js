import RNFS from 'react-native-fs';
import {FOLDER_PATH, BASE} from '../config/config';

export const makeAllFolder = async () => {
  try {
    for (var name in FOLDER_PATH) {
      await makeFolder(FOLDER_PATH[name]);
    }
  } catch (err) {
    console.log(err);
  }
};

export const makeFolder = async path => {
  const fullPath = `${RNFS.DocumentDirectoryPath}${BASE}${path}`;
  return await RNFS.mkdir(fullPath)
};
