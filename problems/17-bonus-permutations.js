/***********************************************************************
Write a recursive method permutations(array) that calculates all the
permutations of the given array. For an array of length n there are n! different
permutations. So for an array with three elements we will have 3 * 2 * 1 = 6
different permutations.

Examples:

permutations([1, 2]) // [[1, 2], [2, 1]]
permutations([1, 2, 3]) // [[1, 2, 3], [1, 3, 2],
                        // [2, 1, 3], [2, 3, 1],
                        // [3, 1, 2], [3, 2, 1]]
***********************************************************************/

// your code here
// Understood solution Alvin Coderbyte
// Solution from: https://www.youtube.com/watch?v=us0cYQXQpxg&list=PLV6y_jaV-lIMUcW0dsJRkhtgZR6NnI6bn&index=7

function permutations(arr) {
  const perms = [];

  if (arr.length === 0) {
    return [ [] ];
  }

  const firstEl = arr[0];
  const permsWithoutFirst = permutations(arr.slice(1));

  permsWithoutFirst.forEach(perm => {
    // Less than or equals to allow adding to the end of an array
    for (let i = 0; i <= perm.length; i++) {
      const permWithFirst = [...perm.slice(0, i), firstEl, ...perm.slice(i)];
      perms.push(permWithFirst);
    }
  })

  return perms;
}

console.log(permutations([1, 2])) // [[1, 2], [2, 1]]
console.log(permutations([1, 2, 3])) // [[1, 2, 3], [1, 3, 2],
                        // [2, 1, 3], [2, 3, 1],
                        // [3, 1, 2], [3, 2, 1]]

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = permutations;
} catch (e) {
  module.exports = null;
}
