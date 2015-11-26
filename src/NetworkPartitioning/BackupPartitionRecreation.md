
## Understanding Backup Partition Creation

When primary partitions exist without a backup, a backup version problem will be detected and a backup partition will be created.
When backups exist without a primary, the backups will be promoted to primary partitions and new backups will be created with proper versioning.
At this time, both mini-clusters have repaired themselves with all 271 partitions with backups, and continue to handle traffic without any knowledge of each other.
Given that they have enough remaining memory (assumption), they are just smaller and can handle less throughput.

