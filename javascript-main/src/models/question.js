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
  if(!this.ansIds){
  return 0}

  return this.ansIds.length;

//    return this.ansIds? this.ansIds.length:0;
  }

  /*
  add a new answer with id aid to the question
  */
  addAnswer(aid) {
  if(!Array.isArray(this.ansIds)){
  this.ansIds=[];
  }
  this.ansIds.push(aid);
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
    return this.#views;
  }

  /*
  increments question view count by 1
  */
  addViewCount() {
    this.#views += 1;
  }


}
