/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== '');
    this.makeChains();
  }

  static randomKey(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!chains.has(word)) {
        chains.set(word, [nextWord]);
      } else {
        chains.get(word).push(nextWord);
      }
    }

    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.randomKey(keys);
    let out = [];

    while (out.length < numWords && key != null) {
      out.push(key);
      let nextKeys = this.chains.get(key);
      key = MarkovMachine.randomKey(nextKeys);
    }

    return out.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};