

## Durable Executor Service

Hazelcast's durable executor service is a data structure which is able to store a task both on the executing Hazelcast member and its backup member(s) if configured. By this way, you do not lose any tasks if a member goes down or any results if the submitter (member or client) goes down while executing the task. When using the durable executor service you can either submit or execute a task randomly or on the owner of a provided key. Note that in [executor service](#executor-service), you can submit or execute tasks to/on the selected member(s).

Processing of the tasks when using durable executor service involves two invocations:

1. Sending the task to primary Hazelcast member (primary partition) and to its backups, if configured.
2. Retrieving the result of the task.

With the first invocation, a [Ringbuffer](#ringbuffer) stores the task and a generated sequence for the task is returned to the caller as a result. In addition to the storing, the task is executed on the local execution service for the primary member. 

After the first invocation has completed and the sequence of task is returned, second invocation starts to retrieve the result of task with that sequence. This retrieval waits in the waiting operations queue until notified, or it runs immediately if the result is already available.

When task execution is completed, Ringbuffer replaces the task with the result for the given task sequence. This replacement notifies the waiting operations queue.
Reasoning behind the 2 invocations is that, we want to guarantee the execution of the task before we return the future(and the taskId with it) to the user. By making a synchronous invocation first, we store the task on both primary and backup, and start the execution also. After this invocation, the task will be resilient to node failures and user will have the ability to track the task with the taskId.
When a submitter member/client restarts, it can track the submitted tasks via retrieveResult(taskId) method. In order to do this user should persist the taskId. We return a Future representing the pending completion of the task. User will get either the result of the task if it is still available(not overwritten) in the ringbuffer, otherwise StaleTaskIdException which wrapped in an ExecutionException



![image](images/NoteSmall.jpg) ***NOTE:*** *.*


