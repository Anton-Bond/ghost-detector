(function () {
  const evidences = JSON.parse(localStorage.getItem("evidences") || {});
  const ghosts = JSON.parse(localStorage.getItem("ghosts") || []);

  const checkboxes = document.querySelectorAll(".evidence-checkbox");
  const ghostList = document.querySelector(".ghost-list");
  const resetButton = document.getElementById("reset-button");

  const checkboxStates = {};

  const evidenceUpdatedEvent = new CustomEvent("evidenceUpdatedEvent", {
    detail: { message: "Evidences updated!" },
  });

  checkboxes.forEach((checkbox) => {
    // Set initial state to 0 (unchecked)
    checkboxStates[checkbox.id] = 0;

    // Add click event to cycle through states
    checkbox.addEventListener("click", () => {
      // Cycle state: 0 -> 1 -> 2 -> 0
      checkboxStates[checkbox.id] = (checkboxStates[checkbox.id] + 1) % 3;
      updateCheckboxStyle(checkbox);
      updateGhostStyles();
      document.dispatchEvent(evidenceUpdatedEvent);
    });

    updateCheckboxStyle(checkbox);
  });

  function updateCheckboxStyle(checkbox) {
    const state = checkboxStates[checkbox.id];
    if (state === 0) {
      checkbox.checked = false;
      checkbox.classList.remove("crossed");
    } else if (state === 1) {
      checkbox.checked = true;
      checkbox.classList.remove("crossed");
    } else {
      checkbox.checked = false;
      checkbox.classList.add("crossed");
    }
  }

  function updateGhostStyles() {
    const lang = localStorage.getItem("language") || "en";
    const visibleGhostIds = [];
    const selectedEvidence = [];
    const crossedEvidence = [];

    checkboxes.forEach((checkbox) => {
      const state = checkboxStates[checkbox.id];
      const evidence = evidences[checkbox.id].key;

      if (state === 1) {
        selectedEvidence.push(evidence);
      } else if (state === 2) {
        crossedEvidence.push(evidence);
      }
    });

    ghostList.innerHTML = ghosts
      .map((ghost) => {
        const matchesSelected = selectedEvidence.every((evidence) =>
          ghost.evidence.includes(evidence)
        );
        const matchesCrossed = crossedEvidence.every(
          (evidence) => !ghost.evidence.includes(evidence)
        );

        if (matchesSelected && matchesCrossed) {
          visibleGhostIds.push(ghost.id);
        }

        const ghostStyle =
          matchesSelected && matchesCrossed ? "" : "color: lightgray;";
        return `<div style="${ghostStyle}">${
          ghost.name[lang] ?? ghost.name["en"]
        }</div>`;
      })
      .join("");

    localStorage.setItem("visibleGhostIds", JSON.stringify(visibleGhostIds));
  }

  function resetSelections() {
    checkboxes.forEach((checkbox) => {
      checkboxStates[checkbox.id] = 0;
      updateCheckboxStyle(checkbox);
    });

    updateGhostStyles();
  }

  resetButton.addEventListener("click", resetSelections);

  function changeLabelLanguage() {
    const lang = localStorage.getItem("language") || "en";
    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
      label.innerHTML = evidences[label.htmlFor]?.lang[lang] || label.innerHTML;
    });
  }

  document.addEventListener("languageUpdatedEvent", (event) => {
    console.log(event.detail?.message);
    changeLabelLanguage();
    updateGhostStyles();
  });

  changeLabelLanguage();
  updateGhostStyles();
})();
