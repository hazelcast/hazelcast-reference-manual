Ringbuffer can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](/2600_Network_Partitioning/100_Split-Brain_Protection.md)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `add`
    - `addAllAsync`
    - `addAsync`
- READ, READ_WRITE:
    - `capacity`
    - `headSequence`
    - `readManyAsync`
    - `readOne`
    - `remainingCapacity`
    - `size`
    - `tailSequence`