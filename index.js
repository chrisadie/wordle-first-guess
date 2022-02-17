//
// Work out the best starting word for Wordle
//

// Files containing word lists
const example = 'example';
const answerFile = './'+example+'answerlist';
const guessFile = './'+example+'guesslist';

// Load the word lists
const answerList = require(answerFile);
const guessList = require(guessFile);
const wordLength = answerList[0].length;

// Weight of green over gold
const greenWeight = 2;

// Letters which invalidate a candidate
const invalidLetters = []; // "soare".split("");

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

// Depending on arguments, calculate the score(s)
if (candidate=="") {
	// Use each word from the answer list in turn as the candidate
	let n = answerList.length;
	for (let i = 0; i < n; i++) {
		if (eligibleCandidate(answerList[i])) console.log(cumulativeScore(answerList[i],answerList) + " " + answerList[i]);
	}
	// Now go through the guess list
	n = guessList.length;
	for (let i = 0; i < n; i++) {
		if (eligibleCandidate(guessList[i])) console.log(cumulativeScore(guessList[i],answerList) + " " + guessList[i]);
	}
} else
if (testword=="") {
	// Compare candidate against the wordList
	console.log(cumulativeScore(candidate,answerList) + " " + candidate);
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

// Score the candidate against the given wordList
function cumulativeScore(cand,wl) {
	let score = 0;
	let maxWords = wl.length;
	for (let i = 0; i < maxWords; i++) {
		score += computeScore(cand,wl[i]);
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

// Candidate is ineligible if it contains invalid letters
function eligibleCandidate(cand) {
	for (let i = 0; i<invalidLetters.length; i++) {
		if (cand.search(invalidLetters[i])>=0) return false;
	}
	return true;
}
