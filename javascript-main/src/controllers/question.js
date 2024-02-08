import data from "../data/model.js";
import Application from "../models/application.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild, displayError, clearAllErrors } from "../util/domops.js";
import { loadAnswersPage } from "./answer.js";

const app = new Application(data);
console.log(app)
const loadNewQuestionPage = () => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);
//  let main = document.getElementById("right_main");

  // Clear the existing content
  //main.innerHTML = "";

  // Create the form for new question
  let form = createEle({
    type: "form",
    id: "newQuestionForm",
    classes: ["question_form"],
  });

  // Question title
  let titleLabel = createEle({
    type: "label",
    innerHTML: "Question Title*",
    classes: ["form_question_title_label"],
  });
  let titleHint = createEle({
    type: "div",
    innerHTML: "Limit title to 100 characters or less",
    classes: ["form_question_title_hint"],
  });
  let titleInput = createEle({
    type: "input",
    id: "formTitleInput",
    classes: ["form_question_title_input"],
    attributes: { type: "text" },
  });

  // Question text
  let textLabel = createEle({
    type: "label",
    innerHTML: "Question Text*",
    classes: ["form_text_label"],
  });
  let textHint = createEle({
    type: "div",
    innerHTML: "Add details",
    classes: ["form_question_tags_hint"],
  });
  let textInput = createEle({
    type: "textarea",
    id: "formTextInput",
    //attributes: { placeholder: "Add details" },
    classes: ["form_text_input"],
  });

  // Tags
  let tagsLabel = createEle({
    type: "label",
    innerHTML: "Tags*",
    classes: ["form_question_tags_label"],
  });
  let tagsHint = createEle({
    type: "div",
    innerHTML: "Add keywords separated by whitespace",
    classes: ["form_question_tags_hint"],
  });
  let tagsInput = createEle({
    type: "input",
    id: "formTagInput",
    //attributes: { placeholder: "Add keywords separated by whitespace" },
    classes: ["form_question_tags_input"],
  });

  // Username
  let usernameLabel = createEle({
    type: "label",
    innerHTML: "Username*",
    classes: ["form_username_lable"],
  });
  let usernameInput = createEle({
    type: "input",
    id: "formUsernameInput",
    classes: ["form_username_input"],
    //attributes: { placeholder: "Enter username" },
  });

  // Create a container for postBtn and mandatoryIndicator
  let btnIndicatorContainer = createEle({
    type: "div",
    classes: ["btn_indicator_container"],
  });

  // Post question button
  let postBtn = createEle({
    type: "button",
    innerHTML: "Post Question",
    classes: ["form_postBtn"],
    event: {
      click: (e) => {
        e.preventDefault();
        let isValid = true;

        clearAllErrors();

        if (!titleInput.value) {
          displayError(titleInput, "Title cannot be empty");
          isValid = false;
        } else if (titleInput.value.length > 100) {
          displayError(titleInput, "Title cannot be more than 100 characters");
          isValid = false;
        }


        if (!textInput.value) {
          displayError(textInput, "Question text cannot be empty");
          isValid = false;
        }


        let tags = tagsInput.value
          .split(" ")
          .filter((tag) => tag.trim() !== ""); // Filter out empty tags
        if (tags.length < 1) {
          displayError(tagsInput, "Should have at least 1 tag");
          isValid = false;

        }
        if (tags.length > 5) {
          displayError(tagsInput, "Cannot have more than 5 tags");
          isValid = false;

        }

        for (let tag of tags) {
          if (tag.length > 20) {
            displayError(tagsInput, "New tag length cannot be more than 20");
            isValid = false;
            break; // Exit early since we've already found an invalid tag
          }
        }


        if (!usernameInput.value) {
          displayError(usernameInput, "Username cannot be empty");
          isValid = false;
        }

        if (isValid) {
          // 1. Construct new question object

          let question = {
            title: titleInput.value,
            text: textInput.value,
            tags: tags,
            askedBy: usernameInput.value,
          };


            // %%%%%%%%%%%%%%%%%%%%%%%%%
          app.addQuestion(question);

          loadQuestionPage();
        }
      },
    },
  });

  // Mandatory fields indicator
  let mandatoryIndicator = createEle({
    type: "div",
    innerHTML: "* indicates mandatory fields",
    classes: ["mandatory_indicator"],
  });

  // Append postBtn and mandatoryIndicator to the container
  appendEleChild(btnIndicatorContainer, [postBtn, mandatoryIndicator]);

  appendEleChild(form, [
    titleLabel,
    titleHint,
    titleInput,
    textLabel,
    textHint,
    textInput,
    tagsLabel,
    tagsHint,
    tagsInput,
    usernameLabel,
    usernameInput,
    btnIndicatorContainer,
  ]);
  appendEleChild(main, [form]);

  setMenuButton();
};

//*******************************
const loadQuestionPage = (
  title_text = "All Questions",
  order = "newest",
  search = ""
) => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  let header = createEle({ type: "div" });

  let first = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let title = createEle({
    type: "div",
    innerHTML: title_text,
    classes: ["bold_title"],
  });

  appendEleChild(first, [title, askQuestionBtn()]);

  let second = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let qcnt = createEle({ type: "div", id: "question_count" });

  let btns = createEle({ type: "div", classes: ["btns"] });
  let newbtn = createEle({
    type: "button",
    innerHTML: "Newest",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("newest", search));
      },
    },
  });

  let actbtn = createEle({
    type: "button",
    innerHTML: "Active",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("active", search));
      },
    },
  });

  let unansbtn = createEle({
    type: "button",
    innerHTML: "Unanswered",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("unanswered", search));
      },
    },
  });

  appendEleChild(btns, [newbtn, actbtn, unansbtn]);
  appendEleChild(second, [qcnt, btns]);
  appendEleChild(header, [first, second]);

  appendEleChild(main, [header]);
  appendEleChild(main, [getQuestions(order, search)]);


  setMenuButton("question");
};
/*
returns a list of all questions based on an order and a search query if any
*/

const getQuestions = (order = "newest", search = "") => {


let right= createEle({type:"table", class:["right_main"]})
  let Qrecord= createEle({type:"div"});
  let getQ= createEle({innerHTML:app.questions.length+" questions"});
  appendEleChild(Qrecord,[getQ]);
  appendEleChild(right,[Qrecord]);

app.questions.forEach((aque)=>{


let arow= createEle({type:"tr",classes:["question"]});


let first_box= createEle({type:"td"})
let first_row1= createEle({type:"tr"})
let first_row2= createEle({type:"tr"})

let view= createEle({classes:["postStats", "left_q"], innerHTML: aque.getQuestionViews()+ "views"});
let ans_count= createEle({classes: ["postStats", "left_q"], innerHTML: aque.getAnswerCount()+ "answer"});
appendEleChild(first_row1,[view]);
appendEleChild(first_row2,[ans_count]);
appendEleChild(first_box,[first_row1]);
appendEleChild(first_box,[first_row2]);

let second_box= createEle({type:"td", class:["question_mid"]})
let second_row1= createEle({type:"tr", class:["tree"]})
let second_row2= createEle({type:"tr", class:["tree"]})
let title=createEle({classes:["postTitle", "question_mid"], innerHTML: aque.title})

let tags;
app.getTagNameFilter(aque.tagIds).forEach((ele)=>{
tags=createEle({classes:["postTitle", "question_tags","question_mid", "tags_mid","question_tag_button"], innerHTML: ele})
appendEleChild(second_row2,[tags])

});

appendEleChild(second_row1,[title]);

appendEleChild(second_box,[second_row1]);
appendEleChild(second_box,[second_row2]);

let third_box= createEle({type:"td", class:["right_main"]})
let author= createEle({classes:["lastActivity","question_author"], innerHTML: aque.askedBy})
let date= createEle({classes:["lastActivity","question_meta"], innerHTML: aque.calculateTimeElapsed()})
appendEleChild(third_box, [author]);
//appendEleChild(third_box, [date]);


appendEleChild(arow,[first_box]);
appendEleChild(arow,[second_box]);
appendEleChild(arow,[third_box]);
appendEleChild(arow,[date]);
appendEleChild(right,[arow]);
})

return right;}


export { loadQuestionPage, loadNewQuestionPage }

