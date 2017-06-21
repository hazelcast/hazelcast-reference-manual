
You can give a custom strategy to match an item name to a configuration pattern. By default Hazelcast uses a simplified wildcard matching. See [Using Wildcards section](#using-wildcards) for this.
A custom configuration pattern matcher can be given by using either member or client `config` objects. Please see the following example snippet:

```java
// Setting a custom config pattern matcher via member config object
Config config = new Config();
config.setConfigPatternMatcher(new ExampleConfigPatternMatcher());

// A custom config pattern matcher which throws exception(instead of using `default` config) when config is not found
// MatchingPointConfigPatternMatcher is the default one used by Hazelcast
class ExampleConfigPatternMatcher extends MatchingPointConfigPatternMatcher { 

@Override 
public String matches(Iterable<String> configPatterns, String itemName) throws ConfigurationException {
 String matches = super.matches(configPatterns, itemName);
 if (matches == null) { 
       throw new ConfigurationException("No config found for " + itemName); 
 }
  return matches; 
} 
}
```
