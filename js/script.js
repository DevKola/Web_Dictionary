"use strict";

const toggleCont = document.getElementById("toggle-cont");
const toggleBtn = document.getElementById("toggle-btn");
const body = document.getElementById("body");
const headerMoon = document.getElementById("header-moon");
const html = document.getElementById("html");
const serif = document.getElementById("sans-serif");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");

// Select
const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");
const arrow = document.getElementById("arrow");

const selectedValue = document.querySelector(".selected-value");
const dropdown = document.getElementById("select-dropdown");
const optionsList = document.querySelectorAll(".select-dropdown li");

// Dark Theme
function darkTheme() {
  toggleBtn.classList.toggle("header__btn-toggle-right");
  body.classList.toggle("body__dark-theme");
  toggleCont.classList.toggle("header__btn-themes-dark");
  headerMoon.classList.toggle("header__themes-img-dark");
  arrow.classList.toggle("arrow__dark");
  selectedValue.classList.toggle("selected-value-dark");
  dropdown.classList.toggle("select-dropdown-dark");
  searchBox.classList.toggle("search__box-dark");

  optionsList.forEach((option) => {
    option.classList.toggle("option-dark");
  });
}

toggleCont.addEventListener("click", darkTheme);

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    body.style.fontFamily = `${selectedValue.textContent}`;
  });
});

// Select
// add click event to select button
selectBtn.addEventListener("click", () => {
  // add/remove active class on the container element
  customSelect.classList.toggle("active");
  // update the aria-expanded attribute based on the current state
  selectBtn.setAttribute(
    "aria-expanded",
    selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});

optionsList.forEach((option) => {
  function handler(e) {
    // Click Events
    if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
      selectedValue.textContent = this.children[1].textContent;
      customSelect.classList.remove("active");
    }
    // Key Events
    if (e.key === "Enter") {
      selectedValue.textContent = this.textContent;
      customSelect.classList.remove("active");
    }
  }

  option.addEventListener("keyup", handler);
  option.addEventListener("click", handler);
});


// Implement Search
let wordData = [];
let meanings = [];
let phonetics = [];

async function getWord(input) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
  );
  const datas = await res.json();
  wordData = datas.map((data) => {
    return {
      meanings: data.meanings,
      phonetic: data.phonetic,
      phonetics: data.phonetics,
      word: data.word,
      source: data.sourceUrls,
    };
  });
  const word = wordData[0].word;
  const source = wordData[0].source;
  const phonetic = wordData[0].phonetic;

  if (wordData.length === 1) {
    meanings = wordData[0].meanings;
  }

  for (let i = 0; i < wordData.length - 1; i++) {
    if (wordData[i].meanings.length > wordData[i + 1].meanings.length) {
      meanings = wordData[i].meanings;
    }
  }

  phonetics = wordData
    .map((data) => data.phonetics)
    .flat()
    .filter((data) => data.audio);

  console.log(wordData);
  console.log(meanings);
  console.log(phonetics);
  console.log(word, source, phonetic);
}
searchBtn.addEventListener("click", () => {
  getWord(searchBox.value);
});
