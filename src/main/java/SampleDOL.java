
import com.hazelcast.config.Config;
import com.hazelcast.core.*;

import java.util.Collection;


public class SampleDOL implements DistributedObjectListener {

    public static void main(String[] args) {
      //tag::sampledol[]
        SampleDOL sample = new SampleDOL();
        Config config = new Config();

        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
        hazelcastInstance.addDistributedObjectListener(sample);

        Collection<DistributedObject> distributedObjects = hazelcastInstance.getDistributedObjects();
        for (DistributedObject distributedObject : distributedObjects) {
            System.out.println(distributedObject.getName());
        }
    }

    @Override
    public void distributedObjectCreated(DistributedObjectEvent event) {
        DistributedObject instance = event.getDistributedObject();
        System.out.println("Created " + instance.getName());
    }

    @Override
    public void distributedObjectDestroyed(DistributedObjectEvent event) {
        DistributedObject instance = event.getDistributedObject();
        System.out.println("Destroyed " + instance.getName());
    }
      //end::sampledol[]
}
