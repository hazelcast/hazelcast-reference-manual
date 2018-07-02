import java.io.Serializable;


class Supplement implements Serializable {

    private final String name;
    private final Integer price;

    Supplement(String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }
}