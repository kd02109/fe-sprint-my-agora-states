import { agoraStatesDiscussions } from "./data.js";
import PageNation from "./pagenation.js";

// 이름,제목 유효성 체크
const checkName = (name) => {
  let nameTrim = name.trim();
  return /^[A-Za-z가-힣][A-Za-z0-9가-힣]{3,}$/.test(nameTrim);
};
const checkTitle = (title) => {
  let titleTrim = title.trim();
  return titleTrim.length > 5;
};
//<i class="fa-solid fa-angle-right"></i>

const rederOneItem = (data) => {
  ul.prepend(convertToDiscussion(data));
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

PageNation(agoraStatesDiscussions, ul);

//modal 기능 만들기 및 새로운 데이터 전송
const $btnQuestion = document.querySelector(".modalBtn");
const $btnClose = document.querySelector(".fa-x");
const $popupBackground = document.querySelector(".background");

const AVATAR_URL = "https://avatars.githubusercontent.com/u/87750478?s=64&v=4";

const open = () => {
  $popupBackground.classList.remove("hide");
  // 모달 기능 내에서 새로운 아이디 및, password 만들기
  const $form = document.querySelector(".submit_question");
  const $title = $form.querySelector(".title");
  const $name = $form.querySelector(".name");
  const $textarea = $form.querySelector("textarea");

  $title.addEventListener("keyup", (event) => writeValue($title));
  $name.addEventListener("keyup", (event) => writeValue($name));
  $textarea.addEventListener("keyup", (event) => writeValue($textarea));

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log($name.value, $title.value);
    if (checkName($name.value) && checkTitle($title.value)) {
      console.log("go");
      const newData = {};
      newData.id = Date.now();
      newData.createdAt = new Date();
      newData.title = $title.value;
      newData.author = $name.value;
      newData.textarea = $textarea.value;
      newData.avatarUrl = AVATAR_URL;
      agoraStatesDiscussions.unshift(newData);
      $title.value = "";
      $name.value = "";
      $textarea.value = "";
      rederOneItem(newData);
      agoraStatesDiscussions.unshift(newData);
      close();
    } else {
      console.log("else");
      alert(
        "이름은 4글자 이상(한글, 영어, 숫자만 입력), 제목은 6글자 이상이어야 합니다."
      );
    }
  });
};

//value 입력 클로져 함수 활용
const writeValue = (tag) => {
  tag.value = event.target.value;
};

const close = () => {
  $popupBackground.classList.add("hide");
};

$btnQuestion.addEventListener("click", open);
$btnClose.addEventListener("click", close);

// 아고라 스테이츠 검색 기능 구현
const $search = document.querySelector("#search");
const $searchForm = document.querySelector(".search__box");

$search.addEventListener("keyup", (event) => writeValue($search));
$searchForm.addEventListener("submit", (event) => {
  const trim = $search.value.trim();
  const search = trim.toUpperCase();
  if (trim === "") alert("검색어를 입력해주세요");
  event.preventDefault();
  const searchArr = agoraStatesDiscussions.filter(
    (item) =>
      item.title.toUpperCase().includes(search) ||
      item.author.toUpperCase().includes(search)
  );
  console.log(searchArr);
});
