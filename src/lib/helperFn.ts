export function getRandomNumbers() {
  let numbers: number[] = [];

  while (numbers.length < 3) {
    let randomNumber = Math.floor(Math.random() * 21); // Generates a random number between 0 and 20
    if (!numbers.includes(randomNumber)) {
      // Checks if the number is already in the array
      numbers.push(randomNumber); // Adds the number to the array if it's not already there
    }
  }

  return numbers;
}
export const getPointTarget = (point: number) => {
  const levels = { level1: 500, level2: 1000, level3: 1500 };
  let remainder;
  let level;
  let target;
  let percentage;
  switch (true) {
    case point <= levels.level1:
      remainder = levels.level1 - point;
      level = 1;
      target = levels.level1;
      percentage = (point / levels.level1) * 100;
      break;
    case point <= levels.level2 && point > levels.level1:
      remainder = levels.level2 - point;
      level = 2;
      target = levels.level2;
      percentage = (point / levels.level2) * 100;
      break;
    case point <= levels.level3 && point > levels.level2:
      remainder = levels.level3 - point;
      level = 3;
      target = levels.level3;
      percentage = (point / levels.level3) * 100;
      break;
    default:
      remainder = 0;
      level = 4;
      target = 2000;
      percentage = (point / levels.level3) * 100;
  }
  return { level, target, remainder, percentage };
};

export function generateId() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
