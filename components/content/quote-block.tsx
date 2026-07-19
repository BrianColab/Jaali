type QuoteBlockProps = Readonly<{
  attribution: string;
  quote: string;
}>;

export function QuoteBlock({ attribution, quote }: QuoteBlockProps) {
  return (
    <figure className="quote-block">
      <span className="quote-block__mark" aria-hidden="true">
        “
      </span>
      <blockquote className="quote-block__quote">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="quote-block__citation">{attribution}</figcaption>
    </figure>
  );
}
