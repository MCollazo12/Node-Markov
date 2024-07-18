const { MarkovMachine } = require('../markov');
const fs = require('fs');

describe('Markov machine tests', () => {
  let mm;

  beforeEach(() => {
    mm = new MarkovMachine('the cat in the hat');
  });

  test('chains are built correctly', () => {
    expect(mm.chains).toEqual(
      new Map([
        ['the', ['cat', 'hat']],
        ['cat', ['in']],
        ['in', ['the']],
        ['hat', [null]],
      ])
    );
  });

  test('makeText generates the correct number of words', () => {
    let generatedText = mm.makeText(50);
    let words = generatedText.split(' ');
    expect(words.length).toBeLessThanOrEqual(50);
  });

  test('makeText handles small input text', () => {
    let mmSmall = new MarkovMachine('one');
    let generatedText = mmSmall.makeText(5);
    let words = generatedText.split(' ');
    expect(words.length).toBeLessThanOrEqual(5);
    expect(words.length).toBeGreaterThanOrEqual(1);
  });

  test('makeText handles empty input text', () => {
    let mmEmpty = new MarkovMachine('');
    let generatedText = mmEmpty.makeText(10);
    expect(generatedText.trim()).toBe(''); 
  });
});
