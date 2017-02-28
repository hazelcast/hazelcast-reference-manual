
Expiration means the eviction of expired records. A record is expired: 

- if it is not touched (accessed/read) for `max-idle-seconds`
- `time-to-live-seconds` passed since it is put to Near Cache

The actual expiration is performed in two cases:

- When a record is accessed: it is checked if the record is expired or not. If it is expired, it is evicted and `null` is returned as the value to the caller.
- In the background: there is an expiration task that periodically (currently 5 seconds) scans records and evicts the expired records.

