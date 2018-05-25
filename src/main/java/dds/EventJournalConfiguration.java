import com.hazelcast.config.Config;
import com.hazelcast.config.EventJournalConfig;


public class EventJournalConfiguration {
    public static void main(String[] args) throws Exception{
//tag::ejc[]
        EventJournalConfig myMapJournalConfig = new EventJournalConfig()
                .setMapName("myMap")
                .setEnabled(true)
                .setCapacity(5000)
                .setTimeToLiveSeconds(20);

        EventJournalConfig myCacheJournalConfig = new EventJournalConfig()
                .setMapName("myCache")
                .setEnabled(true)
                .setCapacity(10000)
                .setTimeToLiveSeconds(0);

        Config config = new Config();
        config.addEventJournalConfig(myMapJournalConfig);
        config.addEventJournalConfig(myCacheJournalConfig);
//end::ejc[]
    }
}
