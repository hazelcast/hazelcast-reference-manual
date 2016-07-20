

## Durable Executor Service

Hazelcast's durable executor service is a data structure which is able to store a task both on the executing Hazelcast member and its backup member(s) if configured. By this way, you do not lose any tasks if a member goes down or any results if the submitter (member or client) goes down while executing the task. When using the durable executor service you can either submit or execute a task randomly or on the owner of a provided key. Note that in [executor service](#executor-service), you can submit or execute tasks to/on the selected member(s).

Processing of the tasks when using durable executor service involves two invocations:

1. Sending the task to primary Hazelcast member (primary partition) and to its backups, if configured.
2. Retrieving the result of the task.

As you may already know, Hazelcast's executor service returns a `future` representing the task to the user. With the above two-invocations approach, it is guaranteed that the task is executed before the `future` returns and you can track the response of a submitted task with a unique ID. Hazelcast stores the task on both primary and backup members, and start the execution also. 


With the first invocation, a [Ringbuffer](#ringbuffer) stores the task and a generated sequence for the task is returned to the caller as a result. In addition to the storing, the task is executed on the local execution service for the primary member. By this way, the task is now resilient to member failures and you are able to track the task with its ID.

After the first invocation has completed and the sequence of task is returned, second invocation starts to retrieve the result of task with that sequence. This retrieval waits in the waiting operations queue until notified, or it runs immediately if the result is already available.

When task execution is completed, Ringbuffer replaces the task with the result for the given task sequence. This replacement notifies the waiting operations queue.
 

![image](images/NoteSmall.jpg) ***NOTE:*** *.*

 