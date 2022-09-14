/***********************************************************************
Write a function called `subsets` that will return all subsets of an array.

Examples:



Hint: For subsets([1, 2, 3]), there are two kinds of subsets:
  1. Those that do not contain 3 (all of these are subsets of [1, 2]).
  2. For every subset that does not contain 3, there is also a corresponding
     subset that is the same, except it also does contain 3.
***********************************************************************/

// your code here
// *Understood Solution for subsets creation recursively, figured iterative solution
function subsets(nums) {
  // Powerset is a set which contains all subsets of the given set
  const powerset = [];

  generatePowerset([], 0);

  // Start with empty set
	function generatePowerset(path, index) {
		powerset.push(path);

    // Generate all sets containing num at selected index
    // i.e. have most sets being created in Loop 1 with num at index 0
    // and it only generates previously ungenerated sets with current num
		for (let i = index; i < nums.length; i++) {
      // Major loops numbered below with the subsets being generated in each sub-loop of a major loop
      // 1 => Loop 1: [1] [1, 2] [1, 2, 3] Loop 2: [1, 3]
      // 2 => Loop 1: [2] [2, 3]
      // 3 => Loop 1: [3]
			generatePowerset([...path, nums[i]], i + 1);
		}
	}

	return powerset;
}

console.log(subsets([])) // [[]]
console.log(subsets([1])) // [[], [1]]
console.log(subsets([1, 2])) // [[], [1], [2], [1, 2]]
console.log(subsets([1, 2, 3])) // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
// console.log(subsets([1, 2, 3, 4, 5]))
// [[], [1], [2], [3], [4], [5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4],
// [3, 5], [4, 5], [1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4],
// [2, 3, 5], [2, 4, 5], [3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 4, 5], [1, 3, 4, 5],
// [2, 3, 4, 5], [1, 2, 3, 4, 5]]
/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = subsets;
} catch (e) {
  module.exports = null;
}
