import java.io.Serializable;

public class Customer1 implements Serializable {

    private final long id;

    Customer1(long id) {
        this.id = id;
    }

    long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Customer1{"
                + "id=" + id
                + '}';
    }
}