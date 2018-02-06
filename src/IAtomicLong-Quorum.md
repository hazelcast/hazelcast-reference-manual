
### Split-Brain Protection for IAtomicLong

IAtomicLong can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `addAndGet`
    - `addAndGetAsync`
    - `alter`
    - `alterAndGet`
    - `alterAndGetAsync`
    - `alterAsync`
    - `apply`
    - `applyAsync`
    - `compareAndSet`
    - `compareAndSetAsync`
    - `decrementAndGet`
    - `decrementAndGetAsync`
    - `getAndAdd`
    - `getAndAddAsync`
    - `getAndAlter`
    - `getAndAlterAsync`
    - `getAndIncrement`
    - `getAndIncrementAsync`
    - `getAndSet`
    - `getAndSetAsync`
    - `incrementAndGet`
    - `incrementAndGetAsync`
    - `set`
    - `setAsync`
- READ, READ_WRITE:
    - `get`
    - `getAsync`
