const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    // if loader hidden is false then
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote(){
    loading();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    // const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json%lang=en';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If Author is blank then 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font-size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        //authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
        //console.log(data);
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        getQuote();
        console.log('Whoops, no quote', error);
    }
}

 // Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
//loading();