import { quoteList } from "../dataImports/quotes";

const newQuoteList = quoteList.quotes.filter(
  (quoteLength) => quoteLength.quote.length < 70
);
const getRandomQuote = Math.floor(Math.random() * newQuoteList.length);

export { getRandomQuote, newQuoteList };
