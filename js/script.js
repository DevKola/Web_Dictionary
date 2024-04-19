"use strict";

const toggleCont = document.getElementById("toggle-cont");
const toggleBtn = document.getElementById("toggle-btn");
const body = document.getElementById("body");
const headerMoon = document.getElementById("header-moon");

// Select
const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");
const arrow = document.getElementById("arrow");

const selectedValue = document.querySelector(".selected-value");
const dropdown = document.getElementById("select-dropdown");
const optionsList = document.querySelectorAll(".select-dropdown li");

function darkTheme() {
  toggleBtn.classList.toggle("header__btn-toggle-right");
  body.classList.toggle("body__dark-theme");
  toggleCont.classList.toggle("header__btn-themes-dark");
  headerMoon.classList.toggle("header__themes-img-dark");
  arrow.classList.toggle("arrow__dark");
  selectedValue.classList.toggle("selected-value-dark");
  dropdown.classList.toggle("select-dropdown-dark");
}

toggleCont.addEventListener("click", darkTheme);

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
