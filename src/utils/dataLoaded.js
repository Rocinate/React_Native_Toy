import RNFS from 'react-native-fs';
import {FOLDER_PATH, BASE, PATH_TYPE} from '../config/config';
import XLSX from 'xlsx'

export const getPathList = async (path, type) => {
    const fullPath = `${RNFS.DocumentDirectoryPath}${BASE}${path}`;
    const list = await RNFS.readDir(fullPath)

    let result = []
    if (list && list.length > 0) {
        let files = list.filter(item => {
            if (type == PATH_TYPE.FILE) {
                return item.isFile()
            } else {
                return !item.isFile()
            }
        })
        fileList = files.map(item => {
            return {
                name: item.name,
                path: item.path
            }
        })
    }
    return result;
}