const alphabet = {
  'a': 1,
  'b': 2,
  'c': 3,
  'd': 4,
  'e': 5,
  'f': 6
}

const check = ['d', 'e', 'f', 'g', 'h']

// console.log(alphabet["3" + 2 * 2])

// check.map(letter => console.log(alphabet[letter]))

// console.log("alphabet is ", alphabet)

function test() {
  console.log("Test has begun.")
  check.map(letter => console.log(alphabet[letter]))
  
  console.log("Test is over.")
}

test()