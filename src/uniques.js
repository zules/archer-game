import HealthBar from "./HealthBar";

export const CLANS_STRONGEST_FIRST = [
  "Scarestare",
  "Secretkeep",
  "Formstorm",
  "Watercross",
  "Beatleap",
  "Skymind",
  "Fossilcall",
]

export const UNIQUES_ARRAY = [
  ["01", {
    name: "Songleader",
    atk: 9, hp: 7, spd: 5, acc: 90, gly: 6,
    clan: "Beatleap",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["02", {
    name: "Drummer",
    atk: 4, hp: 4, spd: 7, acc: 99, gly: 7,
    clan: "Beatleap",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "piercing",
          amount: 3,
        }
      ],
      onGetKill: [],
    },
    flavor: "", }],
  ["03", {
    name: "Legend",
    atk: 10, hp: 5, spd: 8, acc: 90, gly: 7,
    clan: "Beatleap",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "inspiring",
          amount: 1,
        }
      ],
    },
    flavor: "", }],
  ["04", {
    name: "Happy Chanter",
    atk: 1, hp: 6, spd: 4, acc: 90, gly: 8,
    clan: "Beatleap",
    abil: {
      onEveryEngage: [
        {
          effect: "beloved",
          amount: 3,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["05", {
    name: "Rainmaker",
    atk: 15, hp: 8, spd: 3, acc: 50, gly: 9,
    clan: "Beatleap",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["06", {
    name: "Arts Master",
    atk: 8, hp: 14, spd: 8, acc: 99, gly: 2,
    clan: "Formstorm",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["07", {
    name: "Ex-gymnast",
    atk: 3, hp: 9, spd: 9, acc: 95, gly: 4,
    clan: "Formstorm",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["08", {
    name: "Technician",
    atk: 5, hp: 8, spd: 3, acc: 95, gly: 5,
    clan: "Formstorm",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "piercing",
          amount: 2,
        }
      ],
      onGetKill: [],
    },
    flavor: "", }],
  ["09", {
    name: "Chimera",
    atk: 10, hp: 12, spd: 5, acc: 85, gly: 5,
    clan: "Formstorm",
    abil: {
      onEveryEngage: [
        {
          effect: "scary",
          amount: 3,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["10", {
    name: "Athelete",
    atk: 4, hp: 17, spd: 7, acc: 85, gly: 5,
    clan: "Formstorm",
    abil: {
      onEveryEngage: [
        {
          effect: "beloved",
          amount: 1,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["11", {
    name: "Lovely Idol",
    atk: 3, hp: 40, spd: 1, acc: 90, gly: 2,
    clan: "Fossilcall",
    abil: {
      onEveryEngage: [
        {
          effect: "beloved",
          amount: 2,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["12", {
    name: "Dinosaur",
    atk: 10, hp: 20, spd: 7, acc: 75, gly: 3,
    clan: "Fossilcall",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "rampaging",
          amount: 10,
        }
      ],
    },
    flavor: "", }],
  ["13", {
    name: "Method Actor",
    atk: 11, hp: 12, spd: 6, acc: 80, gly: 4,
    clan: "Fossilcall",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["14", {
    name: "Dusty Bandit",
    atk: 6, hp: 8, spd: 4, acc: 95, gly: 6,
    clan: "Fossilcall",
    abil: {
      onEveryEngage: [
        {
          effect: "blinding",
          amount: .20,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["15", {
    name: "Archaeologist",
    atk: 3, hp: 8, spd: 2, acc: 70, gly: 9,
    clan: "Fossilcall",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["16", {
    name: "Survivalist",
    atk: 4, hp: 25, spd: 4, acc: 80, gly: 3,
    clan: "Scarestare",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "heal",
          amount: 8,
        }
      ],
      onGetKill: [],
    },
    flavor: "", }],
  ["17", {
    name: "Butcher",
    atk: 9, hp: 11, spd: 3, acc: 90, gly: 4,
    clan: "Scarestare",
    abil: {
      onEveryEngage: [
        {
          effect: "scary",
          amount: 3,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["18", {
    name: "Werewolf",
    atk: 21, hp: 12, spd: 6, acc: 60, gly: 5,
    clan: "Scarestare",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "rampaging",
          amount: 4,
        }
      ],
    },
    flavor: "", }],
  ["19", {
    name: "Aged Hunter",
    atk: 8, hp: 4, spd: 6, acc: 95, gly: 6,
    clan: "Scarestare",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["20", {
    name: "Crown Claimer",
    atk: 3, hp: 15, spd: 5, acc: 75, gly: 8,
    clan: "Scarestare",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "inspiring",
          amount: 2,
        }
      ],
    },
    flavor: "", }],
  ["21", {
    name: "Priest",
    atk: 20, hp: 13, spd: 2, acc: 70, gly: 1,
    clan: "Secretkeep",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["22", {
    name: "Spider Assassin",
    atk: 7, hp: 1, spd: 8, acc: 99, gly: 6,
    clan: "Secretkeep",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "piercing",
          amount: 2,
        }
      ],
      onGetKill: [],
    },
    flavor: "", }],
  ["23", {
    name: "Fledgling Bloodsucker",
    atk: 2, hp: 7, spd: 6, acc: 80, gly: 7,
    clan: "Secretkeep",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "heal",
          amount: 7,
        }
      ],
      onGetKill: [],
    },
    flavor: "", }],
  ["24", {
    name: "Astral Projection",
    atk: 7, hp: 10, spd: 1, acc: 99, gly: 7,
    clan: "Secretkeep",
    abil: {
      onEveryEngage: [
        {
          effect: "blinding",
          amount: .10,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["25", {
    name: "Shadow",
    atk: 3, hp: 15, spd: 1, acc: 95, gly: 7,
    clan: "Secretkeep",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["26", {
    name: "Astrologer",
    atk: 12, hp: 15, spd: 3, acc: 90, gly: 3,
    clan: "Skymind",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["27", {
    name: "Evil Sage",
    atk: 5, hp: 15, spd: 5, acc: 90, gly: 4,
    clan: "Skymind",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "rampaging",
          amount: 3,
        }
      ],
    },
    flavor: "", }],
  ["28", {
    name: "Moon Watcher",
    atk: 5, hp: 20, spd: 1, acc: 95, gly: 4,
    clan: "Skymind",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "heal",
          amount: 5,
        }
      ],
      onGetKill: [],
    },
    flavor: "", }],
  ["29", {
    name: "Wayward Philosopher",
    atk: 8, hp: 6, spd: 7, acc: 85, gly: 5,
    clan: "Skymind",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["30", {
    name: "Astronomer",
    atk: 4, hp: 9, spd: 2, acc: 80, gly: 7,
    clan: "Skymind",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "inspiring",
          amount: 3,
        }
      ],
    },
    flavor: "", }],
  ["31", {
    name: "Apostate Lifeguard",
    atk: 6, hp: 9, spd: 8, acc: 90, gly: 5,
    clan: "Watercross",
    abil: {
      onEveryEngage: [
        {
          effect: "scary",
          amount: 2,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["32", {
    name: "Lighthouse Warden",
    atk: 3, hp: 14, spd: 3, acc: 95, gly: 5,
    clan: "Watercross",
    abil: {
      onEveryEngage: [
        {
          effect: "blinding",
          amount: .25,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["33", {
    name: "Sailor",
    atk: 5, hp: 14, spd: 5, acc: 80, gly: 6,
    clan: "Watercross",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["34", {
    name: "Frog Friend",
    atk: 3, hp: 9, spd: 6, acc: 85, gly: 8,
    clan: "Watercross",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
  ["35", {
    name: "Amphibious Archer",
    atk: 2, hp: 7, spd: 7, acc: 95, gly: 8,
    clan: "Watercross",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "", }],
];

export const UNIQUES = new Map(UNIQUES_ARRAY);