
### Discovery SPI Overview

The Hazelcast Discovery SPI consists of multiple interfaces and abstract classes. In the following section we will have a quick look at all of them and shortly introduce the idea and use behind them. The example will follow up in the next sub-section.

#### DiscoveryStrategy

The `com.hazelcast.spi.discovery.DiscoveryStrategy` interface is the main entry point for vendors to implement their corresponding member discovery strategies. The main purpose is to return discovered members on request. It also offers light lifecycle capabilities for setup and teardown logic (for example opening or closing sockets or REST API clients).

`DiscoveryStrategy`s are also meant to do automatic registration / de-registration on service discovery systems if necessary. The provided `DiscoveryNode` passed to the factory method can be used to retrieve local addresses and ports, as well as metadata.
 
#### AbstractDiscoveryStrategy  

The `com.hazelcast.spi.discovery.AbstractDiscoveryStrategy` is a convenience abstract class meant to ease the implementation of strategies. It basically provides additional support for reading / resolving configuration properties and empty implementations of lifecycle methods if unnecessary. 
 
#### DiscoveryStrategyFactory

The `com.hazelcast.spi.discovery.DiscoveryStrategyFactory` interface describes the factory contract that is used to create a certain `DiscoveryStrategy`. `DiscoveryStrategyFactory`s are registered automatically at startup of a Hazelcast member or client whenever found in the classpath. For automatic discovery, factories need to announce themselves as SPI services using a resource file according to the [Java Service Provider Interface](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html). The service registration file must be part of the JAR file and located under `META-INF/services/com.hazelcast.spi.discovery.DiscoveryStrategyFactory` and consist of a line with the full canonical class name of the `DiscoveryStrategy` per provided strategy implementation.

#### DiscoveryNode and SimpleDiscoveryNode
 
The `com.hazelcast.spi.discovery.DiscoveryNode` abstract class describes a member in the Discovery SPI. It is used for multiple purposes, as it will be returned from strategies for discovered members. It is also passed to `DiscoveryStrategyFactory`s factory method to define the local member itself if created on a Hazelcast member, otherwise (on Hazelcast clients) null will be passed.

`com.hazelcast.spi.discovery.SimpleDiscoveryNode` is provided by Hazelcast as a default implementation of the `DiscoveryNode`. It is meant for convenience use of the Discovery SPI and can be returned from vendor implementations if no special needs are required. 

#### NodeFilter

A `com.hazelcast.spi.discovery.NodeFilter` can be configured by the user before startup and can implement logic to do additional filtering of members. This might be necessary if query languages for discovery strategies are not expressive enough to describe members or to overcome inefficiencies of strategy implementations.
 
![image](images/NoteSmall.jpg) ***NOTE:*** *The `DiscoveryStrategy` vendor does not need to take possibly configured filters into account as their use is transparent to the strategies.*

#### DiscoveryService

A `com.hazelcast.spi.discovery.integration.DiscoveryService` is part of the integration domain. As part of that it is not required to be implemented by `DiscoveryStrategy` vendors as it is meant to support the Discovery SPI in situations where integrators integrate Hazelcast into their own systems or frameworks. Certain needs might be necessary as part of the classloading or [Java Service Provider Interface](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html) lookup.

#### DiscoveryServiceProvider

The `com.hazelcast.spi.discovery.integration.DiscoveryServiceProvider` is used to provide a `DiscoveryService` to the Hazelcast discovery subsystem. The provider is configured using the Hazelcast configuration API.

#### DiscoveryServiceSettings

A `com.hazelcast.spi.discovery.integration.DiscoveryServiceSettings` instance is passed to the `DiscoveryServiceProvider` at creation time to configure the `DiscoveryService`.

#### DiscoveryMode

The `com.hazelcast.spi.discovery.integration.DiscoveryMode` enum is used to tell a created `DiscoveryService` if running on a Hazelcast member or client and to change behavior accordingly.   
