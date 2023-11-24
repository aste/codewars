function rndCode() {
  const letters = "ABCDEFGHIJKLM";
  const symbols = "~!@#$%^&*";
  const rndNum = (from, to) => ~~((to - from) * Math.random() + from);
  let verificationCode = "";

  for (let i = 1; i <= 8; i++) {
    if (i < 3) {
      verificationCode += letters[rndNum(0, letters.length - 1)];
    } else if (i < 7) {
      verificationCode += rndNum(0, 9);
    } else {
      verificationCode += symbols[rndNum(0, symbols.length - 1)];
    }
  }

  return verificationCode;
}

// Coding in function rndCode. Your task is to generate a random verification code. In accordance with the following rules:

// the code length should be 8;

// The 1st and 2nd characters should be two uppercase letters. The range is "ABCDEFGHIJKLM".

// The 3rd-6th characters should be four numbers.

// the 7th and 8th characters should be two symbols. The range is "~!@#$%^&*".

// If Your code runs 100 times, It should generate 100 non duplicate verification codes.

// Some valid verification code examples:

// Test.assertSimilar(typeof yourcode,"string","The result should be string");
//     Test.assertSimilar(yourcode.length,8,"The length should be 8");
//     Test.assertSimilar("ABCDEFGHIJKLM".indexOf(yourcode[0])>-1,true,"1st char should generate from A-M");
//     Test.assertSimilar("ABCDEFGHIJKLM".indexOf(yourcode[1])>-1,true,"2nd char should generate from A-M");
//     Test.assertSimilar(/^\d{4}$/.test(yourcode.slice(2,-2)),true,"3th-6th char should be numbers");
//     Test.assertSimilar("~!@#$%^&*".indexOf(yourcode[6])>-1,true,"7th char should generate from ~!@#$%^&*");
//     Test.assertSimilar("~!@#$%^&*".indexOf(yourcode[7])>-1,true,"8th char should generate from ~!@#$%^&*");
