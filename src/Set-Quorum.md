
### Split-Brain Protection for ISet & TransactionalSet

ISet & TransactionalSet can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

ISet:

- WRITE, READ_WRITE:
    - `add`
    - `addAll`
    - `clear`
    - `remove`
    - `removeAll`
- READ, READ_WRITE:
    - `contains`
    - `containsAll`
    - `isEmpty`
    - `iterator`
    - `size`
    - `toArray`


TransactionalSet:

- WRITE, READ_WRITE:
    - `add`
    - `remove`
- READ, READ_WRITE:
    - `size`
