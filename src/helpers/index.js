const checkData = (data, push, ...rest) => {
  if (data === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  } else if (data.length && data.length === 1) {
    if (rest[0].includes('meals')) push(`/meals/${data[0].idMeal}`);
    if (rest[0].includes('drinks')) push(`/drinks/${data[0].idDrink}`);
  }

  if (rest[0].includes('meals')) rest[1](data);
  if (rest[0].includes('drinks')) rest[2](data);
};

export default checkData;

export const setOneMeasureDrink = (ingredients, measures) => [
  [...ingredients[0], measures[0][1]],
  [...ingredients[1], ''],
  [...ingredients[2], ''],
];
