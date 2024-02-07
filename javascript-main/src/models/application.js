import Question from "./question.js";
import Tag from "./tag.js";
import Answer from "./answer.js";

let instance;

export default class Application {
  constructor({ questions, tags, answers }) {
    if(!instance) {
        this.questions = [];
        this.tags = [];
        this.answers = [];

        questions.forEach((q) => {
          this.questions.push(new Question(q));
        });

        tags.forEach((t) => {
          this.tags.push(new Tag(t));
        });

        answers.forEach((a) => {
          this.answers.push(new Answer(a));
        });
        instance = this;
    }
    return instance;
  }

  // add an answer to a question qid
  addAnswer = (qid, answer) => {
    let aid = "a" + (this.answers.length + 1);
    return aid;
  };

  /*
  generate an id for the new question and add
  it to the model; return the generated qid 
  */
  addQuestion = (question) => {
    let qid = "q" + new Date();
    return qid;
  };

  /*
  adds a new tag if it does not exist
  returns the tag id of the new tag or the existing tag
  */
  addTag = (tagname) => {
    return 0;
  };

  /*
  returns the number of questions with a tag id
  */
  getQuestionCountByTag = (tid) => {
    let cnt = 0;
    return cnt;
  };

  /*
  returns all questions collection
  based on the order and the search query
  */
  getQuestionsByFilter = (order = "newest", search = "") => {
    let qlist = [];
    return qlist;
  };

  /*
  returns the question for a question id
  */
  getQuestionById = (qid) => {
    return qid
  };

  /*
  returns a collection of answers for a question
  sorted by newest order
  */
  getQuestionAnswer = (question) => {
    return this.answers;
  };

  getTagCount = () => {
    return this.tags.length;
  };

  getTags = () => {
    return this.tags;
  };
}
