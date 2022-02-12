# wordle-first-guess
A Node.js program to determine the best starting guess for Wordle

## Introduction
The online game [Wordle](https://www.nytimes.com/games/wordle/index.html) starts
by the player guessing a five-letter word given no information about the target
word. This program analyses the Wordle word list to determine which initial
guess is most likely to deliver helpful information about the target.

The answer is below!

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

These are the best ten guesses to use. The number is the score from the
algorithm which determines what is "best".

The wordlist provided is `wordlist1.js`, and (for copyright reasons) is *not*
the actual wordlist used by the game! (The game's real wordlist has significantly
fewer words that end in 's'.)

You can replace `wordlist1.js` by the word list from the game to get the
real answer - **the best guess to start Wordle with** - , which is:

***STARE***
