# Table of Contents jQuery Plugin - jquery.toc.js

A minimal, tiny jQuery plugin that will generate a table of contents, drawing from headings on the
page.

## Usage

After including jQuery (>= 1.6) and jquery.toc.js on your page, run a script like this:

    $("#toc").toc();

This will generate the TOC from all `h1`, `h2`, `h3`, and `h4` tags on the page, and insert it into
`#toc` (for example, `<div id="toc"></div>`.) The list itself will use `ul` tags, and each heading
on the page will get a nice ID, if it doesn't already have one. The IDs will be based on the text
content of the heading.

### Options

The plugin has two arguments, both optional:

    $(...).toc(contentContainer, options);

`contentContainer` is a selector where the plugin will look for headings to build up the TOC.

`options` is a hash, with these keys: (all optional)

* `headings` is a string with a comma-separated list of selectors to be used as headings, in the
  order which defines their relative heirarchy level. The default value of `"h1,h2,h3,h4"` will
  select all `h1`, `h2`, `h3`, and `h4` to build the TOC, with `h1` being a level 1, `h2` a level 2,
  and so on. You can use any valid list of jQuery selectors; for example, if you just want `h1` tags
  with a specific class, and no `h4` tags, you could use `"h1.title,h2,h3"` for this option.
* `list` is the tag that's created for the lists. Valid options are `"ul"` and `"ol"`.

The default values are:

    $(...).toc("body", {headings: "h1,h2,h3,h4", list: "ul"});

### Examples of Usage

Build a TOC using headings from a specific container element:

    $("#toc").toc("#container");

Build a TOC using specific kinds of headings:

    $("#toc").toc("body", {headings: "h2.title,h3"});

Build a TOC using numbered lists:

    $("#toc").toc("body", {list: "ol"});

### Automatic ID generation

The plugin generates hash-links to the headings on the page, to allow users to jump to the heading
by clicking in the generated table of contents. This feature requires that the headings have IDs
assigned; if they do not, the plugin will generate IDs for you.

The generated IDs are based on the text inside the headings, and uses two simple rules:

* The ID must begin with a letter; so any non-letter (`[^A-Za-z]`) characters are discarded from the
  beginning of the string.
* For the rest of the ID, only letters and numbers are used from the heading text; all other
  characters (`[^A-Za-z0-9]`) are converted to underscores.

For example, a heading like `<h2>Heading 2.1</h2>` will get the ID `Heading_2_1`.

## Alternatives

If you're looking for a jQuery plugin that does more than just generate a minimal table of contents,
the project wiki [lists some more plugins](https://github.com/ndabas/toc/wiki/Alternatives).

## License

Licensed under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## Credits

Created by [Nikhil Dabas](http://www.nikhildabas.com/).