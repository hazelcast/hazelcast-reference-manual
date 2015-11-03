# OSGI

This chapter explains how is Hazelcast supported on OSGI environments.

## OSGI Support

- Hazelcast bundles provide OSGI services so users can manage (create, access, shutdown) Hazelcast instances through this service on OSGI environment. By `hazelcast.osgi.start` property is enabled, when an Hazelcast OSGi service is activated, a default Hazelcast instance created automatically.

- Created Hazelcast instances can be served as OSGI service to be accessed by other bundles. Registering created Hazelcast instances behaviour is enabled by default and can be disabled by `hazelcast.osgi.register.disabled` property.

- Each Hazelcast bundle provide a different OSGI service and their instances can be grouped (clustered) together for preventing possible compatibility issues between different Hazelcast versions/bundles. This grouping behaviour is enabled by default and can be disabled by `hazelcast.osgi.grouping.disabled` property.

- Hazelcast OSGI service's lifecycle (and so also the owned/created instances's lifecycles) are same with the owner Hazelcast bundles. When the bundle is stopped (deactivated), owned service and Hazelcast instances are also deactivated/shutdown and deregistered automatically. Then when the bundle is activated again, its service is registered again.

- Hazelcast Enterprise jar is also an OSGI bundle like Hazelcast OSS jar.

## API

**`HazelcastOSGiService`:** Contract point for Hazelcast services on top of OSGI. Registered to `org.osgi.framework.BundleContext` as OSGI service so other bundles can access and use Hazelcast on OSGI environment through this service.

**`HazelcastOSGiInstance`:** Contract point for `HazelcastInstance` implementations based on OSGI service. `HazelcastOSGiService` provides proxy Hazelcast instances typed `HazelcastOSGiInstance` which is a subtype of `HazelcastInstance` and these instances delegate all calls to the underlying `HazelcastInstance`.

## Configuration

There are 3 configurations to be used by `HazelcastOSGiService`:

- **`hazelcast.osgi.start`:** If this property is enabled (disabled by default), when an `HazelcastOSGiService` is activated, a default Hazelcast instance created automatically.
- **`hazelcast.osgi.register.disabled`:** If this property is not enabled (disabled by default), when a Hazelcast instance is created by `HazelcastOSGiService`, the created `HazelcastOSGiInstance` is registered automatically as OSGI service with type of `HazelcastOSGiInstance` and deregistered automatically when the created `HazelcastOSGiInstance` is shutdown.
- **`hazelcast.osgi.grouping.disabled`:** If this property is not enabled (disabled by default), every created `HazelcastOSGiInstance` are grouped as their owner `HazelcastOSGiService` and don't join each other unless no group name is specified in the `GroupConfig` of `Config`.

## Design

`HazelcastOSGiService` is specific to each Hazelcast bundle. This means that every Hazelcast bundle has its own `HazelcastOSGiService` instance.
Every Hazelcast bundle registers their `HazelcastOSGiService` instances via Hazelcast Bundle Activator (`com.hazelcast.osgi.impl.Activator`) while they are being started and deregisters their `HazelcastOSGiService` instances while they are being stopped.

Each `HazelcastOSGiService` instance has different service ID as combination of Hazelcast version and artifact type (`OSS` or `EE`) such as `3.6#OSS`, `3.6#EE`, `3.7#OSS`, `3.7#EE`, etc ... 

`HazelcastOSGiService` instance lifecycle is the same with the owner Hazelcast bundle. This means that when the owner bundle is deactivated, owned `HazelcastOSGiService` instance is deactivated and all active Hazelcast instances, created and served by that `HazelcastOSGiService` instance, are shutdown and deregistered. Then when the Hazelcast bundle is activated again, its `HazelcastOSGiService` instance is registered again as OSGI service.

![](images/osgi_design.png)

## How to Use?

### Getting Hazelcast OSGI Service instances

Users can access all `HazelcastOSGiService` instances through `org.osgi.framework.BundleContext` for each Hazelcast bundle as follows:

```java
for (ServiceReference serviceRef : context.getServiceReferences(HazelcastOSGiService.class.getName(), null)) {
    HazelcastOSGiService service = (HazelcastOSGiService) context.getService(serviceRef);
    String serviceId = service.getId();
    ...
} 
```
 
### Managing and using Hazelcast instances

`HazelcastOSGiService` instance can be used to create and shutdown Hazelcast instances on OSGI environments. The created Hazelcast instances are `HazelcastOSGiInstance` typed (which is sub-type of `HazelcastInstance`) and just proxy to underlying Hazelcast instance. There are several methods in `HazelcastOSGiService` for using Hazelcast instances on OSGI environments:

```java
// Get the default Hazelcast instance owned by `hazelcastOsgiService`
// Returns null if `HAZELCAST_OSGI_START` is not enabled
HazelcastOSGiInstance defaultInstance = hazelcastOsgiService.getDefaultHazelcastInstance();
 
 
// Creates a new Hazelcast instance with default configurations as owned by `hazelcastOsgiService`
HazelcastOSGiInstance newInstance1 = hazelcastOsgiService.newHazelcastInstance();
 
 
// Creates a new Hazelcast instance with specified configuration as owned by `hazelcastOsgiService`
Config config = new Config();
config.setInstanceName("OSGI-Instance");
...
HazelcastOSGiInstance newInstance2 = hazelcastOsgiService.newHazelcastInstance(config);
  
// Gets the Hazelcast instance with name `OSGI-Instance` which is `newInstance2` created below
HazelcastOSGiInstance instance = hazelcastOsgiService.getHazelcastInstanceByName("OSGI-Instance");
  
// Shuts down the Hazelcast instance with name `OSGI-Instance` which is `newInstance2`
hazelcastOsgiService.shutdownHazelcastInstance(instance);
  
// Print all active Hazelcast instances owned by `hazelcastOsgiService`
for (HazelcastOSGiInstance instance : hazelcastOsgiService.getAllHazelcastInstances()) {
    System.out.println(instance);
}
  
// Shuts down all Hazelcast instances owned by `hazelcastOsgiService`
hazelcastOsgiService.shutdownAll();
```
