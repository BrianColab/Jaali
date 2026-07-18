type QuoteBlockProps = Readonly<{
  attribution: string;
  quote: string;
}>;

export function QuoteBlock({ attribution, quote }: QuoteBlockProps) {
  return (
    <figure className="quote-block">
      <blockquote className="quote-block__quote">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="quote-block__citation">{attribution}</figcaption>
    </figure>
  );
}
