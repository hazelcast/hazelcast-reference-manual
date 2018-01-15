
### Split-Brain Protection for IList & TransactionalList

IList & TransactionalList can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

IList:

- WRITE, READ_WRITE:
    - `add`
    - `addAll`
    - `clear`
    - `remove`
    - `removeAll`
    - `set`
- READ, READ_WRITE:
    - `add`
    - `contains`
    - `containsAll`
    - `get`
    - `indexOf`
    - `isEmpty`
    - `iterator`
    - `lastIndexOf`
    - `listIterator`
    - `size`
    - `subList`
    - `toArray`


TransactionalList:

- WRITE, READ_WRITE:
    - `add`
    - `remove`
- READ, READ_WRITE:
    - `size`
