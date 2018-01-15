
### Split-Brain Protection for IAtomicReference

IAtomicReference can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `alter`
    - `alterAndGet`
    - `alterAndGetAsync`
    - `alterAsync`
    - `apply`
    - `applyAsync`
    - `clear`
    - `clearAsync`
    - `compareAndSet`
    - `compareAndSetAsync`
    - `getAndAlter`
    - `getAndAlterAsync`
    - `getAndSet`
    - `getAndSetAsync`
    - `set`
    - `setAndGet`
    - `setAsync`
- READ, READ_WRITE:
    - `contains`
    - `containsAsync`
    - `get`
    - `getAsync`
    - `isNull`
    - `isNullAsync`
