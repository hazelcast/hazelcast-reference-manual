import com.hazelcast.config.ConfigurationException;
import com.hazelcast.config.matcher.MatchingPointConfigPatternMatcher;

// A custom config pattern matcher which throws exception(instead of using `default` config) when config is not found
// MatchingPointConfigPatternMatcher is the default one used by Hazelcast

//tag::patternmatcher[]
class ExampleConfigPatternMatcher extends MatchingPointConfigPatternMatcher {

    @Override
    public String matches(Iterable<String> configPatterns, String itemName) throws ConfigurationException {
        String matches = super.matches(configPatterns, itemName);
        if (matches == null) throw new ConfigurationException("No config found for " + itemName);
        return matches;
      //end::patternmatcher[]        
    }
}