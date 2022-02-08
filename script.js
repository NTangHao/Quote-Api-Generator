/*Get Quote API*/

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton =document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];
//Show loading
function loading() {
    loader.hidden=false;
    quoteContainer.hidden=true;

}
//Hide loading
function complete() {
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuote() {
loading();
    /*dùng Math radom và floor để làm. floor làm tròn xuống số nguyên*/
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quotes.author;
    if (quotes.text.length > 50) {
        quoteText.classList.add("long-quote");
    }
    else {
     quoteText.classList.remove("long-quote");
    }

    quoteText.textContent=quotes.text;
complete();
}

async function getQuotes () {
    loading();
    const api = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(api);
        apiQuotes = await response.json();
//mỗi lần click là ra random 1 cái quote;
//  tạo function

        newQuote();
    } catch (e) {

    }
}

/*Tweet quote*/
function tweetquote() {
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(twitterUrl,'_blank');

}

//Event Listener
newQuoteButton.addEventListener("click",newQuote );
twitterButton.addEventListener("click", tweetquote);
getQuotes();
// loading();