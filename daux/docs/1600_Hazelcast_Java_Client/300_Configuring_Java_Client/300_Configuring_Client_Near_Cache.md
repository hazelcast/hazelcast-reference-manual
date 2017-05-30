
The Hazelcast distributed map supports a local Near Cache for remotely stored entries to increase the performance of local read operations. Since the client always requests data from the cluster members, it can be helpful in some use cases to configure a Near Cache on the client side. Please refer to the [Near Cache section](/19_Performance/04_Near_Cache) for a detailed explanation of the Near Cache feature and its configuration.

