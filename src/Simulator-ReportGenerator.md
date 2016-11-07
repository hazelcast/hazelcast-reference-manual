
## Report Generator

Once a benchmark has been executed, an HTML report can be generated using the `benchmark-generator` tool. This tool requires Gnuplot 4+ to be installed for generating the diagrams.

Assume that a benchmark has been executed and the directory `2016-08-02__22_08_09` has been created. To create a report for that benchmark, you can use the following command:

```
benchmark-generator mybenchmark 2016-08-02__22_08_09
```

The name `mybenchmark` is output directory's name. The generated report contains detailed throughput and latency information. If `dstats` information is available, it shows detailed information about resource utilization such as network, CPU, and memory.

The `benchmark-generator` tool is also able to make comparisons between two or more benchmarks. You can list the benchmark directories to be compared as shown below:

```
benchmark-generator mybenchmark 2016-08-02__22_08_09 2016-08-02__22_18_21
```