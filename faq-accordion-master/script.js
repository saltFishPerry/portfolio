//selecting elements

"use strict";
const accordionItems = document.querySelectorAll(".accordion-questions");




// 1. add click event to each button
accordionItems.forEach((question) => {
  question.addEventListener("click", function () {
    // add active class on the clicked element

    this.classList.toggle("active");

    /* Toggle between hiding and showing the active element */

    accordionItems.forEach((el) => {
      if (el != this && el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });
 
  });
});
