const fs = require('fs').promises;
const { MarkovMachine } = require('./markov');
const axios = require('axios');

//Generate text using Markov chain
function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

//Read file and return content
async function readFile(path) {
  return await fs.readFile(path, 'utf8');
}

//Fetch content from user's URL
async function readUrl(url) {
  const resp = await axios.get(url);
  return resp.data;
}

// Main function to handle command line args
async function main() {
  let args = process.argv.slice(2);
  let [source, path] = args;

  // Check if correct number of arguments are provided
  if (args.length < 2) {
    console.error('Usage: node makeText.js <source> <path>');
    console.error('Source can be either "file" or "url"');
    process.exit(1);
  }

  try {
    let data;
    // Determine whether to read from a file or URL 
    if (source === 'file') {
      data = await readFile(path);
    } else if (source === 'url') {
      data = await readUrl(path);
    } else {
      throw new Error('Invalid source. Use "file" or "url"');
    }

    // Generate and output text based on the input data
    generateText(data);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
