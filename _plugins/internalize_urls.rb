# frozen_string_literal: true

# Rewrite absolute links to this site as root-relative paths at build time.
#
# Lets you paste https://bauwens.dev/... (or any former host) while writing;
# the published HTML uses /... instead. Source files are not modified.
#
# Config (_config.yml):
#   internalize_urls:
#     hosts:
#       - bauwens.dev
#       - bauwenst.github.io   # former / alternate hosts
#     # site.url's host is always included automatically
#
# Runs at :post_read (excerpts are built from content early) and again at
# :pre_render (idempotent) so incremental `jekyll serve` rebuilds still rewrite
# if a document was re-read from disk without a full site post_read.

require "uri"

module Jekyll
  module InternalizeUrls
    module_function

    def hosts_for(site)
      configured = Array(site.config.dig("internalize_urls", "hosts"))
      from_url =
        begin
          URI.parse(site.config["url"].to_s).host
        rescue URI::InvalidURIError
          nil
        end

      (configured + [from_url])
        .compact
        .map { |h| h.to_s.strip.downcase.delete_prefix("www.") }
        .reject(&:empty?)
        .uniq
    end

    def rewrite(content, hosts, baseurl = "")
      return content if content.nil? || content.empty? || hosts.empty?

      host_alt = hosts.map { |h| Regexp.escape(h) }.join("|")
      prefix = baseurl.to_s.chomp("/")

      # Markdown/HTML/bare URLs: https://host, https://host/, https://www.host/path?...
      content.gsub(
        %r{https?://(?:www\.)?(?:#{host_alt})(/[^\s\)\]"'<>]*)?}i
      ) do
        path = Regexp.last_match(1)
        path = "/" if path.nil? || path.empty?
        prefix.empty? ? path : "#{prefix}#{path}"
      end
    end

    def process(doc)
      return if doc.data["internalize_urls"] == false

      hosts = hosts_for(doc.site)
      baseurl = doc.site.config["baseurl"]
      doc.content = rewrite(doc.content, hosts, baseurl)

      # Drop a cached excerpt so the next access uses rewritten content
      if doc.instance_variable_defined?(:@excerpt)
        doc.remove_instance_variable(:@excerpt)
      end
    end

    def process_site(site)
      (site.pages + site.documents).each { |doc| process(doc) }
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  Jekyll::InternalizeUrls.process_site(site)
end

# Safety net for serve/incremental: re-read documents keep on-disk absolute URLs
# until rewritten. No-op when post_read already rewrote them.
Jekyll::Hooks.register [:pages, :documents], :pre_render do |doc|
  Jekyll::InternalizeUrls.process(doc)
end
