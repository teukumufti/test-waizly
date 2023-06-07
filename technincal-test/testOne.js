const mixMaxSum = (arr) => {
  const sortedArr = arr.sort(function (a, b) {
    return a - b;
  });

  const sumArray = (params) => {
    return params.reduce((a, b) => a + b, 0);
  };

  const min = sumArray(sortedArr.slice(0, -1));
  const max = sumArray(sortedArr.slice(1));

  return [min, max];
};

const sumOnlyFour = (arr, index) => {
  arr.splice(index, 1);
  return arr.reduce((a, b) => a + b, 0);
};

console.log(mixMaxSum([1, 2, 3, 4, 5]));

console.log(sumOnlyFour([1, 2, 3, 4, 5], 0));
console.log(sumOnlyFour([1, 2, 3, 4, 5], 1));
console.log(sumOnlyFour([1, 2, 3, 4, 5], 2));
console.log(sumOnlyFour([1, 2, 3, 4, 5], 3));
console.log(sumOnlyFour([1, 2, 3, 4, 5], 4));
