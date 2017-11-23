var $current = window.location.href;
var $https = $current.includes("https");
if ($https) {
	var $baseurl = "https://docs.hazelcast.org"
} else {
	var $baseurl = "http://docs.hazelcast.org"
}


// Docs index page
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html") {
	window.location = $baseurl + "/docs/latest/manual/html/index.html";
}


// Docs 'Preface' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#preface") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Hazelcast_IMDG_Editions.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-imdg-editions") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Hazelcast_IMDG_Editions.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-imdg-architecture") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Hazelcast_IMDG_Architecture.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-imdg-plugins") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Hazelcast_IMDG_Plugins.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#licensing") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Licensing_and_Trademarks.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#trademarks") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Licensing_and_Trademarks.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#customer-support") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Customer_Support.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#release-notes") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Release_Notes.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#contributing-to-hazelcast-imdg") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Contributing_to_Hazelcast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#partners") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Contributing_to_Hazelcast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#phone-home") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Phone_Home.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#typographical-conventions") {
	window.location = $baseurl + "/docs/latest/manual/html/Preface/Typographical_Conventions.html";
}


// Docs 'Document Revision History' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#document-revision-history") {
	window.location = $baseurl + "/docs/latest/manual/html/Document_Revision_History.html";
}


// Docs 'Getting Started' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-started") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Installing_Hazelcast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#installation") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Installation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-imdg") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Installation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-imdg-enterprise") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Installation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#setting-the-license-key") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Installation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#upgrading-from-3x") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Upgrading_From_3x.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#upgrading-from-2x") {
	window.location = $baseurl + "/docs/latest/manual/html-single/index.html#upgrading-from-2x";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#starting-the-member-and-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Starting_The_Member_And_Client.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-the-scripts-in-the-package") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Using_The_Scripts_In_The_Package.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#deploying-on-amazon-ec2") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Deployment_Options.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#deploying-on-microsoft-azure") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Deployment_Options.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#deploying-on-pivotal-cloud-foundry") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Deployment_Options.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#deploying-using-docker") {
	window.location = $baseurl + "/docs/latest/manual/html/Getting_Started/Deployment_Options.html";
}


// Docs 'Hazelcast Overview' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-overview") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Sharding_In_Hazelcast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sharding-in-hazelcast") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Sharding_In_Hazelcast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-topology") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Hazelcast_Topology.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#why-hazelcast") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Why_Hazelcast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#data-partitioning") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Data_Partitioning.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-the-data-is-partitioned") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Data_Partitioning.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#partition-table") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Data_Partitioning.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#repartitioning") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Data_Partitioning.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#use-cases") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Use_Cases.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#resources") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Overview/Resources.html";
}


// Docs 'Understanding Configuration' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-declaratively") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Configuring_Declaratively.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#composing-declarative-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Configuring_Declaratively.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-programmatically") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Configuring_Programmatically.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-with-system-properties") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Configuring_with_System_Properties.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-within-spring-context") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Configuring_within_Spring_Context.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#checking-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Checking_Configuration.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-wildcards") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Using_Wildcards.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-variables") {
	window.location = $baseurl + "/docs/latest/manual/html/Understanding_Configuration/Using_Variables.html";
}


// Docs 'Setting Up Clusters' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#setting-up-clusters") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-cluster-members") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovery_Mechanisms.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-members-by-multicast") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovering_Members_by_Multicast.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-members-by-tcp") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovering_Members_by_TCP.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-members-within-ec2-cloud") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovery_Mechanisms.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-members-within-azure-cloud") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovery_Mechanisms.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-members-with-jclouds") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovery_Mechanisms.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovering-native-clients") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Discovering_Native_Clients.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-cluster-groups") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Creating_Cluster_Groups.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#user-code-deployment-beta") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/User_Code_Deployment_-_BETA.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-user-code-deployment") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/User_Code_Deployment_-_BETA.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#partition-group-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Partition_Group_Configuration.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#grouping-types") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Partition_Group_Configuration.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#logging-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Logging_Configuration.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#other-network-configurations") {
	window.location = $baseurl + "/docs/latest/manual/html/Setting_Up_Clusters/Other_Network_Configurations.html";
}


// Docs 'Rolling Member Upgrades' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#rolling-member-upgrades") {
	window.location = $baseurl + "/docs/latest/manual/html/Rolling_Member_Upgrades.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#terminology") {
	window.location = $baseurl + "/docs/latest/manual/html/Rolling_Member_Upgrades.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-members-compatibility-guarantees") {
	window.location = $baseurl + "/docs/latest/manual/html/Rolling_Member_Upgrades.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#rolling-upgrade-procedure") {
	window.location = $baseurl + "/docs/latest/manual/html/Rolling_Member_Upgrades.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#network-partitions-and-rolling-upgrades") {
	window.location = $baseurl + "/docs/latest/manual/html/Rolling_Member_Upgrades.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#rolling-upgrade-faq") {
	window.location = $baseurl + "/docs/latest/manual/html/Rolling_Member_Upgrades.html";
}


// Docs 'Distributed Data Structures' section
// Docs 'Distributed Data Structures : Map' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#distributed-data-structures") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Getting_Map_and_Putting_Entries.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-map-and-putting-an-entry") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Getting_Map_and_Putting_Entries.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#backing-up-maps") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Backing_Up_Maps.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#map-eviction") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Map_Eviction.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#evicting-map-entries") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Map_Eviction.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#setting-in-memory-format") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Setting_In_Memory_Format.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-high-density-memory-store-with-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Using_High-Density_Memory_Store_with_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#loading-and-storing-persistent-data") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Loading_and_Storing_Persistent_Data.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-near-cache-for-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Creating_Near_Cache_for_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#locking-maps") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Locking_Maps.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#lock-split-brain-protection-with-pessimistic-locking") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Locking_Maps.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#accessing-entry-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Accessing_Entry_Statistics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#map-listener") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Map_Listener.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-to-map-entries-with-predicates") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Listening_to_Map_entries_with_Predicates.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#removing-bulk-map-entries-with-predicates") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Removing_Bulk_Map_Entries_with_Predicates.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#adding-interceptors") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Adding_Interceptors.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#preventing-out-of-memory-exceptions") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Map/Preventing_Out_of_Memory_Exceptions.html";
}

// Docs 'Distributed Data Structures : Queue' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queue") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Getting_a_Queue_and_Putting_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-queue-and-putting-items") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Getting_a_Queue_and_Putting_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-an-example-queue") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Creating_an_Example_Queue.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#setting-a-bounded-queue") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Setting_a_Bounded_Queue.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queueing-with-persistent-datastore") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Queue_with_Persistence_Datastore.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#split-brain-protection-for-queue") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Split-Brain_Protection_for_Queue.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-queue") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Queue/Configuring_Queue.html";
}

// Docs 'Distributed Data Structures : Multimap' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#multimap") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/MultiMap.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-multimap-and-putting-an-entry") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/MultiMap.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-multimap") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/MultiMap.html";
}

// Docs 'Distributed Data Structures : Set' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#set") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Set.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-set-and-putting-items") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Set.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-set") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Set.html";
}

// Docs 'Distributed Data Structures : List' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#list") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/List.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-list-and-putting-items") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/List.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-list") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/List.html";
}

// Docs 'Distributed Data Structures : Ringbuffer' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#ringbuffer") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Getting_a_Ringbuffer_and_Reading_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-ringbuffer-and-reading-items") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Getting_a_Ringbuffer_and_Reading_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#adding-items-to-a-ringbuffer") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Getting_a_Ringbuffer_and_Reading_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#iqueue-vs-ringbuffer") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Getting_a_Ringbuffer_and_Reading_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-ringbuffer-capacity") {
	window.location = $baseurl + "docs/latest/html/Distributed_Data_Structures/Ringbuffer/Configuring_Ringbuffer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#backing-up-ringbuffer") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Configuring_Ringbuffer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-ringbuffer-time-to-live") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Configuring_Ringbuffer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#setting-ringbuffer-overflow-policy") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Configuring_Ringbuffer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#ringbuffer-with-persistent-datastore") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Ringbuffer_with_Persistent_Datastore.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-ringbuffer-in-memory-format") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Configuring_Ringbuffer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#adding-batched-items") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Batched_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#reading-batched-items") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Batched_Items.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-async-methods") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Using_Async_Methods.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#ringbuffer-configuration-examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Ringbuffer/Configuring_Ringbuffer.html";
}

// Docs 'Distributed Data Structures : Topic' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#topic") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Topic/Getting_a_Topic_and_Publishing_Messages.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-a-topic-and-publishing-messages") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Topic/Getting_a_Topic_and_Publishing_Messages.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-topic-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Topic/Getting_Topic_Statistics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-topic-behavior") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Topic/Understanding_Topic_Behavior.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-topic") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Topic/Configuring_Topic.html";
}

// Docs 'Distributed Data Structures : Reliable Topic' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#reliable-topic") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Reliable_Topic.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sample-reliable-itopic-code") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Reliable_Topic.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#slow-consumers") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Reliable_Topic.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-reliable-topic") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Reliable_Topic.html";
}

// Docs 'Distributed Data Structures : Lock' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#lock") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-try-catch-blocks-with-locks") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#releasing-locks-with-trylock-timeout") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#avoiding-waiting-threads-with-lease-time") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-lock-behavior") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#synchronizing-threads-with-icondition") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#split-brain-protection-for-lock") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#lock-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Lock.html";
}

// Docs 'Distributed Data Structures : IAtomicLong' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#iatomiclong") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicLong.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sending-functions-to-iatomiclong") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicLong.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#executing-functions-on-iatomiclong") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicLong.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#reasons-to-use-functions-with-iatomic") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicLong.html";
}

// Docs 'Distributed Data Structures : ISemaphore' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#isemaphore") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ISemaphore.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#controlling-thread-counts-with-permits") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ISemaphore.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#example-semaphore-code") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ISemaphore.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-semaphore") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ISemaphore.html";
}

// Docs 'Distributed Data Structures : IAtomicReference' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#iatomicreference") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicReference.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sending-functions-to-iatomicreference") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicReference.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-iatomicreference") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IAtomicReference.html";
}

// Docs 'Distributed Data Structures : ICountDownLatch' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#icountdownlatch") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ICountDownLatch.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#gate-keeping-concurrent-activities") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ICountDownLatch.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#recovering-from-failure") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ICountDownLatch.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-icountdownlatch") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/ICountDownLatch.html";
}

// Docs 'Distributed Data Structures : IDGenerator' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#idgenerator") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IdGenerator.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#generating-cluster-wide-ids") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IdGenerator.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#unique-ids-and-duplicate-ids") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/IdGenerator.html";
}

// Docs 'Distributed Data Structures : Replicated Map' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#replicated-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#replicating-instead-of-partitioning") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#example-replicated-map-code") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#considerations-for-replicated-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuration-design-for-replicated-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-replicated-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-entrylistener-on-replicated-map") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Replicated_Map.html";
}

// Docs 'Distributed Data Structures : Cardinality Estimator Service' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cardinality-estimator-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Cardinality_Estimator_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cardinality-estimator-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Cardinality_Estimator_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Data_Structures/Cardinality_Estimator_Service.html";
}

// Docs 'Distributed Events' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#distributed-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/index.html";
}

// Docs 'Distributed Events : Event Listeners for Hazelcast Members' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#event-listeners-for-hazelcast-members") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Member_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-member-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Member_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-distributed-object-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Distributed_Object_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-migration-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Migration_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-partition-lost-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Partition_Lost_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-lifecycle-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Lifecycle_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-map-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Distributed_Object_Events/Listening_for_Map_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-multimap-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Distributed_Object_Events/Listening_for_MultiMap_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-item-events") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Distributed_Object_Events/Listening_for_Item_Events.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-topic-messages") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Distributed_Object_Events/Listening_for_Topic_Messages.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#listening-for-clients") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Cluster_Events/Listening_for_Clients.html";
}

// Docs 'Distributed Events : Event Listeners for Hazelcast Clients' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#event-listeners-for-hazelcast-clients") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Event_Listeners_for_Clients.html";
}

// Docs 'Distributed Events : Global Event Configuration' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#global-event-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Events/Global_Event_Configuration.html";
}

// Docs 'Distributed Computing' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#distributed-computing") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/index.html";
}

// Docs 'Distributed Computing : Executor Service' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Implementing_a_Callable_Task.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-a-callable-task") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Implementing_a_Callable_Task.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-a-runnable-task") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Implementing_a_Runnable_Task.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#scaling-the-executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Scaling_the_Executor_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#executing-code-in-the-cluster") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Executing-Code_in_the_Cluster.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#canceling-an-executing-task") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Canceling_an_Executing_Task.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#callback-when-task-completes") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Callback_When_Task_Completes.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#selecting-members-for-task-execution") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Selecting_Members_for_Task_Execution.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Executor_Service/Configuring_Executor_Service.html";
}

// Docs 'Distributed Computing : Durable Executor Service' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#durable-executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Durable_Executor_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-durable-executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Durable_Executor_Service.html";
}

// Docs 'Distributed Computing : Scheduled Executor Service' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#scheduled-executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Scheduled_Executor_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#scheduled-executor-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Scheduled_Executor_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-scheduled-executor-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Scheduled_Executor_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Scheduled_Executor_Service.html";
}

// Docs 'Distributed Computing : Entry Processor' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#entry-processor") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Performing_Fast_In-Memory_Map_Operations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#performing-fast-in-memory-map-operations") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Performing_Fast_In-Memory_Map_Operations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-indexes") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Performing_Fast_In-Memory_Map_Operations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-object-in-memory-format") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Performing_Fast_In-Memory_Map_Operations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#entryprocessor-interface") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Entry_Processor_Interface.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#processing-backup-entries") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Processing_Backup_Entries.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-an-entry-processor") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Creating_a_Sample_Entry_Processor.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#abstract-entry-processor") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Abstract_Entry_Processor.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#entry-processor-performance-optimizations") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Computing/Entry_Processor/Entry_Processor_Optimizations.html";
}

// Docs 'Distributed Query' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#distributed-query") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/index.html";
}

// Docs 'Distributed Query : How Distributed Query Works' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-distributed-query-works") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#employee-map-query-example") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/Employee_Map_Query_Example.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#querying-with-criteria-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/Querying_with_Criteria_API.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#querying-with-sql") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/Querying_with_SQL.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#filtering-with-paging-predicates") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/Filtering_with_Paging_Predicates.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#indexing-queries") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/Indexing_Queries.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-query-thread-pool") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/How_Distributed_Query_Works/Configuring_Query_Thread_Pool.html";
}

// Docs 'Distributed Query : Querying in Collections and Arrays' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#querying-in-collections-and-arrays") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Querying_in_Collections_and_Arrays/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#indexing-in-collections-and-arrays") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Querying_in_Collections_and_Arrays/Indexing_in_Collections_and_Arrays.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#corner-cases") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Querying_in_Collections_and_Arrays/Corner_Cases.html";
}

// Docs 'Distributed Query : Custom Attributes' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#custom-attributes") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Custom_Attributes/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-a-valueextractor") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Custom_Attributes/Implementing_a_ValueExtractor.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#extraction-arguments") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Custom_Attributes/Extraction_Arguments.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-a-custom-attribute-programmatically") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Custom_Attributes/Configuring_a_Custom_Attribute_Programmatically.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-a-custom-attribute-declaratively") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Custom_Attributes/Configuring_a_Custom_Attribute_Declaratively.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#indexing-custom-attributes") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Custom_Attributes/Indexing_Custom_Attributes.html";
}

// Docs 'Distributed Query : MapReduce' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#mapreduce") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/MapReduce/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-mapreduce") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/MapReduce/Understanding_MapReduce.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-the-mapreduce-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/MapReduce/Using_the_MapReduce_API.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-mapreduce-architecture") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/MapReduce/Hazelcast_MapReduce_Architecture.html";
}
if ($current == $baseurl + "http://docs.hazelcast.org/docs/latest/manual/html-single/index.html#mapreduce-deprecation") {
	window.location = $baseurl + "http://docs.hazelcast.org/docs/latest-development/manual/html/Distributed_Query/MapReduce/MapReduce_Deprecation.html";
}


// Docs 'Distributed Query : Aggregators' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#aggregators") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Aggregators/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#aggregations-basics") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Aggregators/Aggregations_Basics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-the-aggregations-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Aggregators/Using_the_Aggregations_API.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#aggregations-examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Aggregators/Aggregations_Examples.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-aggregations") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Aggregators/Implementing_Aggregations.html";
}

// Docs 'Distributed Query : Fast-Aggregations' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#fast-aggregations") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Fast_Aggregations/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#aggregator-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Fast_Aggregations/Aggregator_API.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sample-implementation") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Fast_Aggregations/Sample_Implementation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#built-in-aggregations") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Fast_Aggregations/Built-In_Aggregations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuration-options") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Fast_Aggregations/Configuration_Options.html";
}

// Docs 'Distributed Query : Projections' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#projections") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Projections/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#projections-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Projections/Projections_API.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sample-implementation") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Projections/Sample_Implementation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#built-in-projections") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Projections/Built-In_Projections.html";
}

// Docs 'Distributed Query : Continuous Query Cache' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#continuous-query-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Continuous_Query_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#keeping-query-results-local-and-ready") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Continuous_Query_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#accessing-continuous-query-cache-from-member") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Continuous_Query_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#accessing-continuous-query-cache-from-client-side") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Continuous_Query_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#features-of-continuous-query-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Distributed_Query/Continuous_Query_Cache.html";
}

// Docs 'Transactions' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#transactions") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Creating_a_Transaction_Interface.html";
}

// Docs 'Transactions : Creating a Transaction Interface' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-a-transaction-interface") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Creating_a_Transaction_Interface.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queuesetlist-vs-mapmultimap") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Creating_a_Transaction_Interface.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#one-phase-vs-two-phase") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Creating_a_Transaction_Interface.html";
}

// Docs 'Transactions : Providing XA Transactions' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#providing-xa-transactions") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Providing_XA_Transactions.html";
}

// Docs 'Transactions : Integrating into J2EE' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#integrating-into-j2ee") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Integrating_into_Java_EE.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#integrating-into-java-ee") {
	window.location = $baseurl + "/docs/latest/manual/html/Transactions/Integrating_into_Java_EE.html";
}

// Docs 'Hazelcast JCache' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-jcache") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Overview.html";
}

// Docs 'Hazelcast JCache : JCache Overview' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-overview") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Overview.html";
}

// Docs 'Hazelcast JCache : JCache Setup and Configuration' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-setup-and-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Setup_and_Configuration/Setting_your_Application.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#setting-up-your-application") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Setup_and_Configuration/Setting_your_Application.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#example-jcache-application") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Setup_and_Configuration/Example_JCache_Application.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-for-jcache") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Setup_and_Configuration/Configuring_for_JCache.html";
}

// Docs 'Hazelcast JCache : JCache Providers' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-providers") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_Providers/Configuring_JCache_Providers.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-jcache-provider") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_Providers/Configuring_JCache_Providers.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-jcache-with-client-provider") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_Providers/Configuring_JCache_with_Client_Provider.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-jcache-with-server-provider") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_Providers/Configuring_JCache_with_Server_Provider.html";
}

// Docs 'Hazelcast JCache : JCache API' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/JCache_API_Application_Example.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-api-application-example") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/JCache_API_Application_Example.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-base-classes") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/JCache_Base_Classes.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-factory-and-factorybuilder") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/Implementing_Factory_and_FactoryBuilder.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-cacheloader") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/Implementing_CacheLoader.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cachewriter") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/Implementing_CacheWriter.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-entryprocessor") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/Implementing_Entry_Processor.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cacheentrylistener") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/Implementing_CacheEntryListener.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#expirepolicy") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/JCache_API/Implementing_ExpiryPolicy.html";
}

// Docs 'Hazelcast JCache : JCache - Hazelcast Instance Integration' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-hazelcast-instance-integration") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Integrating_JCache_with_Hazelcast_Instance.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-and-hazelcast-instance-awareness") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Integrating_JCache_with_Hazelcast_Instance.html";
}

// Docs 'Hazelcast JCache : Hazelcast JCache Extension - ICache' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-jcache-extension-icache") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Scoping_to_Join_Clusters.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#scoping-to-join-clusters") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Scoping_to_Join_Clusters.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#namespacing") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Namespacing.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#retrieving-an-icache-instance") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Retrieving_an_ICache_Instance.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#icache-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Configuring_ICache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#icache-async-methods") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/ICache_Async_Methods.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#defining-a-custom-expirypolicy") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Defining_a_Custom_Expiry_Policy.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-eviction") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/JCache_Eviction.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-near-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/JCache_Near_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#icache-convenience-methods") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/ICache_Convenience_Methods.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-backupawareentryprocessor") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/Implementing_BackupAwareEntryProcessor.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#icache-partition-lost-listener") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/ICache_Partition_Lost_Listener.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jcache-split-brain") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Hazelcast_JCache_Extension-ICache/JCache_Split-Brain.html";
}

// Docs 'Hazelcast JCache : Testing for JCache Specification Compliance' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#testing-for-jcache-specification-compliance") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_JCache/Testing_for_JCache_Specification_Compliance.html";
}

// Docs 'Integrated Clustering' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#integrated-clustering") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Hibernate_Second_Level_Cache.html";
}

// Docs 'Integrated Clustering : Hibernate Second Level Cache' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hibernate-second-level-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Hibernate_Second_Level_Cache.html";
}

// Docs 'Integrated Clustering : Web Session Replication' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#web-session-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Replicating_Web_Sessions.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#filter-based-web-session-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Replicating_Web_Sessions.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#tomcat-based-web-session-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Replicating_Web_Sessions.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jetty-based-web-session-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Replicating_Web_Sessions.html";
}

// Docs 'Integrated Clustering : Spring Integration' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#spring-integration") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Configuring_Spring.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#supported-versions") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Configuring_Spring.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-spring") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Configuring_Spring.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-springaware-objects") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Enabling_SpringAware_Objects.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#adding-caching-to-spring") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Adding_Caching_to_Spring.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-hibernate-second-level-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Configuring_Hibernate_Second_Level_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-hazelcast-transaction-manager") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Configuring_Hazelcast_Transaction_Manager.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#best-practices") {
	window.location = $baseurl + "/docs/latest/manual/html/Integrated_Clustering/Integrating_with_Spring/Best_Practices.html";
}

// Docs 'Storage' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#storage") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/High-Density_Memory_Store.html";
}

// Docs 'Storage : High Density Memory Store' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#high-density-memory-store") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/High-Density_Memory_Store.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-high-density-memory-store") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/High-Density_Memory_Store.html";
}

// Docs 'Storage : Sizing Practices' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sizing-practices") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Sizing_Practices.html";
}

// Docs 'Storage : Hot Restart Persistence' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-restart-persistence") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Hot_Restart_Types.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-restart-persistence-overview") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Hot_Restart_Types.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-restart-types") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Hot_Restart_Types.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#restart-process") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Restart_Process.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#force-start") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Force_Start.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#partial-start") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Partial_Start.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-hot-restart") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Configuring_Hot_Restart.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#movingcopying-hot-restart-data") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Moving-Copying_Hot_Restart_Data.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-restart-persistence-design-details") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Design_Details.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#concurrent-incremental-generational-gc") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Concurrent-Incremental-Generational_GC.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-restart-performance-considerations") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Performance_Considerations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-backup") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hot_Restart_Persistence/Hot_Backup.html";
}

// Docs 'Storage : Hazelcast Striim Hot Cache' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-striim-hot-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Storage/Hazelcast_Striim_Hot_Cache.html";
}

// Docs 'Hazelcast Java Client' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-java-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Overview.html";
}

// Docs 'Hazelcast Java Client : Hazelcast Clients Feature Comparison' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-clients-feature-comparison") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Overview.html";
}

// Docs 'Hazelcast Java Client : Java Client Overview' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#java-client-overview") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Overview.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#including-dependencies-for-java-clients") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-started-with-client-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#java-client-operation-modes") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#handling-failures") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-supported-distributed-data-structures") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-client-services") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-listeners") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-transactions") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Getting_Started.html";
}

// Docs 'Hazelcast Java Client : Configuring Java Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-java-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Overview.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-client-network") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Client_Network.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-client-load-balancer") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Load_Balancer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-client-near-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Other_Configurations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-group-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Other_Configurations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-security-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Other_Configurations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-serialization-configuration") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Other_Configurations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-client-listeners") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Listeners.html";
}
if ($current == $baseurl + "docs/latest/manual/html-single/index.html#executorpoolsize") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Other_Configurations.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#classloader") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Configuration/Other_Configurations.html";
}

// Docs 'Hazelcast Java Client : Client System Properties' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-system-properties") {
	window.location = $baseurl + "/docs/latest/manual/html/System_Properties/System_Properties_-_Client.html";
}

// Docs 'Hazelcast Java Client : Sample Codes for Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sample-codes-for-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Overview.html";
}

// Docs 'Hazelcast Java Client : Using High-Density Memory Store with Java Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-high-density-memory-store-with-java-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Java_Client/Using_High-Density_Memory_Store_with_Java_Client.html";
}

// Docs 'Other Client and Language Implementations' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#other-client-and-language-implementations") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Other_Client_and_Language_Implementations.html";
}

// Docs 'Other Client and Language Implentations : C++ Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#c-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/C++_Client.html";
}

// Docs 'Other Client and Language Implentations : .NET Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#net-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/.NET_Client.html";
}

// Docs 'Other Client and Language Implentations : Python Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#python-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Other_Client_and_Language_Implementations.html";
}

// Docs 'Other Client and Language Implentations : Node.js Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#nodejs-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Other_Client_and_Language_Implementations.html";
}

// Docs 'Other Client and Language Implentations : Scala' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#scala") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Other_Client_and_Language_Implementations.html";
}

// Docs 'Other Client and Language Implentations : REST Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#rest-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/REST_Client.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#rest-client-getpostdelete-examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/REST_Client.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#checking-the-status-of-the-cluster-for-rest-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/REST_Client.html";
}

// Docs 'Other Client and Language Implentations : Memcache Client' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#memcache-client") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Memcache_Client.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#memcache-client-code-examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Memcache_Client.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#unsupported-operations-for-memcache") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Clients/Memcache_Client.html";
}

// Docs 'Serialization' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#serialization") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Overview.html";
}

// Docs 'Serialization : Serialization Interface Types' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#serialization-interface-types") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Serialization_Interface_Types.html";
}

// Docs 'Serialization : Comparing Serialization Interfaces' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#comparing-serialization-interfaces") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Comparing_Serialization_Interfaces.html";
}

// Docs 'Serialization : Implementing Java Serializable and Externalizable' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-java-serializable-and-externalizable") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Java_Serializable_and_Externalizable.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-java-externalizable") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Java_Serializable_and_Externalizable.html";
}

// Docs 'Serialization : Implementing DataSerializable' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-dataserializable") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_DataSerializable.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#identifieddataserializable") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_DataSerializable.html";
}

// Docs 'Serialization : Implementing Portable Serialization' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-portable-serialization") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#portable-serialization-example-code") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/Example_Code.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#registering-the-portable-factory") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/Registering_the_Portable_Factory.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#versioning-for-portable-serialization") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/Versioning_for_Portable_Serialization.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#ordering-consistency-for-writeportable") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/Ordering_Consistency_for_writePortable.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#null-portable-serialization") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/Null_Portable_Serialization.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#distributedobject-serialization") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_Portable_Serialization/DistributedObject_Serialization.html";
}

// Docs 'Serialization : Custom Serialization' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#custom-serialization") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Custom_Serialization/Implementing_StreamSerializer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-streamserializer") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Custom_Serialization/Implementing_StreamSerializer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-bytearrayserializer") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Custom_Serialization/Implementing_ByteArraySerializer.html";
}

// Docs 'Serialization : Global Serializer' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#global-serializer") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Global_Serializer.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#sample-global-serializer") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Global_Serializer.html";
}

// Docs 'Serialization : Implementing HazelcastInstanceAware' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#implementing-hazelcastinstanceaware") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Implementing_HazelcastInstanceAware.html";
}

// Docs 'Serialization : Serialization Configuration Wrap-Up' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#serialization-configuration-wrap-up") {
	window.location = $baseurl + "/docs/latest/manual/html/Serialization/Serialization_Configuration_Wrap-Up.html";
}

// Docs 'Management' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#management") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/Map_Statistics.html.html";
}

// Docs 'Management : Getting Member Statistics' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-member-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#map-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/Map_Statistics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#multimap-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/MultiMap_Statistics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queue-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/Queue_Statistics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#topic-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/Topic_Statistics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#executor-statistics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Getting_Member_Statistics/Executor_Statistics.html";
}

// Docs 'Management : JMX API per Member' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jmx-api-per-member") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/JMX_API_Per_Member.html";
}

// Docs 'Management : Monitoring with JMX' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-with-jmx") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Monitoring_with_JMX.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#mbean-naming-for-hazelcast-data-structures") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Monitoring_with_JMX.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#connecting-to-jmx-agent") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Monitoring_with_JMX.html";
}

// Docs 'Management : Cluster Utilities' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cluster-utilities") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Getting_Member_Events_and_Member_Sets.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-member-events-and-member-sets") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Getting_Member_Events_and_Member_Sets.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#managing-cluster-and-member-states") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Managing_Cluster_and_Member_States.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-the-script-clustersh") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Using_the_Script_cluster.sh.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-rest-api-for-cluster-management") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Using_REST_API_for_Cluster_Management.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-lite-members") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Enabling_Lite_Members.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#defining-member-attributes") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Defining_Member_Attributes.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#safety-checking-cluster-members") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Cluster_Utilities/Safety_Checking_of_Cluster_Members.html";
}

// Docs 'Management : Diagnostics' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#diagnostics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Diagnostics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-diagnostics-logging") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Diagnostics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#diagnostics-log-file") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Diagnostics.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#diagnostics-plugins") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Diagnostics.html";
}

// Docs 'Management : Hazelcast CLI' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-cli") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Hazelcast_CLI.html";
}

// Docs 'Management : Management Center' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#management-center") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#installing-management-center") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-started-to-management-center") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-management-center-with-tlsssl-only") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#ldap-authentication") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#active-directory-authentication") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#jaas-authentication") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#management-center-tools") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#management-center-home-page") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-caches") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#managing-maps") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-replicated-maps") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-queues") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-topics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-multimaps") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-executors") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-wan-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#monitoring-members") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#scripting") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#executing-console-commands") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-alerts") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#administering-management-center") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hot-restart") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#checking-past-status-with-time-travel") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#management-center-documentation") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#suggested-heap-size") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Management_Center.html";
}

// Docs 'Management : Clustered JMX via Management Center' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clustered-jmx-via-management-center") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-clustered-jmx") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-tlsssl-for-clustered-jmx") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clustered-jmx-api") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#integrating-with-new-relic") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#integrating-with-appdynamics") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}

// Docs 'Management : Clustered REST via Management Center' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clustered-rest-via-management-center") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-clustered-rest") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clustered-rest-api-root") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clusters-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cluster-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#members-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#member-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clients-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#maps-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#multimaps-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queues-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#topics-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#executors-resource") {
	window.location = $baseurl + "/docs/latest/manual/html/Management/Clustered_JMX_and_REST_via_Management_Center.html";
}

// Docs 'Security' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#security") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Enabling_Security.html";
}

// Docs 'Security : Enabling Security' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-security") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Enabling_Security.html";
}

// Docs 'Security : Socket Interceptor' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#socket-interceptor") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Socket_Interceptor.html";
}

// Docs 'Security : Security Interceptor' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#security-interceptor") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Security_Interceptor.html";
}

// Docs 'Security : Encryption' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#encryption") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Encryption.html";
}

// Docs 'Security : TLS/SSL' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#tlsssl") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/TLS-SSL.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#tlsssl-for-hazelcast-members") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/TLS-SSL.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#tlsssl-for-hazelcast-clients") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/TLS-SSL.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#mutual-authentication") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/TLS-SSL.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#tlsssl-performance-improvements-for-java") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/TLS-SSL.html";
}

// Docs 'Security : Credentials' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#credentials") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Credentials.html";
}

// Docs 'Security : ClusterLoginModule' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#clusterloginmodule") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/ClusterLoginModule.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enterprise-integration") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/ClusterLoginModule.html";
}

// Docs 'Security : Cluster Member Security' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#cluster-member-security") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Cluster_Member_Security.html";
}

// Docs 'Security : Native Client Security' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#native-client-security") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Native_Client_Security.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#authentication") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Native_Client_Security.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#authorization") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Native_Client_Security.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#permissions") {
	window.location = $baseurl + "/docs/latest/manual/html/Security/Native_Client_Security.html";
}

// Docs 'Performance' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#performance") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Data_Affinity.html";
}

// Docs 'Performance : Data Affinity' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#data-affinity") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Data_Affinity.html";
}

// Docs 'Performance : Back Pressure' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#back-pressure") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Back_Pressure.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#member-side") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Back_Pressure.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-side") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Back_Pressure.html";
}

// Docs 'Performance : Threading Model' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#threading-model") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Threading_Model/I:O_Threading.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#io-threading") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Threading_Model/I:O_Threading.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#event-threading") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Threading_Model/Event_Threading.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#iexecutor-threading") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Threading_Model/IExecutor_Threading.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#operation-threading") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Threading_Model/Operation_Threading.html";
}

// Docs 'Performance : SlowOperationDetector' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#slowoperationdetector") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Slow_Operation_Detector.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#logging-of-slow-operations") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Slow_Operation_Detector.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#purging-of-slow-operation-logs") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Slow_Operation_Detector.html";
}

// Docs 'Performance : Near Cache' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Hazelcast_Data_Structures_with_Near_Cache_Support.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-data-structures-with-near-cache-support") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Hazelcast_Data_Structures_with_Near_Cache_Support.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-near-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Configuring_Near_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache-configuration-examples") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Near_Cache_Configuration_Examples.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache-eviction") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Near_Cache_Eviction.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache-expiration") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Near_Cache_Expiration.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache-invalidation") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Near_Cache_Invalidation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache-eventual-consistency") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Near_Cache_Eventual_Consistency.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#near-cache-preloader") {
	window.location = $baseurl + "/docs/latest/manual/html/Performance/Near_Cache/Near_Cache_Preloader.html";
}

// Docs 'Hazelcast Simulator' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-simulator") {
	window.location = $baseurl + "/docs/latest/manual/html/Hazelcast_Simulator.html";
}

// Docs 'WAN' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#wan") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Defining_WAN_Replication.html";
}

// Docs 'WAN : WAN Replication' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#wan-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Defining_WAN_Replication.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#defining-wan-replication") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Defining_WAN_Replication.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#wanbatchreplication-implementation") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/WANBatchReplication_Implementation.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-wan-replication-for-imap-and-icache") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Configuring_WAN_Replication_for_IMap_and_Cache.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#batch-size") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Batch_Size.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#batch-maximum-delay") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Batch_Maximum_Delay.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#response-timeout") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Response_Timeout.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queue-capacity") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Queue_Capacity.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#queue-full-behavior") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Queue_Full_Behavior.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#event-filtering-api") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Event_Filtering_API.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#acknowledgment-types") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Acknoledgment_Types.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#synchronizing-wan-target-cluster") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Synchronizing_WAN_Target_Cluster.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#wan-replication-additional-information") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Additional_Information.html";
}

// Docs 'WAN : Hazelcast WAN Replication with Solace' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#hazelcast-wan-replication-with-solace") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Hazelcast_WAN_Replication_with_Solace.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-integration") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Hazelcast_WAN_Replication_with_Solace.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#additional-information") {
	window.location = $baseurl + "/docs/latest/manual/html/WAN_Replication/Hazelcast_WAN_Replication_with_Solace.html";
}

// Docs 'OSGI' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#osgi") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}

// Docs 'OSGI : OSGI Support' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#osgi-support") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}

// Docs 'OSGI : API' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#api") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}

// Docs 'OSGI : Configuring Hazelcast OSGI Support' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-hazelcast-osgi-support") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}

// Docs 'OSGI : Design' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#design") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}

// Docs 'OSGI : Using Hazelcast OSGI Service' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#using-hazelcast-osgi-service") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#getting-hazelcast-osgi-service-instances") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#managing-and-using-hazelcast-instances") {
	window.location = $baseurl + "/docs/latest/manual/html/OSGI.html";
}

// Docs 'Extending Hazelcast' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#extending-hazelcast") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Creating_the_Service_Class.html";
}

// Docs 'Extending Hazelcast : User Defined Services' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#user-defined-services") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/index.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-the-service-class") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Creating_the_Service_Class.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#enabling-the-service-class") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Enabling_the_Service_Calls.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#adding-properties-to-the-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Adding_Properties_to_the_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#starting-the-service") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Starting_the_Service.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#placing-a-remote-call-via-proxy") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Placing_a_Remote_Call_via_Proxy.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-containers") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Creating_Containers.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#partition-migration") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Partition_Migration.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#creating-backups") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/User_Defined_Services/Creating_Backups.html";
}

// Docs 'Extending Hazelcast : WaitNotifyService' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#waitnotifyservice") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/OperationParker.html";
}

// Docs 'Extending Hazelcast : Discovery SPI' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovery-spi") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Discovery_SPI/Discovery_SPI_Interfaces_and_Classes.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovery-spi-interfaces-and-classes") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Discovery_SPI/Discovery_SPI_Interfaces_and_Classes.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discovery-strategy") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Discovery_SPI/Discovery_Strategy.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#discoveryservice-framework-integration") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Discovery_SPI/DiscoveryService-Framework_Integration.html";
}

// Docs 'Extending Hazelcast : Config Properties SPI' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#config-properties-spi") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Config_Properties_.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#config-properties-spi-classes") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Config_Properties_.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#config-properties-spi-example") {
	window.location = $baseurl + "/docs/latest/manual/html/Extending_Hazelcast/Config_Properties_.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#network-partitioning-split-brain-syndrome") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/index.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : Understanding Partition Recreation' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-partition-recreation") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split-Brain_Protection.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : Understanding Backup Partition Creation' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-backup-partition-creation") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split-Brain_Protection.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : Understanding The Update Overwrite Scenario' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#understanding-the-update-overwrite-scenario") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split-Brain_Protection.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : What Happens When The Network Failure Is Fixed' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#what-happens-when-the-network-failure-is-fixed") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split-Brain_Protection.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : How Hazelcast Split-Brain Merge Happens' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-hazelcast-split-brain-merge-happens") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split-Brain_Recovery.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : Specifying Merge Policies' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#specifying-merge-policies") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split-Brain_Recovery.html";
}

// Docs 'Network Partitioning - Split-Brain Syndrome : Split-Brain Protection' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#split-brain-protection") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split_Brain_Protection.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#time-window-for-split-brain-protection") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split_Brain_Protection.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-quorum") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split_Brain_Protection.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#configuring-quorum-listeners") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split_Brain_Protection.html";
}
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#querying-quorum-results") {
	window.location = $baseurl + "/docs/latest/manual/html/Network_Partitioning/Split_Brain_Protection.html";
}

// Docs 'System Properties' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#system-properties") {
	window.location = $baseurl + "/docs/latest/manual/html/System_Properties_-_Member.html";
}

// Docs 'Common Exception Types' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#common-exception-types") {
	window.location = $baseurl + "/docs/latest/manual/html/Common_Exception_Types.html";
}

// Docs 'License Questions' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#license-questions") {
	window.location = $baseurl + "/docs/latest/manual/html/License_Questions.html";
}

// Docs 'Lecense Questions : Embedded Dependencies' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#embedded-dependencies") {
	window.location = $baseurl + "/docs/latest/manual/html/License_Questions.html";
}

// Docs 'Lecense Questions : Runtime Dependencies' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#runtime-dependencies") {
	window.location = $baseurl + "/docs/latest/manual/html/License_Questions.html";
}

// Docs 'Frequently Asked Questions' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#frequently-asked-questions") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Why 271 as the default partition count?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#why-271-as-the-default-partition-count") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Is Hazelcast thread safe?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#is-hazelcast-thread-safe") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do members discover each other?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-members-discover-each-other") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : What happens when a member goes down?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#what-happens-when-a-member-goes-down") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do I test the connectivity?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-i-test-the-connectivity") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do I choose keys properly?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-i-choose-keys-properly") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do I reflect value modifications?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-i-reflect-value-modifications") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do I test my Hazelcast cluster?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-i-test-my-hazelcast-cluster") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Does Hazelcast support hundreds of members?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#does-hazelcast-support-hundreds-of-members") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Does Hazelcast support thousands of clients?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#does-hazelcast-support-thousands-of-clients") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Difference between lite member and smart client?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#difference-between-lite-member-and-smart-client") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do you give support?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-you-give-support") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Does Hazelcast persist?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#does-hazelcast-persist") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Can I use Hazelcast in a single server?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#can-i-use-hazelcast-in-a-single-server") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How can I monitor Hazelcast?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-can-i-monitor-hazelcast") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How can I see debug level logs?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-can-i-see-debug-level-logs") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Client-Server vs embedded topologies?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-server-vs-embedded-topologies") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How do I know it is safe to kill the second member?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-do-i-know-it-is-safe-to-kill-the-second-member") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : When do I need native memory solutions?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#when-do-i-need-native-memory-solutions") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Is there any disadvantage of using near cache?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#is-there-any-disadvantage-of-using-near-cache") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Is Hazelcast secure?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#is-hazelcast-secure") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : How can I set socket options?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#how-can-i-set-socket-options") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Client disconnections during idle time?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#client-disconnections-during-idle-time") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : OOME: Unable to create new native thread?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#oome-unable-to-create-new-native-thread") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Does repartitioning wait for entry processor?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#does-repartitioning-wait-for-entry-processor") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : Instances on different machines cannot see each other?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#instances-on-different-machines-cannot-see-each-other") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Frequently Asked Questions : What does replica 1 has no owner mean?' subsection
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#what-does-replica-1-has-no-owner-mean") {
	window.location = $baseurl + "/docs/latest/manual/html/FAQ.html";
}

// Docs 'Glossary' section
if ($current == $baseurl + "/docs/latest/manual/html-single/index.html#glossary") {
	window.location = $baseurl + "/docs/latest/manual/html/Glossary.html";
}
