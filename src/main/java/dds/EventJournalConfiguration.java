import com.hazelcast.config.Config;
import com.hazelcast.config.EventJournalConfig;

public class EventJournalConfiguration {
    public static void main(String[] args) throws Exception{
        //tag::ejc[]
        EventJournalConfig eventJournalMapConfig = new EventJournalConfig()
                .setEnabled(true)
                .setCapacity(5000)
                .setTimeToLiveSeconds(20);

        EventJournalConfig eventJournalCacheConfig = new EventJournalConfig()
                .setEnabled(true)
                .setCapacity(10000)
                .setTimeToLiveSeconds(0);

        Config config = new Config();
        config.getMapConfig("myMap").setEventJournalConfig(eventJournalMapConfig);
        config.getCacheConfig("myCache").setEventJournalConfig(eventJournalCacheConfig);
        
//end::ejc[]
    }
}
