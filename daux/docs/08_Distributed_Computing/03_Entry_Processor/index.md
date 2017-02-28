
Hazelcast supports entry processing. An entry processor is a function that executes your code on a map entry in an atomic way. 

An entry processor is a good option if you perform bulk processing on an `IMap`. Usually you perform a loop of keys-- executing `IMap.get(key)`, mutating the value, and finally putting the entry back in the map using `IMap.put(key,value)`.  If you perform this process from a client or from a member where the keys do not exist, you effectively perform two network hops for each update: the first to retrieve the data and the second to update the mutated value.

If you are doing the process described above, you should consider using entry processors. An entry processor executes a read and updates upon the member where the data resides.  This eliminates the costly network hops described above.

![image](../../images/NoteSmall.jpg) ***NOTE***: *Entry processor is meant to process a single entry per call. Processing multiple entries and data structures in an entry processor is not supported as it may result in deadlocks.*


