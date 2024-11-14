(function () {
  const evidences = {
    emf: { key: "emf", lang: { en: "EMF Level 5", ru: "ЭМП Ур.5" } },
    ultraviolet: {
      key: "ultraviolet",
      lang: { en: "Ultraviolet", ru: "Ультрафиолет" },
    },
    freezing: {
      key: "freezing",
      lang: { en: "Freezing Temperatures", ru: "Нулевая температура" },
    },
    dots: {
      key: "dots",
      lang: { en: "D.O.T.S. Projector", ru: "Лазерный проектор" },
    },
    orb: { key: "orb", lang: { en: "Ghost Orb", ru: "Призрачный огонек" } },
    writing: {
      key: "writing",
      lang: { en: "Ghost Writing", ru: "Записи в блокноте" },
    },
    spiritbox: {
      key: "spiritbox",
      lang: { en: "Spirit Box", ru: "Радиоприемник" },
    },
  };

  const ghosts = [
    {
      id: 1,
      name: { en: "Spirit", ru: "Дух" },
      evidence: [
        evidences.spiritbox.key,
        evidences.writing.key,
        evidences.emf.key,
      ],
      behaviors: {},
    },
    {
      id: 2,
      name: { en: "Wraith", ru: "Мираж" },
      evidence: [
        evidences.spiritbox.key,
        evidences.dots.key,
        evidences.emf.key,
      ],
      behaviors: {
        noSaltStep: {
          name: {
            en: "Don't step on piles of salt",
            ru: "Не наступит на кучки соли",
          },
          value: 90,
        },
      },
    },
    {
      id: 3,
      name: { en: "Phantom", ru: "Фантом" },
      evidence: [
        evidences.spiritbox.key,
        evidences.dots.key,
        evidences.orb.key,
      ],
      behaviors: {
        photoTempDisapear: {
          name: {
            en: "After taking a photo, he temporarily disappears.",
            ru: "Сфотографировав, он временно исчезает",
          },
          value: 80,
        },
      },
    },
    {
      id: 4,
      name: { en: "Poltergeist", ru: "Полтергейст" },
      evidence: [
        evidences.spiritbox.key,
        evidences.writing.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {
        throwSeveralObjects: {
          name: {
            en: "Throws all nearby objects at once",
            ru: "Бросает все предметы рядом за раз",
          },
          value: 90,
        },
      },
    },
    {
      id: 5,
      name: { en: "Banshee", ru: "Банши" },
      evidence: [
        evidences.dots.key,
        evidences.ultraviolet.key,
        evidences.orb.key,
      ],
      behaviors: {
        uniqSound: {
          name: {
            en: "Unique shout into a directional microphone",
            ru: "Уникальный крик в направленный микрофон",
          },
          value: 33,
        },
      },
    },
    {
      id: 6,
      name: { en: "Jinn", ru: "Джинн" },
      evidence: [
        evidences.emf.key,
        evidences.freezing.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {
        neverTurnOffPower: {
          name: {
            en: "Never turn off the power source",
            ru: "Никогда не выключит источник электропитания",
          },
          value: 100,
        },
      },
    },
    {
      id: 7,
      name: { en: "Mare", ru: "Мара" },
      evidence: [
        evidences.orb.key,
        evidences.spiritbox.key,
        evidences.writing.key,
      ],
      behaviors: {
        turnOnLights: {
          name: {
            en: "The ghost turned on the light",
            ru: "Призрак включил свет",
          },
          value: -100,
        },
      },
    },
    {
      id: 8,
      name: { en: "Revenant", ru: "Ревенант" },
      evidence: [
        evidences.orb.key,
        evidences.writing.key,
        evidences.freezing.key,
      ],
      behaviors: {
        huntMoveSlowly: {
          name: {
            en: "Moves slowly while hunting",
            ru: "Во время охоты движется медленно",
          },
          value: 70,
        },
      },
    },
    {
      id: 9,
      name: { en: "Shade", ru: "Тень" },
      evidence: [
        evidences.emf.key,
        evidences.writing.key,
        evidences.freezing.key,
      ],
      behaviors: {},
    },
    {
      id: 10,
      name: { en: "Demon", ru: "Демон" },
      evidence: [
        evidences.freezing.key,
        evidences.writing.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {},
    },
    {
      id: 11,
      name: { en: "Yurei", ru: "Юрэй" },
      evidence: [evidences.orb.key, evidences.freezing.key, evidences.dots.key],
      behaviors: {},
    },
    {
      id: 12,
      name: { en: "Oni", ru: "Они" },
      evidence: [evidences.emf.key, evidences.freezing.key, evidences.dots.key],
      behaviors: {
        visibleLongerHunting: {
          name: {
            en: "Visible longer during hunting during flickering",
            ru: "Дольше виден на охоте во время мерцания",
          },
          value: 50,
        },
      },
    },
    {
      id: 13,
      name: { en: "Hantu", ru: "Ханту" },
      evidence: [
        evidences.orb.key,
        evidences.freezing.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {
        lowTempretureFaster: {
          name: {
            en: "Very fast in cold rooms",
            ru: "Очень быстр в холодных комнатах",
          },
          value: 50,
        },
        neverTurnOnPowerSource: {
          name: {
            en: "Never turn on the power source",
            ru: "Никогда не включает источник электропитания",
          },
          value: 100,
        },
      },
    },
    {
      id: 14,
      name: { en: "Yokai", ru: "Ёкай" },
      evidence: [
        evidences.orb.key,
        evidences.spiritbox.key,
        evidences.dots.key,
      ],
      behaviors: {},
    },
    {
      id: 15,
      name: { en: "Goryo", ru: "Горё" },
      evidence: [
        evidences.emf.key,
        evidences.dots.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {
        silhouetteLaserOnlyCamera: {
          name: {
            en: "Silhouette on laser projector only through video camera, no players in his room",
            ru: "Силуэт на лазерном проекторе только через видеокамеру, в его комнате нет игроков",
          },
          value: 100,
        },
        roomChange: {
          name: {
            en: "Never changes his favorite room",
            ru: "Никогда не меняет любимую комнату",
          },
          value: 90,
        },
      },
    },
    {
      id: 16,
      name: { en: "Myling", ru: "Мюлинг" },
      evidence: [
        evidences.emf.key,
        evidences.writing.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {},
    },
    {
      id: 17,
      name: { en: "Onryo", ru: "Онрё" },
      evidence: [
        evidences.spiritbox.key,
        evidences.orb.key,
        evidences.freezing.key,
      ],
      behaviors: {
        blowFire: {
          name: {
            en: "This fire source will blow out during the hunt",
            ru: "Задует этот источник огня во время охоты",
          },
          value: 50,
        },
      },
    },
    {
      id: 18,
      name: { en: "The Twins", ru: "Близнецы" },
      evidence: [
        evidences.emf.key,
        evidences.spiritbox.key,
        evidences.freezing.key,
      ],
      behaviors: {
        twoRadii: {
          name: {
            en: "Two interaction radii",
            ru: "Два радиуса взаимодействия",
          },
          value: 90,
        },
      },
    },
    {
      id: 19,
      name: { en: "Raiju", ru: "Райдзю" },
      evidence: [evidences.emf.key, evidences.orb.key, evidences.dots.key],
      behaviors: {},
    },
    {
      id: 20,
      name: { en: "Obake", ru: "Обакэ" },
      evidence: [
        evidences.emf.key,
        evidences.orb.key,
        evidences.ultraviolet.key,
      ],
      behaviors: {
        sixFingered: {
          name: {
            en: "Six-fingered print, two prints on light switch",
            ru: "Шестипалый отпечаток, два отпечатка на переключателе света",
          },
          value: 17,
        },
      },
    },
    {
      id: 21,
      name: { en: "The Mimic", ru: "Мимик" },
      evidence: [
        evidences.spiritbox.key,
        evidences.ultraviolet.key,
        evidences.orb.key,
        evidences.freezing.key,
      ],
      behaviors: {
        changeGhost: {
          name: { en: "Changes the ghost", ru: "Меняет призрака" },
          value: 90,
        },
      },
    },
    {
      id: 22,
      name: { en: "Moroi", ru: "Морой" },
      evidence: [
        evidences.spiritbox.key,
        evidences.writing.key,
        evidences.freezing.key,
      ],
      behaviors: {},
    },
    {
      id: 23,
      name: { en: "Deogen", ru: "Деоген" },
      evidence: [
        evidences.spiritbox.key,
        evidences.writing.key,
        evidences.dots.key,
      ],
      behaviors: {
        heavyBreathing: {
          name: {
            en: "Heavy breathing into the radio",
            ru: "Тяжёлое дыхание в радиоприемник",
          },
          value: 33,
        },
      },
    },
    {
      id: 24,
      name: { en: "Thaye", ru: "Тайэ" },
      evidence: [evidences.orb.key, evidences.writing.key, evidences.dots.key],
      behaviors: {
        ageSpeed: {
          name: {
            en: "He is very fast when he is young and very slow when he is old.",
            ru: "Он очень быстр, когда молод  и очень медленный, когда стар",
          },
          value: 90,
        },
      },
    },
  ];

  localStorage.setItem("evidences", JSON.stringify(evidences));
  localStorage.setItem("ghosts", JSON.stringify(ghosts));
})();
