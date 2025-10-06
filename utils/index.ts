export function addSpacesToNumber(number: number) {
  const numString = number?.toString();
  const parts = [];
  let i = numString?.length;

  while (i > 0) {
    parts.unshift(numString.substring(Math.max(0, i - 3), i));
    i -= 3;
  }

  return parts.join(" ");
}


export const ranks = [
  { name: "Cub Recruit", min: 0, max: 99, icon: "./recriut.png" },
  { name: "Scout", min: 100, max: 999, icon: "./scout.png" },
  { name: "Warrior", min: 1000, max: 9999, icon: "./warrior.png" },
  { name: "Sergeant", min: 10000, max: 99999, icon: "./sergeant.png" },
  { name: "Captain", min: 100000, max: 999999, icon: "./captain.png" },
  { name: "Lieutenant", min: 1000000, max: 9999999, icon: "./lutenantt.png" },
  { name: "Commander", min: 10000000, max: 99999999, icon: "./commander.png" },
  { name: "General", min: 100000000, max: 999999999, icon: "./general.png" },
  {
    name: "Field Marshal",
    min: 1000000000,
    max: 9999999999,
    icon: "./field.png",
  },
  {
    name: "Champion of Matara",
    min: 10000000000,
    max: Infinity,
    icon: "./champion.png",
  },
];