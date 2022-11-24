"use strict";
const lessonArr = [
  {
    index: 0,
    name: "Intro & What Is WordPress?",
    done: false,
    progress: 0,
  },
  {
    index: 1,
    name: "Knowledge And Tools That I Need",
    done: false,
    progress: 0,
  },
  {
    index: 2,
    name: "WordPress.Com vs WordPress.Org",
    done: false,
    progress: 0,
  },
  {
    index: 3,
    name: "Setup WordPress On WordPress.Com",
    done: false,
    progress: 0,
  },
];
if (!window.localStorage.getItem("lessons")) {
  window.localStorage.setItem("lessons", JSON.stringify(lessonArr));
}
// window.localStorage.clear();
/* ==========================
========= global variables
=============================*/
const lessons = JSON.parse(window.localStorage.getItem("lessons")) || lessonArr;
let doneCount = window.localStorage.getItem("doneCount");
let donePercentage = (doneCount / lessons.length) * 100;
console.log(lessons);
/* ==========================
========= gloabal variables
=============================*/

/* ========================================
========= SHOWING MAIN PROGRESS PERCENTAGE
===========================================*/
const mainProgressPercentage = document.querySelector(".main-progress");
mainProgressPercentage.textContent = `${donePercentage}%`;
/* ========================================
========= SHOWING MAIN PROGRESS PERCENTAGE
===========================================*/

/* ==================================
========= STYLING MAIN PROGRESS BAR
====================================*/
const progressBarFill = document.querySelector(".bar .fill");
progressBarFill.style.width = `${donePercentage}%`;
/* ================================
========= STYLING MAIN PROGRESS BAR
===================================*/

/* ==========================
========= SHOWING LESSONS
=============================*/
const tabel = document.querySelector(".tabel");
lessons.forEach((lesson, index) => {
  const row = document.createElement("div");
  row.classList.add("row");
  row.innerHTML = `<div class="num">${index + 1}</div>
              <div class="name">${lesson.name}</div>
              <div class="status">
                <button class='${
                  lesson.done && "done"
                }' data-index = '${index}'>
                  <span>${lesson.done ? "done!" : "to be done"}</span>
                  <img src="imgs/party-popper2.png">
                </button>
              </div>
              <div class="progress ${lesson.progress ? "" : "hidden"}">${
    lesson.progress || 0
  }%</div>`;
  tabel.append(row);
});
/* ==========================
========= SHOWING LESSONS
=============================*/

/* ==========================
========= BUTTON FUNCTION
=============================*/
const checkSound = document.querySelector(".check-sound");
tabel.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const lesson = lessons[e.target.dataset.index];
    // lesson.done = !lesson.done;
    // ===================== in case of "to be done" ========================
    if (!lesson.done) {
      checkSound.play();
      // ------ change things under the hood ---
      lesson.progress = ((lesson.index + 1) / lessons.length) * 100;
      lesson.done = true;
      window.localStorage.setItem("doneCount", ++doneCount);
      window.localStorage.setItem("lessons", JSON.stringify(lessons));
      // ------ change things under the hood ---

      // ------ change things visually ---
      donePercentage = (doneCount / lessons.length) * 100;
      // -=-=-=-=-=-=- animating increment of the main progress -=-=-=-=-=-=
      const incMainProgPercetnage = setInterval(() => {
        if (parseInt(mainProgressPercentage.textContent) < donePercentage) {
          mainProgressPercentage.textContent = `${
            parseInt(mainProgressPercentage.textContent) + 1
          }%`;
        } else {
          clearInterval(incMainProgPercetnage);
        }
      }, 40);
      // -=-=-=-=-=-=- animating increment of the main progress -=-=-=-=-=-=
      progressBarFill.style.width = `${donePercentage}%`;
      e.target.classList.add("animate");
      e.target.children[0].textContent = "done!";
      const lessonProgress = e.target.parentElement.nextElementSibling;
      lessonProgress.classList.remove("hidden");
      // -=-=-=-=-=-=- animating increment of the lesson progress -=-=-=-=-=-=
      const incLessonProg = setInterval(() => {
        if (
          parseInt(lessonProgress.textContent) <
          ((lesson.index + 1) / lessons.length) * 100
        ) {
          lessonProgress.textContent = `${
            parseInt(lessonProgress.textContent) + 1
          }%`;
        } else {
          clearInterval(incLessonProg);
        }
      }, 40);
      // -=-=-=-=-=-=- animating increment of the lesson progress -=-=-=-=-=-=
      // ------ change things visually ---
    } else {
      // ===================== in case of "done" ========================

      // ------ change things under the hood ---
      lesson.progress = 0;
      lesson.done = false;
      window.localStorage.setItem("doneCount", --doneCount);
      window.localStorage.setItem("lessons", JSON.stringify(lessons));
      // ------ change things under the hood ---

      // ------ change things visually ---
      donePercentage = (doneCount / lessons.length) * 100;
      // -=-=-=-=-=-=- animating decrement of the main progress -=-=-=-=-=-=
      const decMainProgPercetnage = setInterval(() => {
        if (parseInt(mainProgressPercentage.textContent) > donePercentage) {
          mainProgressPercentage.textContent = `${
            parseInt(mainProgressPercentage.textContent) - 1
          }%`;
        } else {
          clearInterval(decMainProgPercetnage);
        }
      }, 40);
      // -=-=-=-=-=-=- animating increment of the main progress -=-=-=-=-=-=
      progressBarFill.style.width = `${donePercentage}%`;
      e.target.children[0].textContent = "to be done";
      e.target.classList.remove("animate");
      e.target.classList.remove("done");
      const lessonProgress = e.target.parentElement.nextElementSibling;
      lessonProgress.classList.add("hidden");
      // -=-=-=-=-=-=- animating increment of the lesson progress -=-=-=-=-=-=
      const decLessonProg = setInterval(() => {
        if (parseInt(lessonProgress.textContent) > 0) {
          lessonProgress.textContent = `${
            parseInt(lessonProgress.textContent) - 1
          }%`;
        } else {
          clearInterval(decLessonProg);
        }
      }, 40);
      // -=-=-=-=-=-=- animating increment of the lesson progress -=-=-=-=-=-=
      // ------ change things visually ---
    }
    // ===================== in case of "to be done" ========================
  }
});
/* ==========================
========= BUTTON FUNCTION
=============================*/
// window.localStorage.setItem("doneCount", 3);
