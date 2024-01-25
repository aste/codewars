Array.prototype.sameStructureAs = function (other) {

  let thisInt = 0;
  let otherInt = 0;

  let thisCompare = [];
  let otherCompare = [];

  function unfoldArray(arr, arrToAppendTo, counter = 0) {
    for (element in arr) {
      if (Array.isArray(element)) {
        let newCounter = counter + 1;
        unfoldArray(element, arrToAppendTo, newCounter);
      } else {
        arrToAppendTo.push(counter);
        console.log(`counter is: ${counter}`);
      }
    }
  }

  unfoldArray(this, thisCompare);
  unfoldArray(other, otherCompare);

  console.log(thisCompare);
  console.log(otherCompare);

  console.log("");

  // Return 'true' if and only if 'other' has the same
  // nesting structure as 'this'.
  // Note: You are given a function isArray(o) that returns
  // whether its argument is an array.
};

// Complete the function/method (depending on the language) to return true/True when its argument is an array that has the same nesting structures and same corresponding length of nested arrays as the first array.

// For example:

//  // should return true
// [1, 1, 1].sameStructureAs([2, 2, 2]);
// [1, [1, 1]].sameStructureAs([2, [2, 2]]);

//  // should return false
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );

// // should return true
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] );

// // should return false
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );
// For your convenience, there is already a function 'isArray(o)' declared and defined that returns true if its argument is an array, false otherwise.
