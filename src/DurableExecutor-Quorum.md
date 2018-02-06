
### Split-Brain Protection for DurableExecutorService

DurableExecutorService can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `disposeResult`
    - `execute`
    - `executeOnKeyOwner`
    - `retrieveAndDisposeResult`
    - `shutdown`
    - `shutdownNow`
    - `submit`
    - `submitToKeyOwner`
- READ, READ_WRITE:
    - `retrieveResult`
