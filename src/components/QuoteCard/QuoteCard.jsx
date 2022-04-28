import { getRandomQuote } from "../../utils/randomQuoteGenerator";
import { quoteList } from "../../dataImports/quotes";
export default function QuoteCard() {
  const quote = quoteList.quotes[getRandomQuote].quote;
  return <h1>{quote}</h1>;
}
