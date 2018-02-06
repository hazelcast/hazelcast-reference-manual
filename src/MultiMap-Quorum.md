
### Split-Brain Protection for MultiMap & TransactionalMultiMap

MultiMap & TransactionalMultiMap can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

MultiMap:

- WRITE, READ_WRITE:
    - `clear`
    - `forceUnlock`
    - `lock`
    - `put`
    - `remove`
    - `tryLock`
    - `unlock`
- READ, READ_WRITE:
    - `containsEntry`
    - `containsKey`
    - `containsValue`
    - `entrySet`
    - `get`
    - `isLocked`
    - `keySet`
    - `localKeySet`
    - `size`
    - `valueCount`
    - `values`


TransactionalMultiMap:

- WRITE, READ_WRITE:
    - `put`
    - `remove`
- READ, READ_WRITE:
    - `size`
    - `get`
    - `valueCount`
