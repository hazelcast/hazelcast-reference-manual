import java.io.Serializable;

public class Customer implements Serializable {

    private final String id;

    Customer(String id) {
        this.id = id;
    }

    String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Customer{"
                + "id=" + id
                + '}';
    }
}