
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

