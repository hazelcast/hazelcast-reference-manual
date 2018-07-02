import java.util.Collection;

//tag::userdao[]
public interface UserDao {

    User findUserById(int userId);
    boolean storeUser(int userId, User user);
    boolean removeUser(int userId);
    Collection<Integer> allUserIds();
}
//end::userdao[]