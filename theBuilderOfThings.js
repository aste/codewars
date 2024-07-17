class Thing {
  constructor(name) {
    this.name = name;
    this._properties = {};

    this.is_a = new Proxy(
      {},
      {
        get: (target, prop) => {
          this._properties[`is_a_${prop}`] = true;
          return this;
        },
      }
    );

    this.is_not_a = new Proxy(
      {},
      {
        get: (target, prop) => {
          this._properties[`is_a_${prop}`] = false;
          return this;
        },
      }
    );

    this.is_the = new Proxy(
      {},
      {
        get: (target, prop) => {
          return {
            of: (value) => {
              this._properties[prop] = value;
              return this;
            },
          };
        },
      }
    );
  }

  has(count) {
    return new Proxy(
      {},
      {
        get: (target, prop) => {
          if (count === 1) {
            this._properties[prop] = new Thing(prop);
          } else {
            this._properties[prop] = Array.from({ length: count }, () => new Thing(prop));
          }
          return this;
        },
      }
    );
  }

  get is_a_person() {
    return this._properties["is_a_person"];
  }

  get is_a_man() {
    return this._properties["is_a_man"];
  }

  get parent_of() {
    return this._properties["parent_of"];
  }

  get legs() {
    return this._properties["legs"];
  }

  get head() {
    return this._properties["head"];
  }
}

// DESCRIPTION:
// For this kata you will be using some meta-programming magic to create a new Thing object. This object will allow you to define things in a descriptive sentence like format.

// This challenge attempts to build on itself in an increasingly complex manner.

// Examples of what can be done with "Thing":

// const jane = new Thing("Jane");
// jane.name; // => 'Jane'

// // can define boolean methods on an instance
// jane.is_a.person;
// jane.is_a.woman;
// jane.is_not_a.man;

// jane.is_a_person; // => true
// jane.is_a_man; // => false

// can define properties on a per instance level
jane.is_the.parent_of.joe;
jane.parent_of; // => 'joe'

// can define number of child things
// when more than 1, an array is created
jane.has(2).legs;
jane.legs.length; // => 2
jane.legs[0] instanceof Thing; // => true

// can define single items
jane.has(1).head;

jane.head instanceof Thing; // => true

// can define number of things in a chainable and natural format
jane.has(2).arms.each((arm) => having(1).hand.having(5).fingers);

jane.arms[0].hand.fingers.length; // => 5

// can define properties on nested items
jane
  .has(1)
  .head.having(2)
  .eyes.each((eye) => being_the.color.blue.having(1).pupil.being_the.color.black);

// can define methods
jane.can.speak("spoke", (phrase) => `${name} says: ${phrase}`);

jane.speak("hello"); // => "Jane says: hello"

// if past tense was provided then method calls are tracked
jane.spoke; // => ["Jane says: hello"]
