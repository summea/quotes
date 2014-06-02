// from example:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Quote = Backbone.Model.extend({
  body:'quote body here'
});

var QuoteCollection = Backbone.Collection.extend({
  model: Quote,
  url: 'data/quotes.json',
  parse: function(response){
    return response;
  }
});

var AppView = Backbone.View.extend({
  initialize: function(){
    this.quotes = new QuoteCollection();
    this.quotes.fetch();
    this.quotes.bind('reset', this.render, this);
    $('body').bind('keydown', this.logKey);
  },

  getQuote: function(){
    try {
      // get random quote
      var randomIndex = getRandomInt(0,this.quotes.length-1);
      var quoteText = this.quotes.at(randomIndex).get("body");
      quoteText = quoteText.replace(/(?:\r\n|\r|\n)/g, '<br>');
      $('#container').html(quoteText);
    }
    catch (e) {}
  },

  logKey: function(e){
    if ((e.keyCode == 39) || (e.keyCode == 37)) {
      // get new quote
      appView.getQuote();
    }
  },
  
  render: function(){
    this.getQuote();
  }
});

// initialize view
var appView = new AppView();
