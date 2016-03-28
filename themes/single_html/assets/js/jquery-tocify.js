
(function(tocify) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
    tocify(window.jQuery, window, document);

}

(function($, window, document, undefined) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var tocClassName = "tocify",
        tocClass = "." + tocClassName,
        tocFocusClassName = "tocify-focus",
        tocHoverClassName = "tocify-hover",
        hideTocClassName = "tocify-hide",
        hideTocClass = "." + hideTocClassName,
        headerClassName = "tocify-header",
        headerClass = "." + headerClassName,
        subheaderClassName = "tocify-subheader",
        subheaderClass = "." + subheaderClassName,
        itemClassName = "tocify-item",
        itemClass = "." + itemClassName,
        extendPageClassName = "tocify-extend-page",
        extendPageClass = "." + extendPageClassName;

    // Calling the jQueryUI Widget Factory Method
    $.widget("toc.tocify", {

        version: "1.9.0",

        // These options will be used as defaults
        options: {

            context: "body",
            ignoreSelector: null,
            selectors: "h1, h2, h3",
            showAndHide: true,
            showEffect: "slideDown",
            showEffectSpeed: "medium",
            hideEffect: "slideUp",
            hideEffectSpeed: "medium",
            smoothScroll: true,
            smoothScrollSpeed: "medium",
            scrollTo: 0,
            showAndHideOnScroll: true,
            highlightOnScroll: true,
            highlightOffset: 40,
            theme: "bootstrap",
            extendPage: true,
            extendPageOffset: 100,
            history: true,
            scrollHistory: false,
            hashGenerator: "compact",
            highlightDefault: true
        },


        // _Create
        _create: function() {
            var self = this;
            self.extendPageScroll = true;

            // Internal array that keeps track of all TOC items (Helps to recognize if there are duplicate TOC item strings)
            self.items = [];

            // Generates the HTML for the dynamic table of contents
            self._generateToc();

            // Adds CSS classes to the newly generated table of contents HTML
            self._addCSSClasses();

            self.webkit = (function() {
                for(var prop in window) {
                    if(prop) {
                        if(prop.toLowerCase().indexOf("webkit") !== -1) {
                            return true;
                        }

                    }

                }

                return false;

            }());

           // Adds jQuery event handlers to the newly generated table of contents
            self._setEventHandlers();

            // Binding to the Window load event to make sure the correct scrollTop is calculated
            $(window).load(function() {

                // Sets the active TOC item
                self._setActiveElement(true);

                // Once all animations on the page are complete, this callback function will be called
                $("html, body").promise().done(function() {

                    setTimeout(function() {

                        self.extendPageScroll = false;

                    },0);

                });

            });

        },

        // _generateToc
        _generateToc: function() {

            // Stores the plugin context in the self variable
            var self = this,
