import { quoteList } from "../dataImports/quotes";

const getRandomQuote = Math.ceil(Math.random(0, quoteList.quotes.length) * 100);

export { getRandomQuote };
