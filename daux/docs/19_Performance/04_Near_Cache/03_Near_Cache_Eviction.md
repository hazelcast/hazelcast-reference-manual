
In the scope of Near Cache, eviction means evicting (clearing) the entries selected according to the given `eviction-policy` when the specified `max-size-policy` has been reached.

The `max-size-policy` defines the state when the Near Cache is full and determines whether the eviction should be triggered. The `size` is either interpreted as entry count, memory size or percentage, depending on the chosen policy.

Once the eviction is triggered the configured `eviction-policy` determines which, if any, entries must be evicted.

