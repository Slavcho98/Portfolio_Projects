const studyDurationInput = document.querySelector("#studyDuration");
const breakDurationInput = document.querySelector("#breakDuration");
const startBtn = document.querySelector("#startButton");
const progressBar = document.querySelector("#progressBar");

let id;
let sessionHistoryDisplayed = false;

window.addEventListener("DOMContentLoaded", function () {
  const sessionHistory =
    JSON.parse(localStorage.getItem("sessionHistory")) || [];
  sessionHistory.forEach((sessionInfo) => {
    const p = document.createElement("p");
    p.textContent = sessionInfo;
    document.body.append(p);
  });
});

function startTimer() {
  if (
    studyDurationInput.value.trim() === "" ||
    breakDurationInput.value.trim() === ""
  ) {
    alert("Please enter a value for both study and break durations");
    return;
  }

  let studyDuration = +studyDurationInput.value * 60;
  let breakDuration = +breakDurationInput.value * 60;

  if (studyDuration === 0 || breakDuration === 0) {
    alert("Study and break durations must be greater than 0");
    return;
  }

  id = setInterval(updateProgress, 1000);

  function updateProgress() {
    if (studyDuration > 0 || breakDuration > 0) {
      if (studyDuration > 0) {
        studyDuration--;
        updateProgressBar(studyDuration, studyDurationInput.value * 60);
      } else {
        breakDuration--;
        updateProgressBar(breakDuration, breakDurationInput.value * 60);
      }
    } else {
      clearInterval(id);
      alert("Session complete!");
      if (!sessionHistoryDisplayed) {
        displaySessionHistory();
        sessionHistoryDisplayed = true;
      }
      displaySessionInfo();
    }
  }

  function updateProgressBar(currentTime, totalTime) {
    const widthPercentage = ((totalTime - currentTime) / totalTime) * 100;
    progressBar.style.width = `${widthPercentage}%`;
  }

  function displaySessionHistory() {
    const h2 = document.createElement("h2");
    h2.textContent = "Session history";
    document.body.append(h2);
  }

  function displaySessionInfo() {
    const formattedDate = new Date().toLocaleString();
    const studyDurationText = `Study Duration: ${studyDurationInput.value} minutes`;
    const breakDurationText = `Break Duration: ${breakDurationInput.value} minutes`;
    const totalSessionTime =
      parseInt(studyDurationInput.value) + parseInt(breakDurationInput.value);
    const sessionInfo = `Date: ${formattedDate}, ${studyDurationText}, ${breakDurationText}, Total Study Time: ${totalSessionTime} minutes`;

    if (!localStorage.getItem("sessionHistory")) {
      localStorage.setItem("sessionHistory", JSON.stringify([sessionInfo]));
    } else {
      const sessionHistory = JSON.parse(localStorage.getItem("sessionHistory"));
      sessionHistory.push(sessionInfo);
      localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    }

    const p = document.createElement("p");
    p.textContent = sessionInfo;
    document.body.append(p);
  }
}

startBtn.addEventListener("click", startTimer);

window.addEventListener("beforeunload", function () {
  studyDurationInput.value = "";
  breakDurationInput.value = "";
});
