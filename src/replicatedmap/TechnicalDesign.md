
### Configuration Design for Replicated Map

There are several technical design decisions you should consider when you configure a replicated map.

**Initial provisioning**

If a new member joins, there are two ways you can handle the initial provisioning that is executed to replicate all existing
values to the new member. Each involves how you configure for async fill up.

First, you can configure async fill up to true, which does not block reads while the fill up operation is underway. That way,
you have immediate access on the new member, but it will take time until all values are eventually accessible. Not yet
replicated values are returned as non-existing (null).

Second, you can configure for a synchronous initial fill up (by configuring the async fill up to false), which blocks every read or write access to the map until the
fill up operation is finished. Use this with caution since it might block your application from operating.
