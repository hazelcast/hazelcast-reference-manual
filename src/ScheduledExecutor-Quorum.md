
### Split-Brain Protection for IScheduledExecutorService

IScheduledExecutorService can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `schedule`
    - `scheduleAtFixedRate`
    - `scheduleOnAllMembers`
    - `scheduleOnAllMembersAtFixedRate`
    - `scheduleOnKeyOwner`
    - `scheduleOnKeyOwnerAtFixedRate`
    - `scheduleOnMember`
    - `scheduleOnMemberAtFixedRate`
    - `scheduleOnMembers`
    - `scheduleOnMembersAtFixedRate`
    - `shutdown`
- READ, READ_WRITE:
    - `getAllScheduledFutures`
