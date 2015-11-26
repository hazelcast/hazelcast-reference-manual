
### IExecutor Threading

Executor threading is straight forward. When a task is received to be executed on Executor E, then E will have its
own `ThreadPoolExecutor` instance and the work is placed in the work queue of this executor. Thus, Executors are fully isolated, but still share the same underlying hardware - most importantly the CPUs. 

You can configure the IExecutor using the `ExecutorConfig` (programmatic configuration) or using `<executor>` (declarative configuration). Please also see the [Configuring Executor Threads section](#configuring-executor-threads).

