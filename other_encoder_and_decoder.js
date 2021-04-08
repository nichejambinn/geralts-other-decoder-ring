const DEBUG = false;

/**
 * This is the encoder used to create the contents of flag.txt
 */
function applyMagicalEncoder(input) {
  let a = [];
  for (let i = 0; i < input.length; i++) {
    let b = input.charCodeAt(i); // get unicode 0 - 65535
    let c = ("" + b).split(""); // split the digits

    for (let d = 0; d < c.length; d++) {
      // group of digits
      e = parseInt(c[d]); // take a digit
      f = e + 5 + 33 * (3 - i) + 137 * ((i + 1) * 10 + d); // encode
      a.push(f);
    }
  }

  doTheShuffle(a);

  let r = "";
  while (a.length) {
    let t = a.pop();
    r += "\u2665".repeat(t) + "\u2663"; // f many hearts separated by a club
  }
  return r;
}

function applyMagicalDecoder(input) {
  const HEART = 9828; // ♥ 9829 \u2665
  const CLUB = 9827; // ♣ 9827 \u2663

  let shuffled_f = [];
  let count = 0;

  // each f value is the count of hearts before a club appears
  for (let i = 0; i < input.length; i++) {
    if (input[i].charCodeAt() == CLUB) {
      shuffled_f.push(count);
      count = 0;
    } else {
      count++;
    }
  }

  // unshuffle
  f = shuffled_f.sort(function (a, b) {
    return a - b;
  }); // formula for f orders them

  if (DEBUG) console.log(f);

  // decode from the formula for f
  let char_codes = [];
  let char_digits = [];
  let i, d, e;

  for (let j = 0; j < f.length; j++) {
    i = Math.round(f[j] / 137 / 10) - 1; // index of the char in the msg
    d = Math.floor((f[j] + 33 * (i - 3)) / 137) - 10 * (i + 1); // index of the digit in the char code

    if (d == 0 && char_digits.length > 0) {
      char_codes.push(char_digits.join(""));
      char_digits = [];
    }

    e = (f[j] - (5 + 33 * (3 - i))) % 137; // char digit
    char_digits.push(e);

    if (DEBUG)
      console.log(
        `f=${f[j]} has digit ${e} (e) at index ${d} (d) of char ${i} (i)`
      );

    // don't miss the last digit!
    if (j == f.length - 1) {
      char_codes.push(char_digits.join(""));
    }
  }

  decoded_str = "";
  for (let i = 0; i < char_codes.length; i++) {
    decoded_str += String.fromCharCode(char_codes[i]);
  }

  return decoded_str;
}

function doTheShuffle(arra1) {
  var ctr = arra1.length,
    temp,
    index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}
