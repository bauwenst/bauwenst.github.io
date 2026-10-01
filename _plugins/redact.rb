# frozen_string_literal: true

# Redact text at build time so the original characters never appear in HTML,
# feeds, or the search index (which uses strip_html on rendered content).
#
# Usage in posts/pages (Liquid runs before Markdown):
#
#   {% redact %}sensitive phrase{% endredact %}
#
# Output is line-shaped bars (width ≈ character count in `ch`, including spaces)
# with no recoverable source text. Breaks only on newlines.
#
# Important: emitted HTML must stay a single Kramdown HTML block (no raw
# newlines inside). Otherwise Kramdown splits the wrapper and leaves orphan
# closing tags in the page.

module Jekyll
  module Redact
    module_function

    # Match wrapper elements only (`class="redacted"`), not `.redacted-bar`.
    REDACTED_ELEMENT = %r{
      <(div|span)
      \s+[^>]*\bclass="redacted"
      [^>]*>
      .*?
      </\1>
    }mx.freeze

    def bar(n)
      n = 1 if n < 1
      # One continuous bar. Use <i> so strip_redacted can close on the outer
      # </span>/</div> without stopping at an inner </span>. Transparent
      # filler + background + box-decoration-break lets long bars wrap.
      %(<i class="redacted-bar" aria-hidden="true">#{'x' * n}</i>)
    end

    def bars_for(text)
      chunks = []
      text.to_s.split(/(\n+)/).each do |chunk|
        if chunk.match?(/\A\n+\z/)
          # Paragraph-ish break without emitting a markdown-significant blank line.
          chunks << (chunk.length >= 2 ? "<br><br>" : "<br>")
          next
        end

        next if chunk.empty?

        # Whole line (spaces included) → one bar. Newlines are the only breaks.
        chunks << bar(chunk.length)
      end
      chunks.join
    end

    def wrap(inner, multiline:)
      # markdown="0" = tell Kramdown not to parse inside this element.
      attrs = %(class="redacted" markdown="0" title="Redacted" role="deletion" aria-label="Redacted")
      if multiline
        %(<div #{attrs}>#{inner}</div>)
      else
        %(<span #{attrs}>#{inner}</span>)
      end
    end

    def redact_text(text)
      # Drop Liquid tag line breaks around the body so we don't emit leading <br>.
      raw = text.to_s.gsub(/\A\r?\n+/, "").gsub(/\r?\n+\z/, "")
      wrap(bars_for(raw), multiline: raw.include?("\n"))
    end

    def strip_redacted(html)
      html.to_s.gsub(REDACTED_ELEMENT, " ")
    end
  end

  module RedactFilters
    def strip_redacted(input)
      Jekyll::Redact.strip_redacted(input)
    end
  end

  class RedactBlock < Liquid::Block
    def render(context)
      Jekyll::Redact.redact_text(super)
    end
  end
end

Liquid::Template.register_tag("redact", Jekyll::RedactBlock)
Liquid::Template.register_filter(Jekyll::RedactFilters)
