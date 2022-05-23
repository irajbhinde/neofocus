import { getRandomQuote, newQuoteList } from "../../utils/randomQuoteGenerator";
import "../QuoteCard/quotecard.css";

export default function QuoteCard() {
  const quote = newQuoteList[getRandomQuote].quote;
  return <footer className="quote_container">{quote}</footer>;
}
