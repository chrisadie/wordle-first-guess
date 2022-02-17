# wordle-first-guess
A Node.js program to determine the best starting guess for Wordle.

## Introduction
The online game [Wordle](https://www.nytimes.com/games/wordle/index.html) starts
by the player guessing a five-letter word given no information about the target
word. This program analyses the Wordle word lists to determine which initial
guess is most likely to deliver helpful information about the target.

The answer is below!

A full analysis of the game can be found in the
[WithoutBullshit blog](https://withoutbullshit.com/blog/wordle-revised-mathematical-analysis-of-the-first-guess). This code implements a "brute-force" approach
rather that the more sophisticated analysis in the blog.

## Install
The code is available as an npm module. To install it, execute the following
from within your home directory:

```
npm install wordle-first-guess
```
## Usage
To run the program, use the following commands:

```
cd ~/.node_modules/wordle-first-guess
npm run best-guesses
```

You should see the following appear:

```
6972 cares
6821 dares
6801 bares
6694 cores
6639 canes
6600 aloes
6582 dales
6562 bales
6556 dates
6554 rates
```

These are the best ten guesses to use, based on the example word lists.
The number is the score from the algorithm which determines what is "best".

The word lists provided are examples, and (for copyright reasons) are *not*
the actual word lists used by the game!

You can replace `exampleanswerlist.js` and `exampleguesslist.js` by the word
lists from the game to get the
real answer - **the best guess to start Wordle with** - which is:

***SOARE***
