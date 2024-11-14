(window.onload = function () {
  const ghosts = JSON.parse(localStorage.getItem("ghosts") || []);

  const uniqBehaviors = {};
  ghosts.forEach((ghost) => {
    Object.entries(ghost.behaviors).forEach(([key, behavior]) => {
      if (!uniqBehaviors[key]) {
        uniqBehaviors[key] = { name: behavior.name };
      }
    });
  });

  const checkboxStates = {};
  const behaviorContainer = document.querySelector(".behavior-checkboxes");
  const filterButton = document.getElementById("filter-button");
  const resetButton = document.getElementById("reset-button");
  let filterButtonPressed = false;

  function insertCheckboxBehaviours() {
    const lang = localStorage.getItem("language") || "en";
    behaviorContainer.replaceChildren();
    Object.entries(uniqBehaviors).forEach(([key, { name }], i) => {
      const checkboxDiv = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = key;
      checkbox.className = "behavior-checkbox";
      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = `${i + 1}. ` + name[lang] ?? name?.en;

      checkboxStates[checkbox.id] = 0;
      checkbox.addEventListener("click", () => {
        // Cycle state: 0 -> 1 -> 2 -> 0
        checkboxStates[checkbox.id] = (checkboxStates[checkbox.id] + 1) % 3;
        updateCheckboxStyle(checkbox);
        updateChart();
      });

      checkboxDiv.appendChild(checkbox);
      checkboxDiv.appendChild(label);

      behaviorContainer.appendChild(checkboxDiv);
    });
  }

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

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      title: "Unique Behaviors",
      lineColor: "black",
      labelFontColor: "black",
      interval: 1,
      labelFormatter: (e) => {
        // const lang = localStorage.getItem("language") || "en";
        // const label = Object.values(uniqBehaviors)[e.value]?.name[lang] || "";
        // return `${e.value + 1}. ` + label.slice(0, 7) + "...";
        return e.value + 1;
      },
    },
    axisY2: {
      crosshair: {
        enabled: true,
      },
      gridDashType: "dot",
      title: "% of Probability",
      suffix: "%",
      titleFontColor: "black",
      labelFontColor: "black",
      minimum: -110,
      maximum: 110,
      interval: 25,
    },
    toolTip: {
      shared: true,
    },
    data: [],
  });

  function updateChart() {
    const lang = localStorage.getItem("language") || "en";
    const selected = [];
    const crossed = [];

    const checkboxes = document.querySelectorAll(".behavior-checkbox");
    checkboxes.forEach((checkbox) => {
      const behavior = checkbox.id;
      const state = checkboxStates[behavior];

      if (state === 1) {
        selected.push(behavior);
      } else if (state === 2) {
        crossed.push(behavior);
      }
    });

    const data = ghosts.filter(filterByVisibleId).map(({ name, behaviors }) => {
      const dataPoints = Object.entries(uniqBehaviors).map(
        ([key, { name }], index) => {
          let probability = 0;
          if (selected.includes(key)) {
            probability = behaviors?.[key]?.value || 0;
          }
          if (crossed.includes(key)) {
            probability = -behaviors?.[key]?.value || 0;
          }
          return {
            x: index,
            y: probability,
            label: `${index + 1}. ` + name[lang] ?? name.en,
          };
        }
      );

      return {
        type: "line",
        name: name[lang] ?? name.en,
        markerSize: 5,
        axisYType: "secondary",
        xValueFormatString: "#",
        yValueFormatString: '#0"%"',
        showInLegend: true,
        dataPoints,
      };
    });

    chart.options.data = data;
    chart.render();
  }

  function filterByVisibleId({ id }) {
    return !(
      filterButtonPressed &&
      !JSON.parse(localStorage.getItem("visibleGhostIds") || []).includes(id)
    );
  }

  function filterSelections() {
    filterButtonPressed = !filterButtonPressed;
    if (filterButtonPressed) {
      filterButton.classList.remove("btn-light");
      filterButton.classList.add("btn-dark");
    } else {
      filterButton.classList.remove("btn-dark");
      filterButton.classList.add("btn-light");
    }
    updateChart();
  }
  filterButton.addEventListener("click", filterSelections);

  function resetSelections() {
    const checkboxes = document.querySelectorAll(".behavior-checkbox");
    checkboxes.forEach((checkbox) => {
      checkboxStates[checkbox.id] = 0;
      updateCheckboxStyle(checkbox);
    });
    updateChart();
  }
  resetButton.addEventListener("click", resetSelections);

  document.addEventListener("evidenceUpdatedEvent", (event) => {
    console.log(event.detail?.message);
    updateChart();
  });

  document.addEventListener("languageUpdatedEvent", (event) => {
    console.log(event.detail?.message);
    insertCheckboxBehaviours();
    updateChart();
  });

  insertCheckboxBehaviours();

  chart.render();
  updateChart();
})();
