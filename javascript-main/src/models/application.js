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
    let newAnswer= new Answer({
    aid: aid,
    text: answer.text,
    ansBy: answer.ansBy,
    ansDate: new Date()
    })
     let question = this.questions.find(question => question.qid === qid);

      if (question) {
        question.addAnswer(aid);
        this.answers.push(newAnswer);
      } else {

        throw new Error(`Question with ID ${qid} not found.`);
      }

      // Return the generated aid
      return aid;
  };

  /*
  generate an id for the new question and add
  it to the model; return the generated qid 
  */
  addQuestion = (question) => {
    let qid = "q" + new Date();
    let newQuestion = new Question ({
    qid:qid,
    title: question.title,
    text: question.text,
    tagIds: question.tagIds,
    askedBy:question.askedBy,
    askDate: new Date(),
    ansIds: [],
    views:0
    });
        this.questions.push(newQuestion);

        return qid;
      };
//     question.qid=qid;
//     question.tagIds=[];
//     question.tags.forEach((t) => {
//     question.tagIds.push(this.addTag(t));
//     });
//     console.log(question);
//     this.questions.push(new Question(question));
//     return qid;}


  /*
  adds a new tag if it does not exist
  returns the tag id of the new tag or the existing tag
  */
addTag = (tagname) => {
  // Check if the tag already exists
  let existingTag = this.tags.find(tag => tag.name === tagname);

  if (existingTag) {
    // If it exists, return the existing tag's id
    return existingTag.id;
  } else {
    // If it doesn't exist, generate a new tag ID
    let newTagId = "t" + (this.tags.length + 1);

    // Create a new Tag object
    let newTag = new Tag({
      id: newTagId,
      name: tagname
    });

    // Add the new Tag object to the tags array
    this.tags.push(newTag);

    // Return the new tag's id
    return newTagId;
  }
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

  getTagNameFilter(q){
    let arr=[];
    for (let i=0; i<q.length; i++){
    for (let j=0; j<this.tags.length; j++){
    if (q[i]==this.tags[j].tid){
    arr.push(this.tags[j].name);}  }
}
return arr;
    }
}
