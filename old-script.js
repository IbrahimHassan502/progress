const lessonArr = [
  {
    name: "Intro & What Is WordPress?",
    done: false,
    progress: 0,
  },
  {
    name: "Knowledge And Tools That I Need",
    done: false,
    progress: 0,
  },
  {
    name: "WordPress.Com vs WordPress.Org",
    done: false,
    progress: 0,
  },
  {
    name: "Setup WordPress On WordPress.Com",
    done: false,
    progress: 0,
  },
  {
    name: "Setup WordPress On Localhost",
    done: false,
    progress: 0,
  },
  {
    name: "Setup WordPress On DirectAdmin",
    done: false,
    progress: 0,
  },
  {
    name: "Setup WordPress on cPanel Website",
    done: false,
    progress: 0,
  },
  {
    name: "Dig Deep Into WordPress Database",
    done: false,
    progress: 0,
  },
  {
    name: "Tips to Secure Your WordPress Website",
    done: false,
    progress: 0,
  },
  {
    name: "#11 - WordPress Dashboard",
    done: false,
    progress: 0,
  },
  {
    name: "#12 - WordPress Toolbar",
    done: false,
    progress: 0,
  },
  {
    name: "#13 - WordPress Categories",
    done: false,
    progress: 0,
  },
  {
    name: "#14 - WordPress Posts - Editor & Overview",
    done: false,
    progress: 0,
  },
  {
    name: "#15 - WordPress Posts - Publish Options",
    done: false,
    progress: 0,
  },
];
const lessons = JSON.parse(window.localStorage.getItem("lessons")) || lessonArr;
console.log(lessons);
let doneCount = Number(window.localStorage.getItem("doneCount")) || 0;
let currentProgress = Math.round((doneCount / lessons.length) * 100);
/* =======================
 STYLING MAIN PROGRESS BAR
 ========================= */
const mainProgressPrecentage = document.querySelector(".main-progress");
mainProgressPrecentage.textContent = `${Math.round(
  (doneCount / lessons.length) * 100
)}%`;
const fill = document.querySelector(".fill");
fill.style.width = `${currentProgress}%`;
/* =======================
 STYLING MAIN PROGRESS BAR
 ========================= */

/* =======================
 SHOWING LESSON LIST
 ========================= */
const tabel = document.querySelector(".tabel");
const length = lessons.length;
function showLessons() {
  for (let i = 0; i < length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `<div class="num">${i + 1}</div>
              <div class="name">${lessons[i].name}</div>
              <div class="status">
                <button data-index = '${i}'>${
      lessons[i].done ? "done" : "to be done"
    }</button>
              </div>
              <div class="progress ${lessons[i].progress ? "" : "hidden"}">${
      lessons[i].progress || 0
    }</div>`;
    tabel.append(row);
  }
}
showLessons();
/* =======================
 SHOWING LESSON LIST
 ========================= */

/* =======================
 DONE BUTTON FUNCTION
 ========================= */
const doneButton = document.querySelectorAll(".status button");
tabel.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const button = e.target;
    let buttonRow = lessons[button.dataset.index];
    if (buttonRow.done) {
      // CHANGIN DATA UNDER THE HOOD
      buttonRow.done = false;
      window.localStorage.setItem("doneCount", --doneCount);
      buttonRow.progress = 0;

      // CHAINGING DATA VISUALLY
      button.textContent = "to be done";
      // COUNT down ANIMATION
      let progressAnimation = setInterval(() => {
        let buttonProgress = button.parentElement.nextElementSibling;
        buttonProgress.classList.add("hidden");
        if (parseInt(buttonProgress.textContent) > currentProgress) {
          buttonProgress.textContent = `${
            parseInt(buttonProgress.textContent) - 1
          }%`;
        } else {
          clearInterval(progressAnimation);
        }
      }, 40);
      let mainProgressAnimation = setInterval(() => {
        if (parseInt(mainProgressPrecentage.textContent) > currentProgress) {
          mainProgressPrecentage.textContent = `${
            parseInt(mainProgressPrecentage.textContent) - 1
          }%`;
        } else {
          clearInterval(mainProgressAnimation);
        }
      }, 40);
      fill.style.width = `${currentProgress}%`;
      //   SENDING ARRAY TO DATA BASE AFTER CHANGE
      window.localStorage.setItem("lessons", JSON.stringify(lessons));
    } else {
      // CHANGIN DATA UNDER THE HOOD
      buttonRow.done = true;
      window.localStorage.setItem("doneCount", ++doneCount);
      buttonRow.progress = `${Math.round(
        (button.dataset.index / length) * 100
      )}%`;

      // CHAINGING DATA VISUALLY
      button.textContent = "done!";
      // COUNT UP ANIMATION
      let progressAnimation = setInterval(() => {
        let buttonProgress = button.parentElement.nextElementSibling;
        buttonProgress.classList.remove("hidden");
        if (parseInt(buttonProgress.textContent) < currentProgress) {
          buttonProgress.textContent = `${
            parseInt(buttonProgress.textContent) + 1
          }%`;
        } else {
          clearInterval(progressAnimation);
        }
      }, 40);
      let mainProgressAnimation = setInterval(() => {
        if (parseInt(mainProgressPrecentage.textContent) < currentProgress) {
          mainProgressPrecentage.textContent = `${
            parseInt(mainProgressPrecentage.textContent) + 1
          }%`;
        } else {
          clearInterval(mainProgressAnimation);
        }
      }, 40);

      fill.style.width = `${currentProgress}%`;
      // SENDING ARRAY TO DATA BASE AFTER CHANGE
      window.localStorage.setItem("lessons", JSON.stringify(lessons));
    }
  }
});
/* =======================
 DONE BUTTON FUNCTION
 ========================= */
