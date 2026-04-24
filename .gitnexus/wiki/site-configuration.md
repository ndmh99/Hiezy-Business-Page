# Site Configuration

# Site Configuration Module

The **Site Configuration** module consists of two static assets that inform search engines and crawlers about how the site should be indexed:

| Asset | Path | Purpose |
|-------|------|---------|
| `robots.txt` | `/robots.txt` | Declares crawl permissions and provides the location of the sitemap. |
| `sitemap.xml` | `/sitemap.xml` | Lists the publicly available URLs, their last modification dates, change frequency hints, and priority values for search engine indexing. |

These files are served directly by the web server (e.g., Nginx, Apache, or a CDN edge) and are **not** processed by any application code. Consequently, the module has no runtime dependencies, internal calls, or execution flow.

---

## 1. `robots.txt`

```text
User-agent: *
Allow: /

# Sitemap link for Search Engines
Sitemap: https://hiezy.com/sitemap.xml
```

### Key directives
- **`User-agent: *`** – Applies to all crawlers.
- **`Allow: /`** – Grants permission to crawl the entire site.
- **`Sitemap:`** – Points crawlers to the `sitemap.xml` file, enabling them to discover the URLs listed there.

### Maintenance notes
- If new sections of the site become private, add `Disallow:` rules before the `Allow:` line.
- When the sitemap URL changes (e.g., moving to a versioned path), update the `Sitemap:` line accordingly.

---

## 2. `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Landing Page -->
  <url>
    <loc>https://hiezy.com/</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Inspirations Hub / Coming Soon -->
  <url>
    <loc>https://hiezy.com/inspirations.html</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Elements explained
| Element | Description |
|---------|-------------|
| `<urlset>` | Root element; must include the sitemap namespace. |
| `<url>` | Container for a single URL entry. |
| `<loc>` | Fully qualified URL. |
| `<lastmod>` | Date the resource was last changed (ISO 8601). |
| `<changefreq>` | Hint to crawlers about how often the page changes (`always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`). |
| `<priority>` | Relative priority (0.0 – 1.0) compared to other URLs on the same site. |

### Adding new URLs
1. Insert a new `<url>` block before the closing `</urlset>` tag.
2. Populate the fields with accurate data:
   - `loc` – absolute URL.
   - `lastmod` – the date of the most recent content update.
   - `changefreq` – choose the most realistic frequency.
   - `priority` – higher for core pages, lower for ancillary content.

### Automation considerations
- The site currently uses a static file; if the URL set grows, consider generating `sitemap.xml` via a build script (e.g., a Node.js or Python script) that scans the output directory and writes the XML.
- When automating, keep the same schema and ordering to avoid breaking existing SEO expectations.

---

## 3. Integration with the Rest of the Codebase

- **Static serving**: The web server is configured to serve these files at the root (`/robots.txt`, `/sitemap.xml`). No application routes or middleware touch them.
- **No runtime impact**: Because there are no imports, function calls, or event listeners, changes to these files do not require a rebuild of the application bundle.
- **Search engine visibility**: Search engines read `robots.txt` first, then follow the `Sitemap:` URL to fetch `sitemap.xml`. Keeping these files up‑to‑date directly influences crawl efficiency and SEO ranking.

---

## 4. Deployment Checklist

| ✅ | Item |
|----|------|
| ☐ | Verify that `robots.txt` contains the correct `Sitemap:` URL. |
| ☐ | Confirm that all public URLs are listed in `sitemap.xml` with accurate `<lastmod>` dates. |
| ☐ | Test that both files are reachable (`curl https://hiezy.com/robots.txt` and `curl https://hiezy.com/sitemap.xml`). |
| ☐ | If using a CDN, purge the cache for these two paths after any change. |
| ☐ | Run an online sitemap validator (e.g., Google Search Console) to catch XML schema errors. |

---

## 5. Future Enhancements (optional)

- **Dynamic sitemap generation**: Hook into the build pipeline to auto‑populate `<url>` entries from a source‑of‑truth (e.g., a markdown content list or a CMS API).
- **Multi‑language support**: Add `<xhtml:link rel="alternate" hreflang="...">` tags inside each `<url>` for localized pages.
- **Granular crawl control**: Introduce `Disallow:` rules in `robots.txt` for admin or staging paths as the project expands.