import com.hazelcast.config.InvalidConfigurationException;
import com.hazelcast.config.matcher.MatchingPointConfigPatternMatcher;

//tag::patternmatcher[]
class ExampleConfigPatternMatcher extends MatchingPointConfigPatternMatcher {

    @Override
    public String matches(Iterable<String> configPatterns, String itemName) throws InvalidConfigurationException {
        String matches = super.matches(configPatterns, itemName);
        if (matches == null) throw new InvalidConfigurationException("No config found for " + itemName);
        return matches;
    }
}
//end::patternmatcher[]