
It is possible to define a custom attribute that may be referenced in predicates, queries and indexes.

A custom attribute is a "synthetic" attribute that does not exist as a `field` or a `getter` in the object that it is extracted from.
Thus, it is necessary to define the policy on how the attribute is supposed to be extracted.
Currently the only way to extract a custom attribute is to implement a `com.hazelcast.query.extractor.ValueExtractor`
that encompasses the extraction logic.

Custom Attributes are compatible with all Hazelcast serialization methods, including the Portable serialization.

