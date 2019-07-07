import com.hazelcast.map.EntryStore;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.lang.String.format;

//tag::personms[]
public class PersonEntryStore implements EntryStore<Long, Person> {

    private final Connection con;
    private final PreparedStatement allKeysStatement;

    public PersonEntryStore() {
        try {
            con = DriverManager.getConnection("jdbc:hsqldb:mydatabase", "SA", "");
            con.createStatement().executeUpdate(
                    "create table if not exists person (id bigint not null, name varchar(45), expiration-date bigint, primary key (id))");
            allKeysStatement = con.prepareStatement("select id from person");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public synchronized void delete(Long key) {
        System.out.println("Delete:" + key);
        try {
            con.createStatement().executeUpdate(
                    format("delete from person where id = %s", key));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public synchronized void store(Long key, MetadataAwareValue<Person> value) {
        try {
            con.createStatement().executeUpdate(
                    format("insert into person values(%s,'%s', %d)", key, value.getValue().getName(), value.getExpirationTime()));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void storeAll(Map<Long, MetadataAwareValue<Person>> map) {
        for (Map.Entry<Long, MetadataAwareValue<Person>> entry : map.entrySet()) {
            store(entry.getKey(), entry.getValue());
        }
    }

    @Override
    public synchronized void deleteAll(Collection<Long> keys) {
        for (Long key : keys) {
            delete(key);
        }
    }

    @Override
    public synchronized MetadataAwareValue<Person> load(Long key) {
        try {
            ResultSet resultSet = con.createStatement().executeQuery(
                    format("select name,expiration-date from person where id =%s", key));
            try {
                if (!resultSet.next()) {
                    return null;
                }
                String name = resultSet.getString(1);
                Long expirationDate = resultSet.getLong(2);
                return new MetadataAwareValue<>(new Person(key, name), expirationDate);
            } finally {
                resultSet.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public synchronized Map<Long, MetadataAwareValue<Person>> loadAll(Collection<Long> keys) {
        Map<Long, MetadataAwareValue<Person>> result = new HashMap<>();
        for (Long key : keys) {
            result.put(key, load(key));
        }
        return result;
    }

    public Iterable<Long> loadAllKeys() {
        return new StatementIterable<Long>(allKeysStatement);
    }
}
//end::personms[]
