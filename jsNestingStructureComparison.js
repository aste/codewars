Array.prototype.sameStructureAs = function (other) {
  if (!Array.isArray(other)) return false;
  if (this.length !== other.length) return false;

  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i]) && Array.isArray(other[i])) {
      if (this[i].sameStructureAs(other[i]) == false) return false;
    } else if (Array.isArray(this[i]) || Array.isArray(other[i])) {
      return false;
    }
  }

  return true;
};

// // should return true
// console.log([1, 1, 1].sameStructureAs([2, 2, 2]));
// console.log([1, [1, 1]].sameStructureAs([2, [2, 2]]));

// // should return false
// console.log([1, [1, 1]].sameStructureAs([[2, 2], 2]));
// console.log([1, [1, 1]].sameStructureAs([[2], 2]));

// // should return true
// console.log([[[], []]].sameStructureAs([[[], []]]));

// // should return false
// console.log([[[], []]].sameStructureAs([[1, 1]]));

// For your convenience, there is already a function 'isArray(o)' declared and defined that returns true if its argument is an array, false otherwise.
