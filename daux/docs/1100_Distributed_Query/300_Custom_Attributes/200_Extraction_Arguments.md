

A `ValueExtractor` may use a custom argument if it is specified in the query.
The custom argument may be passed within the square brackets located after the name of the custom attribute,
e.g., `customAttribute[argument]`.

Let's have a look at the following query: `currency[incoming] == EUR`
The `currency` is a custom attribute that uses a `com.test.CurrencyExtractor` for extraction.

The string `incoming` is an argument that will be passed to the `ArgumentParser` during the extraction.
The parser will parse the string according to the parser's custom logic and it will return a parsed object.
The parsed object may be a single object, array, collection, or any arbitrary object.
It is up to the `ValueExtractor`'s implementor to understand the semantics of the parsed argument object.

For now it is **not** possible to register a custom `ArgumentParser`, thus a default parser is used.
It follows a `pass-through` semantic, which means that the string located in the square brackets is passed "as is" to
the `ValueExtractor.extract()` method.

Please note that using square brackets within the argument string is not allowed.

