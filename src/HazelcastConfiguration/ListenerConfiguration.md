

## Listener Configurations

You can add or remove event listeners to/from the related object using the Hazelcast API.

The downside of attaching listeners using this API is the possibility of missing events between creation of the object and registering a listener. To overcome this race condition, Hazelcast lets you register listeners in configuration. You can register listeners using either declarative, programmatic, or Spring configuration.



### EntryListener for IMap

- Declarative Configuration

		```xml
		<map name="default">
		  ...
		  <entry-listeners>
		    <entry-listener include-value="true" local="false">
		        com.hazelcast.examples.EntryListener
		    </entry-listener>
		  </entry-listeners>
		</map>
```

- Programmatic Configuration

		```java
		mapConfig.addEntryListenerConfig(
		    new EntryListenerConfig( "com.hazelcast.examples.EntryListener", 
		                             false, false ) );
```

- Spring XML configuration

		```xml
		<hz:map name="default">
		  <hz:entry-listeners>
		    <hz:entry-listener include-value="true"
		         class-name="com.hazelcast.spring.DummyEntryListener"/>
		    <hz:entry-listener implementation="dummyEntryListener" local="true"/>
		  </hz:entry-listeners>
		</hz:map>
```

### EntryListener for MultiMap

- Declarative Configuration

		```xml
		<multimap name="default">
		  <value-collection-type>SET</value-collection-type>
    	    <entry-listeners>
              <entry-listener include-value="true" local="false">
                  com.hazelcast.examples.EntryListener
              </entry-listener>
		    </entry-listeners>
		</multimap>
```
- Programmatic Configuration

		```java
		multiMapConfig.addEntryListenerConfig(
		    new EntryListenerConfig( "com.hazelcast.examples.EntryListener",
		                             false, false ) );
```

- Spring XML configuration

		```xml
		<hz:multimap name="default" value-collection-type="LIST">
		  <hz:entry-listeners>
		    <hz:entry-listener include-value="true"
		         class-name="com.hazelcast.spring.DummyEntryListener"/>
		    <hz:entry-listener implementation="dummyEntryListener" local="true"/>
		  </hz:entry-listeners>
		</hz:multimap>
```



### ClientListener

- Declarative Configuration

		```xml
		<listeners>
		  <listener>com.hazelcast.examples.ClientListener</listener>
		</listeners>
```

- Programmatic Configuration

		```java
		topicConfig.addMessageListenerConfig(
		    new ListenerConfig( "com.hazelcast.examples.ClientListener" ) );
```

- Spring XML configuration

		```xml
		<hz:listeners>
		  <hz:listener class-name="com.hazelcast.spring.DummyClientListener"/>
		  <hz:listener implementation="dummyClientListener"/>
		</hz:listeners>
```
