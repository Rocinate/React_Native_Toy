import XLSX from 'xlsx';
import {FOLDER_PATH, BASE} from '../config/config';
import RNFS from 'react-native-fs';
import {isPathExist, getFullPath} from './fileSystem'

export const getQuestion = async (type) => {
  let workbook = await readExcel(`${FOLDER_PATH.QUESTION}/${type}.xlsx`);
  // 储存解析结果
  let questions = {
    choices: [],
    multiChoices: [],
    complete: [],
    judgement: [],
    subjective: [],
  };
  // 选择题
  let worksheet = workbook.Sheets['单选题'];
  let jsonForm = XLSX.utils.sheet_to_json(worksheet);
  jsonForm.forEach(item => {
    questions.choices.push({
      title: item['题目'],
      right: item['答案'],
      options: [
        {key: 'A', value: item.A},
        {key: 'B', value: item.B},
        {key: 'C', value: item.C},
        {key: 'D', value: item.D},
      ],
    });
  });
  // 多选题
  worksheet = workbook.Sheets['多选题'];
  jsonForm = XLSX.utils.sheet_to_json(worksheet);
  jsonForm.forEach(item => {
    questions.multiChoices.push({
      title: item['题目'],
      right: item['答案'],
      options: [
        {key: 'A', value: item.A},
        {key: 'B', value: item.B},
        {key: 'C', value: item.C},
        {key: 'D', value: item.D},
      ],
    });
  });
  // 简答题
  worksheet = workbook.Sheets['简答题'];
  jsonForm = XLSX.utils.sheet_to_json(worksheet);
  jsonForm.forEach(item => {
    questions.subjective.push({
      title: item['题目'],
    });
  });
  // 判断
  worksheet = workbook.Sheets['判断题'];
  jsonForm = XLSX.utils.sheet_to_json(worksheet);
  jsonForm.forEach(item => {
    questions.judgement.push({
      title: item['题目'],
      right: item['答案'],
    });
  });
  // 填空
  worksheet = workbook.Sheets['填空题'];
  jsonForm = XLSX.utils.sheet_to_json(worksheet);
  jsonForm.forEach(item => {
    questions.complete.push({
      title: item['题目'],
      right: [item['答案1'], item['答案2']],
    });
  });
  return questions;
};

export const loadPaperDetail = async (
  name,
  successCb = undefined,
  failCb = undefined,
) => {
  const fullPath = `${RNFS.DocumentDirectoryPath}${BASE}${FOLDER_PATH.PAPER}/${name}`;
  const isExist = await isPathExist(fullPath);

  if (!isExist) {
    return false;
  }

  return await RNFS.readFile(filePath)
    .then(result => {
      const res = JSON.parse(result);
      successCb && successCb(result);
      return res;
    })
    .catch(err => {
      failCb && failCb(err);
      console.log(err.message);
    });
};

// 删除试卷
export const deletePaper = async name => {
  const fullPath = `${RNFS.ExternalStorageDirectoryPath}${BASE}${FOLDER_PATH.PAPER}/${name}`;
  const isExist = await this.isFileExist(fullPath);

  if (!isExist) {
    return false;
  }

  const res = await RNFS.unlink(fullPath)
    .then(() => {
      console.log('delete success');
    })
    .catch(err => {
      console.log(err.message);
    });
  return res;
};

export const getSubject = async () => {
  const fullPath = `${RNFS.ExternalStorageDirectoryPath}${BASE}${FOLDER_PATH.QUESTION}`
  const list = await RNFS.readdir(fullPath)

  let result = []

  if (list && list.length > 0) {
    result = list.map(item => item.split('.')[0])
  }

  return result
}

export const writePaper = async (data, name) => {
    const jsonStr = JSON.stringify(data);
    let filePath = '';
    if (data.fileName != '') {
      deletePaper(data.fileName);
      let score = data.score.reduce(function (acr, cur) {
        return acr + cur;
      });
      let part = data.fileName.split('-');
      part[2] = 1;
      part[3] = score;
      data.fileName = part.join('-');
      filePath = `${getFullPath(FOLDER_PATH.PAPER)}/${data.fileName}`;
    } else {
      let score = data.score.reduce(function (acr, cur) {
        return acr + cur;
      });
      filePath = `${getFullPath(FOLDER_PATH.PAPER)}/${name}-${new Date().getTime()}-${0}-${score}.json`;
    }
    // 文件写入
    return await RNFS.writeFile(filePath, jsonStr, 'utf8');
  };

  export const readExcel = async path => {
    const fullPath = getFullPath(path)
    const bstr = await RNFS.readFile(fullPath, 'ascii');
    const workBook = XLSX.read(bstr, {type: 'binary'});
    return workBook;
  };