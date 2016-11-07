
## Report generator

Once a benchmark has been executed, a HTML report can be generated using the 'benchmark-generator'. This tool requires Gnuplot 4+ to be installed for generating the diagrams.

For example if a benchmark has been executed and the directory '2016-08-02__22_08_09' has been created, to create a report for that benchmark:

```
benchmark-generator mybenchmark 2016-08-02__22_08_09
```

The 'mybenchmark' is the name of the outout directory. The generated report contains detailed throughput and latency information, and if dstats information is available on the worker machines, it will show detailed information about resource utilitization like network, cpu, memory etc.

The benchmark-generator can also make comparison between 2 or more benchmarks by addig a list of benchmark directories to compare:

```
benchmark-generator mybenchmark 2016-08-02__22_08_09 2016-08-02__22_18_21
```
