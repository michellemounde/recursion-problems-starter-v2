/***********************************************************************
Write a recursive function called `flatten` that takes a single array with
any number of nested arrays and returns and array with all the nested
contents on one level.

Examples:


***********************************************************************/

// your code here
function flatten(arr) {
  const flattened = [];

  if (arr.length === 0) {
    return flattened;
  }

  const el1 = arr[0];
  const unflattened = [...arr.slice(1)];

  if (Array.isArray(el1)) {
    flattened.push(...flatten(el1), ...flatten(unflattened));
  } else {
    flattened.push(el1, ...flatten(unflattened));
  }

  return flattened;
}

console.log(flatten([])); // []
console.log(flatten([1, 2])); // [1, 2]
console.log(flatten([1, [2, [3]]])); // [1, 2, 3]
console.log(flatten([[1, 2, 3], [4, 5], [6]]));
console.log(flatten([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8, 9],
    [10, 11, 12, 13, 14, 15]
]));

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = flatten;
} catch (e) {
  module.exports = null;
}
