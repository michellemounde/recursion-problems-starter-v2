/***********************************************************************
Write a recursive function that will find the best way to make change from a
given set of coin values for a given amount of money. The set of coin values
should default to using pennies (1 cent), nickels (5 cents), dimes (10 cents),
and quarters (25 cents). Return `null` if there are no possible ways to make
change for the given amount amount.

Examples:

makeChange(21); // [1, 10, 10]
makeChange(75); // [25, 25, 25]
makeChange(33, [15, 3]); // [3, 15, 15]
makeChange(34, [15, 3]); // null
makeChange(24, [10, 7, 1]) // [7, 7, 10]

Here's a game plan for solving the problem:

First, write a 'greedy' version called `greedyMakeChange`:

Take as many of the biggest coin as possible and add them to your result.
Add to the result by recursively calling your method on the remaining amount,
leaving out the biggest coin, until the remainder is zero.
Once you have a working greedy version, talk with your partner about refactoring
this to `makeBetterChange`. What's wrong with `greedyMakeChange`?

Consider the case of `greedyMakeChange(24, [10,7,1])`. Because it takes as many
10 pieces as possible, `greedyMakeChange` misses the correct answer of
`[10,7,7]` (try it in node).

To `makeBetterChange`, we only take one coin at a time and never rule out
denominations that we've already used. This allows each coin to be available
each time we get a new remainder. By iterating over the denominations and
continuing to search for the best change, we assure that we test for
'non-greedy' uses of each denomination.

Discuss the following game plan and then work together to implement your
new method:

- Iterate over each coin.
- Grab only one of that one coin and recursively call `makeBetterChange` on the
  remainder using usableCoins less than or equal to the current coin.
- Add the single coin to the change returned by the recursive call. This will be
  a possible solution, but maybe not the best one.
- Keep track of the best solution and return it at the end.

N.B. Don't generate every possible permutation of usableCoins and then compare them.
Remember that a permutation is not the same thing as a combination - we will
need to check every combination of usableCoins that add up to our amount, we just
don't want to check the same combination in different orders. If you get stuck
you can start by writing a solution that calculates and compares all of the
permutations without storing them in an array. Then go back and refactor your
solution so that it only calculates and compares all of the different
combinations.
***********************************************************************/

function greedyMakeChange(target, coins = [25, 10, 5, 1]) {
  // no tests for greedyMakeChange so make sure to test this on your own
  // your code here

  function makeChange(amount, usableCoins) {
    let change = [];
    const unchecked = usableCoins.slice(1);
    let remainder;

    if (usableCoins.length === 0 && amount > 0) {
      change.push(null);
      return change;
    } else if (usableCoins.length === 0) {
      return change;
    }

    const coin1 = usableCoins[0];
    const times = Math.floor(amount / coin1);

    if (times < 1) {
      change.push(...makeChange(amount, unchecked));
    } else {
      remainder = amount - (coin1 * times);
      change = Array(times).fill(coin1);
      change.push(...makeChange(remainder, unchecked));
    }

    return change;
  }

  const greedyChange = makeChange(target, coins);

  return greedyChange.includes(null) ? null : greedyChange;
}

// Understood solution and modified
// Solution from: https://stackoverflow.com/questions/32643357/implementing-a-recursive-coin-change-function-in-javascript
function makeBetterChange(target, coins = [25, 10, 5, 1]) {
  // your code here
  const sortedCoins = coins.sort((a, b) => b - a);

  function makeChangeWithCount(amount, usableCoins) {
    if (amount === 0) {
      return [0, []];
    }

    if (usableCoins.length === 0 && amount > 0) {
      return [Infinity, []];
    }

    if (usableCoins[0] > amount) {
      return makeChangeWithCount(amount, usableCoins.slice(1));
    } else {
      let loseIt = makeChangeWithCount(amount, usableCoins.slice(1));
      let useIt = makeChangeWithCount(amount - usableCoins[0], usableCoins);

      // If losing it leads to using less usableCoins than using it does then lose it
      if(loseIt[0] < 1 + useIt[0]) {
        return loseIt;
      } else {
        // Else use it
        useIt[1].unshift(usableCoins[0])
        return [1 + useIt[0], useIt[1]];
      }
    }
  }

  const changeWithCount = makeChangeWithCount(target, sortedCoins);

  return changeWithCount[0] === Infinity ? null: changeWithCount[1];
}

// greedyMakeChange

console.log(greedyMakeChange(21)); // [ 10, 10, 1 ]
console.log(greedyMakeChange(75)); // [ 25, 25, 25 ]
console.log(greedyMakeChange(33, [15, 3])); // [ 15, 15, 3 ]
console.log(greedyMakeChange(34, [15, 3])); // null
console.log(greedyMakeChange(24, [10, 7, 1])) // [ 10, 10, 1, 1, 1, 1 ]


// makeBetterChange

console.log(makeBetterChange(21)); // [ 10, 10, 1 ]
console.log(makeBetterChange(75)); // [ 25, 25, 25 ]
console.log(makeBetterChange(33, [15, 3])); // [ 15, 15, 3 ]
console.log(makeBetterChange(34, [15, 3])); // null
console.log(makeBetterChange(24, [10, 7, 1])) // [ 10, 7, 7 ]
console.log(makeBetterChange(12, [9, 6, 1]));                   // [ 6, 6 ]
console.log(makeBetterChange(48, [1, 5, 10, 25, 50]));          // [ 25, 10, 10, 1, 1, 1 ]
console.log(makeBetterChange(48, [1, 7, 24, 42]));              // [ 24, 24 ]
console.log(makeBetterChange(189, [1, 77, 17, 63, 92, 8, 14])); // [ 63, 63, 63 ]

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = makeBetterChange
} catch (e) {
  module.exports = null;
}
