/*
 * Table of Contents jQuery Plugin - jquery.toc.js
 *
 * Copyright 2013 Nikhil Dabas
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */

(function ($) {
    "use strict";

    // Just in case you have another plugin that wants this
    var old = $.fn.toc;

    // Builds a list with the table of contents in the current selector.
    // contentContainer: where to look for headings
    // options:
    //    headings: string with a comma-separated list of selectors to be used as headings, in the
    //    order which defines their relative heirarchy level
    //    list: the tag used to create the lists, either "ul" or "ol"
    $.fn.toc = function (contentContainer, options) {

        // Defaults
        contentContainer = contentContainer || "body";
        options = $.extend({headings: "h1,h2,h3,h4", list: "ul"}, options);

        // The upside-down stack keeps track of lists where new siblings or children may be added.
        var stack = [this], headingSelectors = options.headings.split(","), currentLevel = 0;

        // Set up some automatic IDs if we do not already have them
        $(contentContainer).find(options.headings).attr("id", function (index, attr) {
            // Generate a valid ID: must start with a letter, and contain only letters and numbers.
            // All other characters are replaced with underscores.
            return attr || $(this).text().replace(/^[^A-Za-z]*/, "").replace(/[^A-Za-z0-9]+/g, "_");
        }).each(function () {
            // What level is the current heading?
            var elem = $(this), level = $.map(headingSelectors, function (selector, index) {
                return elem.is(selector) ? index : undefined;
            })[0] + 1;

            if (level > currentLevel) {
                // If the heading is at a deeper level than where we are, start a new nested list.
                // if this list is to be a nested list, it must be a child of the last list item in
                // the parent list.
                // In the upside-down stack, unshift = push
                stack.unshift($("<" + options.list + "/>").appendTo(
                    stack[0].children("li:last")[0] || stack[0]
                ));
            } else {
                // Truncate the stack to the current level by chopping off the 'top' of the stack.
                // if there are more than two elements on the stack, preserve those - the first is
                // the containing element, and the second is the 'root' list (ul/ol).
                stack.splice(0, Math.min(currentLevel - level, Math.max(stack.length - 2, 0)));
            }

            // Add the list item
            $("<li/>").appendTo(stack[0]).append(
                $("<a/>").text(elem.text()).attr("href", "#" + elem.attr("id"))
            );

            currentLevel = level;
        });

        return this;
    };

    $.fn.toc.noConflict = function () {
        $.fn.affix = old;
        return this;
    };

    // Data API
    $(window).on("load", function () {
        $("[data-toc]").each(function () {
            var elem = $(this), data = elem.data();
            elem.toc(data.toc, {headings: data.tocHeadings, list: data.tocList});
        });
    });
}(window.jQuery));
