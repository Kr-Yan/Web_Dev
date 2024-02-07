import { getMetaData } from "../util/tool.js";

export default class Question {
  #views;
  constructor({ qid, title, text, tagIds, askedBy, askDate, ansIds, views }) {
    this.qid = qid;
    this.title = title;
    this.text = text;
    this.tagIds = tagIds;
    this.askedBy = askedBy;
    this.askDate = askDate;
    this.ansIds = ansIds;
    this.#views = views;
  }


  /*
    returns the number of answers for a question
  */
  getAnswerCount() {
    return 0;
  }

  /*
  add a new answer with id aid to the question
  */
  addAnswer(aid) {
    return aid;
  }

  /*
  return the time elapsed since question was asked.
  The time returned must be in the format expected to be displayed
  */
  calculateTimeElapsed() {
    return getMetaData(this.askDate);
  }

  /*
  returns the number of views for a question
  */
  getQuestionViews() {
    return 0;
  }

  /*
  increments question view count by 1
  */
  addViewCount() {
    this.#views = 1;
  }
}
