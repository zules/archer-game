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
    name: "Stern Elder",
    atk: 4, hp: 20, spd: 2, acc: 100, gly: 3,
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
    flavor: "Rumor is she knows everyone's birthday, even if you've never met her.", }],
  ["02", {
    name: "Absent Elder",
    atk: 7, hp: 1, spd: 8, acc: 90, gly: 3,
    clan: "Secretkeep",
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
    flavor: "She lives on some cliff somewhere. Her eyes look haunted.", }],
  ["03", {
    name: "Respected Elder",
    atk: 5, hp: 8, spd: 9, acc: 90, gly: 3,
    clan: "Formstorm",
    abil: {
      onEveryEngage: [
        {
          effect: "blinding",
          amount: .2,
        }
      ],
      forAttack: [],
      onGetKill: [],
    },
    flavor: "She looks like she's all muscle, but she's smart as well.", }],
  ["04", {
    name: "Lighthouse Elder",
    atk: 7, hp: 8, spd: 3, acc: 85, gly: 3,
    clan: "Watercross",
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
    flavor: "She's trying to reform the common currency.", }],
  ["05", {
    name: "Chanting Elder",
    atk: 3, hp: 7, spd: 4, acc: 50, gly: 3,
    clan: "Beatleap",
    abil: {
      onEveryEngage: [],
      forAttack: [
        {
          effect: "heal",
          amount: 4,
        }
      ],
      onGetKill: [],
    },
    flavor: "She's always trying to get people to join her side.", }],
  ["06", {
    name: "Inspirational Elder",
    atk: 3, hp: 17, spd: 7, acc: 90, gly: 3,
    clan: "Skymind",
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
    flavor: "Her authorial debut has been delayed 15 years now.", }],
  ["07", {
    name: "Eldest Elder",
    atk: 12, hp: 10, spd: 2, acc: 20, gly: 3,
    clan: "Fossilcall",
    abil: {
      onEveryEngage: [],
      forAttack: [],
      onGetKill: [
        {
          effect: "rampaging",
          amount: 20,
        }
      ],
    },
    flavor: "She was born with three arms, and she's still mad they cut one off.", }],
];

export const UNIQUES = new Map(UNIQUES_ARRAY);