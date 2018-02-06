

## Cardinality Estimator Service

Hazelcast's cardinality estimator service is a data structure which implements Flajolet's HyperLogLog algorithm for estimating cardinalities of unique objects in theoretically huge data sets.
The implementation offered by Hazelcast includes improvements from Google's version of the algorithm, i.e., HyperLogLog++.

The cardinality estimator service does not provide any ways to configure its properties, but rather uses some well tested defaults.

- `P`: Precision - 14, using the 14 LSB of the hash for the index.
- `M`: 2 ^ P = 16384 (16K) registers
- `P'`: Sparse Precision - 25
- `Durability`: How many backups for each estimator, default 2

![image](images/NoteSmall.jpg)***NOTE:*** *It is important to understand that this data structure is not 100% accurate, it is used to provide estimates. The error rate is typically a result of `1.04/sqrt(M)` which in our implementation is around 0.81% for high percentiles.*

The memory consumption of this data structure is close to 16K despite the size of elements in the source data set or stream.

There are two phases in using the cardinality estimator.

1. Add objects to the instance of the estimator, e.g., for IPs `estimator.add("0.0.0.0.")`.
The provided object is first serialized, and then the byte array is used to generate a hash for that object.<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Objects must be serializable in a form that Hazelcast understands.*

2. Compute the estimate of the set so far `estimator.estimate()`.

Please see the [cardinality estimator Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/cardinality/CardinalityEstimator.html) for more information on its API.

The following is an example code.

```
HazelcastInstance hz = Hazelcast.newHazelcastInstance();
CardinalityEstimator visitorsEstimator = hz.getCardinalityEstimator("visitors");

InputStreamReader isr = new InputStreamReader(Member.class.getResourceAsStream("visitors.txt"));
        BufferedReader br = new BufferedReader(isr);
        try {
            String visitor = br.readLine();
            while (visitor != null) {
                visitorsEstimator.add(visitor);
                visitor = br.readLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            closeResource(br);
            closeResource(isr);
        }

        System.out.printf("Estimated unique visitors seen so far: %d%n", visitorsEstimator.estimate());

        Hazelcast.shutdownAll();
```
