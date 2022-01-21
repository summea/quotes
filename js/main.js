// from example:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomQuote(data) {
  let randomIndex = getRandomInt(0, data.length-1);
  let quoteText = data[randomIndex].body;
  currentIndex = randomIndex;
  return quoteText.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function getQuote(data, index) {
  let quoteText = data[index].body;
  currentIndex = index;
  return quoteText.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function getPreviousQuote() {
  let quote = getQuote(quoteData, quoteHistory.length-1);
  quoteHistory.pop();
  return quote;
}

function getNextQuote() {
  return getRandomQuote(quoteData);
}

document.addEventListener('keydown', function(e) {
  // Previous Quote
  if ((e.keyCode == 37) && (quoteHistory.length > 0)) {
    let quote = getPreviousQuote();
    container.innerHTML = quote;
  }
  // Next Quote
  if (e.keyCode == 39) {
    let quote = getNextQuote();
    quoteHistory.push(currentIndex);
    container.innerHTML = quote;
  }
});

let container = document.getElementById('container');
let currentIndex = 0;
let quoteData = [];
let quoteHistory = [];
container.innerHTML = 'Loading quote...';

// ref: https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // ref: https://developer.mozilla.org/en-US/docs/Web/API/Request
    fetch('/apps/quotes/data/quotes.json')
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Could not get quotes data.');
        }
      })
      .then(function(data) {
        quoteData = data;
        container.innerHTML = getRandomQuote(data);
      })
      .catch(function(e) {
        console.log('There was an error getting quotes data.');
      });
  }
}

// #TODO: In case where going "next" and then "previous", can't seem to
// get back to starting quote -- it seems to be okay if going "next" "next"
