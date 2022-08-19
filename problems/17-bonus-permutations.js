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
// Solution : figure this out later
function permutations(arr) {
  const perms = [];

  const permute = (subArr, perm = []) => {
    if (subArr.length === 0) {
      perms.push(perm);
    } else {
      for (let i = 0; i < subArr.length; i++) {
        let curr = subArr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), perm.concat(next))
     }
   }
  }

  permute(arr);

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
