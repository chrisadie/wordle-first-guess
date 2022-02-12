// Work out the best starting word for Wordle

const wordList = require('./wordlist1');
const maxWords = wordList.length;
const wordLength = wordList[0].length;
const greenWeight = 2; // Weight of green over gold

// Collect the arguments, if any
var candidate = "";
var testword = "";
if (process.argv.length<2 || process.argv.length>4) {
	usage();
}
if (process.argv.length>=3) {
	candidate = process.argv[2];
	if (candidate.length!=wordLength) {
	  usage();
	}
}
if (process.argv.length>=4) {
	testword = process.argv[3];
	if (testword.length!=wordLength) {
	  usage();
	}
}

// Depending on arguments, calculare the score(s)
if (candidate=="") {
	// Use each word from the wordList in turn as the candidate
	for (let i = 0; i < maxWords; i++) {
		console.log(cumulativeScore(wordList[i]) + " " + wordList[i]);
	}
} else
if (testword=="") {
	// Compare candidate against the wordList
	console.log(cumulativeScore(candidate) + " " + candidate);
} else {
	// Compare candidate against the supplied testword
	console.log(computeScore(candidate,testword) + " " + candidate + " " + testword);
}

// Done!
process.exit();

// ---- Functions ----

function usage() {
	console.log("usage:");
	console.log("       node index.js [candidate [testword]]");
  console.log("where candidate and testword, if present, must have exactly " +
							wordLength + " letters");
	process.exit();
}

// Score the candidate against the entire wordList
function cumulativeScore(cand) {
	let score = 0;
	for (let i = 0; i < maxWords; i++) {
		score += computeScore(cand,wordList[i]);
	}
	return score;
}

// Score the candidate against the word
function computeScore(cand,word) {
	let score = 0;
	let c = cand.split("");
	let w = word.split("");
	// Look for right letter in right position
	for (let i = 0; i < wordLength; i++) {
		if (c[i]==w[i]) {
			// Hit! Score, and take out to prevent further hits
			score += greenWeight;
			c[i] = '-';
			w[i] = '-';
		}
	}
	// Look for right letter in wrong position
	for (let j = 0; j < wordLength; j++) {
		if (c[j]!='-') {
			// Unmatched letter in candidate, so go through the testword
			for (let k = 0; k < wordLength; k++) {
				if (w[k]!='-') {
					if (c[j]==w[k]) {
						// Hit! Score, and take out to prevent further hits
						score++;
						w[k] = '-';
						break;
					}
				}
			}
		}
	}
	return score;
}
