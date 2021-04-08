const DEBUG = false;
const test = "FLAG{abcdefg123}";
if (DEBUG) console.log(applyMagicalDecoder(applyMagicalEncoder(test)));

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

  if (DEBUG) console.log(f);

  // unshuffle
  f = shuffled_f.sort(function (a, b) {
    return a - b;
  }); // formula for f orders them

  // decode from the formula for f
  let char_codes = []; // b in the encoder
  let char_digits = []; // c in the encoder
  let i, d, e;

  for (let j = 0; j < f.length; j++) {
    i = Math.floor(f[j] / 137) - 1; // index of the char in the msg
    d = Math.floor((f[j] % 137) / 13) - 1; // index of the digit in the char code

    if (d == 0 && char_digits.length > 0) {
      char_codes.push(char_digits.join(""));
      char_digits = [];
    }

    e = (f[j] % 137) % 13; // char digit
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
