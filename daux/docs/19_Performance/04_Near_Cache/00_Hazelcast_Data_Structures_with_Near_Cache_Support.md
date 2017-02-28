
The following matrix shows the Hazelcast data structures with Near Cache support. Please have a look at the next section for a detailed explanation of `cache-local-entries`, `local-update-policy` and `preloader`.

| Data structure          | Near Cache Support | `cache-local-entries` | `local-update-policy` | `preloader` |
|:------------------------|:-------------------|:----------------------|:----------------------|:------------|
| IMap member             | yes                | yes                   | no                    | no          |
| IMap client             | yes                | no                    | no                    | yes         |
| JCache member           | no                 | no                    | no                    | no          |
| JCache client           | yes                | no                    | yes                   | yes         |
| ReplicatedMap member    | no                 | no                    | no                    | no          |
| ReplicatedMap client    | yes                | no                    | no                    | no          |
| TransactionalMap member | limited            | no                    | no                    | no          |
| TransactionalMap client | no                 | no                    | no                    | no          |

![image](../../images/NoteSmall.jpg) ***NOTE:*** *Even though lite members do not store any data for Hazelcast data structures, you can enable Near Cache on lite members for faster reads.*

