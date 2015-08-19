


### Enabling the Service Class

Now, we need to enable the class `CounterService`. The declarative way of doing this is shown below.

```xml
<network>
   <join><multicast enabled="true"/> </join>
</network>
<services>
   <service enabled="true">
      <name>CounterService</name>
      <class-name>CounterService</class-name>
   </service>
</services>
```

The `CounterService` is declared within the `services` configuration element. 

- Set the `enabled` attribute to `true` to enable the service.
- Set the `name` attribute to the name of the service. It should be a unique name (`CounterService` in our case) since it will be looked up when a remote call is made. Note that the value of this attribute will be sent at each request, and that a longer `name` value means more data (de)serialization. A good practice is to give an understandable name with the shortest possible length.
- Set the `class-name` attribute to the class name of the service (`CounterService` in our case). The class should have a *no-arg* constructor. Otherwise, the object cannot be initialized.

Note that multicast is enabled as the join mechanism. In the later sections for the `CounterService` example, we will see why.


<br></br>

***RELATED INFORMATION***


*Please refer to the [Services Configuration section](#services-configuration) for a full description of Hazelcast SPI configuration.*


