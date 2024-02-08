import data from "../data/model.js";
import Application from "../models/application.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild } from "../util/domops.js";
import { loadQuestionPage } from "./question.js";

const app = new Application(data);
console.log(app);

const loadTagPage = () => {
    let main = createEle({
      type: "div",
      id: "right_main",
      classes: ["right_main"],
    });
    document.getElementById("right_main").replaceWith(main);
  
    let header = createEle({
      type: "div",
      classes: ["space_between", "right_padding"],
    });
  
    let tagcnt = createEle({
      type: "div",
      innerHTML: app.getTagCount() + " Tags",
      classes: ["bold_title"],
    });
  
    let title = createEle({
      type: "div",
      innerHTML: "All Tags",
      classes: ["bold_title"],
    });
  
    appendEleChild(header, [tagcnt, title, askQuestionBtn()]);
  
    let tagList = createEle({
      type: "div",
      classes: ["tag_list", "right_padding"],
    });
  
    let tarray = app.getTags().map((t) => {
      let tag = createEle({
        type: "div",
        classes: ["tagNode"],
        event: {
          click: () => {
            // load the question page for the tag
          },
        },
      });
      let tagname = createEle({
        type: "div",
        classes: ["tagName"],
        innerHTML: t.name,
      });
      let tagQcnt = createEle({
        type: "div",
        innerHTML: "0 questions",
      });
  
      appendEleChild(tag, [tagname, tagQcnt]);
      return tag;
    });
  
    appendEleChild(tagList, tarray);
    appendEleChild(main, [header, tagList]);
  };

  export { loadTagPage };