import javax.cache.configuration.Factory;
import javax.cache.event.CacheEntryListener;

//tag::ucelf[]
public class UserCacheEntryListenerFactory implements Factory<CacheEntryListener<Integer, User>> {

    @Override
    public CacheEntryListener<Integer, User> create() {
        // just create a new listener instance
        return new UserCacheEntryListener();
    }
}
//end::ucelf[]