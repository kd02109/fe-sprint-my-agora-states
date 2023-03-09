import { agoraStatesDiscussions } from "./data.js";

console.log(agoraStatesDiscussions);

//<i class="fa-solid fa-heart"></i>
//<i class="fa-solid fa-face-sad-tear"></i>

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // img 처리
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const img = document.createElement("img");
  img.alt = `avatar ${obj.author}`;
  img.src = obj.avatarUrl;
  img.classList.add("discussion__avatar--image");
  avatarWrapper.append(img);

  //토의 박스
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const h2 = document.createElement("h2");
  const a = document.createElement("a");
  h2.classList.add("discussion__title");
  a.textContent = obj.title;
  a.href = obj.url || "";
  a.target = "_blank";
  h2.append(a);

  //작성자 밑, 작성일
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(h2, discussionInfo);

  // 답변 완료 여부 확인하기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const icon = document.createElement("i");
  const answerLink = document.createElement("a");
  if (!!obj.answer) {
    icon.className = "fa-solid fa-heart fa-2xl";
    answerLink.href = obj.answer.url;
    answerLink.target = "_blank";
    answerLink.append(icon);
    discussionAnswered.append(answerLink);
  } else {
    icon.className = "fa-solid fa-face-sad-tear fa-2xl";
    discussionAnswered.append(icon);
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return element;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// heart 버튼 클릭시 답변으로 연결
const $heart = document.querySelectorAll(".fa-hear");

//modal 기능 만들기
const $btnQuestion = document.querySelector(".modalBtn");
const $btnSubmit = document.querySelector(".btn_submit");
const $btnClose = document.querySelector(".btn_close");
const $popupBackground = document.querySelector(".background");

let title = "";
let name = "";
const newData = {};

const close = () => {
  $popupBackground.classList.add("hide");
};
const open = () => {
  $popupBackground.classList.remove("hide");
};

$btnQuestion.addEventListener("click", open);
$btnClose.addEventListener("click", close);

//페이지네이션 구현
const $btnNextBox = document.querySelector(".button_box");
const $contents = document.querySelector(".discussions__container");

const numOfContent = agoraStatesDiscussions.length;
const showContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContent / showContent);
let page = 1;
