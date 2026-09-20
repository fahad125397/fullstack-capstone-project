// This line satisfies Task 8: Importing the 'natural' npm package
const natural = require('natural');

// Setting up the Sentiment Analyzer
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// A basic function to analyze the sentiment of a given text
function analyzeSentiment(text) {
  // Tokenize the text (split it into words)
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  
  // Analyze the tokens and return a sentiment score
  const score = analyzer.getSentiment(tokens);
  return score;
}

// Export the function so it can be used in your Express routes
module.exports = { analyzeSentiment };
