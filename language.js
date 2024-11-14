(function () {
  const languageUpdatedEvent = new CustomEvent("languageUpdatedEvent", {
    detail: { message: "Language changed!" },
  });

  function setLanguage(language) {
    localStorage.setItem("language", language);

    if (language === "ru") {
      document.querySelector("h1").textContent =
        "Трекер Доказательств Привидений";
      document.getElementById("select-evidence--title").textContent = "Улики";
      document.getElementById("ghosts--title").textContent = "Призраки";
      document.getElementById("specific-ghost-behaviours--title").textContent =
        "Особое поведение";
      document.getElementById("probability-chart--title").textContent =
        "Диаграмма вероятности";
      document.getElementById("reset-button").textContent = "Сброс";
      document.getElementById("filter-button").textContent = "Фильтр скрытых";
    } else {
      document.querySelector("h1").textContent = "Ghost Evidence Tracker";
      document.getElementById("select-evidence--title").textContent =
        "Select Evidence";
      document.getElementById("ghosts--title").textContent = "Ghosts";
      document.getElementById("specific-ghost-behaviours--title").textContent =
        "Specific Ghost Behaviors";
      document.getElementById("probability-chart--title").textContent =
        "Probability Chart";
      document.getElementById("reset-button").textContent = "Reset";
      document.getElementById("filter-button").textContent = "Filter hidden";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const storedLanguage = localStorage.getItem("language") || "en";
    document.getElementById("languageSwitcher").value = storedLanguage;
    setLanguage(storedLanguage);

    document
      .getElementById("languageSwitcher")
      .addEventListener("change", (event) => {
        setLanguage(event.target.value);
        document.dispatchEvent(languageUpdatedEvent);
      });
  });
})();
