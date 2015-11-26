
## Understanding Partition Recreation

If a MapStore was in use, those lost partitions would be reloaded from some database, making each mini-cluster complete.
Each mini-cluster will then recreate the missing primary partitions and continue to store data in them, including backups on the other nodes.

