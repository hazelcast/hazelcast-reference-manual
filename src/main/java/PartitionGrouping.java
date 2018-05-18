import com.hazelcast.config.Config;
import com.hazelcast.config.MemberGroupConfig;
import com.hazelcast.config.PartitionGroupConfig;


public class PartitionGrouping {
    public static void main(String[] args) {
      //tag::partitiongrouping[]
        Config config = new Config();
        PartitionGroupConfig partitionGroupConfig = config.getPartitionGroupConfig();
        partitionGroupConfig.setEnabled( true )
                .setGroupType( PartitionGroupConfig.MemberGroupType.CUSTOM );

        MemberGroupConfig memberGroupConfig = new MemberGroupConfig();
        memberGroupConfig.addInterface( "10.10.0.*" )
                .addInterface( "10.10.3.*" ).addInterface("10.10.5.*" );

        MemberGroupConfig memberGroupConfig2 = new MemberGroupConfig();
        memberGroupConfig2.addInterface( "10.10.10.10-100" )
                .addInterface( "10.10.1.*").addInterface( "10.10.2.*" );

        partitionGroupConfig.addMemberGroupConfig( memberGroupConfig );
        partitionGroupConfig.addMemberGroupConfig( memberGroupConfig2 );
      //end::partitiongrouping[]
    }
}
