import {getQuestion} from '../utils/examData';
import {questionType, scoreList} from '../config/config';

// 试卷生成
class Paper {
  constructor(questions = [], score = [], fileName = '') {
    if (questions.length == 0) {
      this.questions = [];
      this.score = new Array(44).fill(0);
      this.fileName = '';
    } else {
      this.questions = questions;
      this.score = score;
      this.fileName = fileName;
    }
  }

  preJudge() {
    for (let index = 0; index < this.questions.length; index++) {
      const item = this.questions[index];
      if (item.type == questionType.SUBJECTIVE) {
        continue;
      }

      if (
        item.type !== questionType.COMPLETE &&
        item.user === item.right
      ) {
        this.score[index] = scoreList[item.type];
      } else if (item.type == questionType.COMPLETE) {
        for (let i = 0; i < 2; i++) {
          if (item.right[i] == item.user[i]) {
            this.score[index] += scoreList[item.type];
          }
        }
      }
    }
  }

  finalJudge(index, score) {
    this.score[index] = score;
  }

  answer(index, user) {
    this.questions[index].user = user;
  }

  // 检查问卷是否完成
  check() {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].type != questionType.COMPLETE) {
        if (this.questions[i].user == '') {
          return [false, i];
        }
      } else {
        if (this.questions[i].user.some(item => item == '')) {
          return [false, i];
        }
      }
    }
    return [true, -1];
  }

  async randomInit(type) {
    // 调用getQuestion, 扫描题库，分种类
    let questionBank = await getQuestion(type);
    let selectedIndex = [];
    let questions = [];

    // 单选题
    selectedIndex = this.getRandomIndex(10, questionBank.choices.length);
    selectedIndex.forEach(index => {
      questions.push({
        options: questionBank.choices[index].options,
        right: questionBank.choices[index].right,
        title: questionBank.choices[index].title,
        type: questionType.CHOICES,
        user: '',
      });
    });
    // 多选题
    selectedIndex = this.getRandomIndex(5, questionBank.multiChoices.length);
    selectedIndex.forEach(index => {
      questions.push({
        options: questionBank.multiChoices[index].options,
        right: questionBank.multiChoices[index].right,
        title: questionBank.multiChoices[index].title,
        type: questionType.MULTICHOICES,
        user: '',
      });
    });
    // 填空题
    selectedIndex = this.getRandomIndex(10, questionBank.complete.length);
    selectedIndex.forEach(index => {
      questions.push({
        right: questionBank.complete[index].right,
        title: questionBank.complete[index].title,
        type: questionType.COMPLETE,
        user: ['', ''],
      });
    });
    // 判断题
    selectedIndex = this.getRandomIndex(10, questionBank.judgement.length);
    selectedIndex.forEach(index => {
      questions.push({
        options: ['是', '否'],
        right: questionBank.judgement[index].right,
        title: questionBank.judgement[index].title,
        type: questionType.JUDGEMENT,
        user: '',
      });
    });
    // 简答
    selectedIndex = this.getRandomIndex(4, questionBank.subjective.length);
    selectedIndex.forEach(index => {
      questions.push({
        title: questionBank.subjective[index].title,
        type: questionType.SUBJECTIVE,
        user: '',
      });
    });
    this.questions = questions;
    return true;
  }

  getRandomIndex(num, range) {
    let indexList = [];
    while (num) {
      let index = Math.floor(Math.random() * range);
      if (indexList.indexOf(index) == -1) {
        indexList.push(index);
        num--;
      }
    }
    return indexList;
  }
}

module.exports = {
  Paper,
};
