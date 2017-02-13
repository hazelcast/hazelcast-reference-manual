
# License Questions

Hazelcast is distributed using the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2</a>, therefore permissions are granted
to use, reproduce and distribute it along with any kind of open source and closed source applications.

Hazelcast IMDG Enterprise is a commercial product of Hazelcast, Inc. and is distributed under a commercial license that must be acquired
before using it in any type of released software. Feel free to contact <a href="http://hazelcast.com/contact/" target="_blank">Hazelcast sales department</a>
for more information on commercial offers.

Depending on the used feature-set, Hazelcast has certain runtime dependencies which might have different licenses. Following are dependencies and their respective licenses.

## Embedded Dependencies

Embedded dependencies are merged (shaded) with the Hazelcast codebase at compile-time. These dependencies become an integral part
of the Hazelcast distribution.

For license files of embedded dependencies, please see the `license` directory of the Hazelcast distribution, available at our
<a href="http://hazelcast.org/download/" target="_blank">download page</a>.

**minimal-json**:

minimal-json is a JSON parsing and generation library which is a part of the Hazelcast distribution. It is used for communication
between the Hazelcast cluster and the Management Center.

minimal-json is distributed under the <a href="http://opensource.org/licenses/MIT" target="_blank">MIT license</a> and offers the same rights to add, use,
modify, and distribute the source code as the Apache License 2.0 that Hazelcast uses. However, some other restrictions might apply.

## Runtime Dependencies

Depending on the used features, additional dependencies might be added to the dependency set. Those runtime dependencies might have
other licenses. See the following list of additional runtime dependencies.

**Spring Framework**:

Hazelcast offers a tight integration into the Spring Framework. Hazelcast can be configured and controlled using Spring.

The Spring Framework is distributed under the terms of the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2</a> and therefore it is
fully compatible with Hazelcast.

**Hibernate**:

Hazelcast integrates itself into Hibernate as a second-level cache provider.

Hibernate is distributed under the terms of the <a href="https://www.gnu.org/licenses/lgpl-2.1.html" target="_blank">Lesser General Public License 2.1</a>, 
also known as LGPL. Please read carefully the terms of the LGPL since restrictions might apply.

**Apache Tomcat**:

Hazelcast IMDG Enterprise offers native integration into Apache Tomcat for web session clustering.

Apache Tomcat is distributed under the terms of the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2</a> and therefore
fully compatible with Hazelcast.

**Eclipse Jetty**:

Hazelcast IMDG Enterprise offers native integration into Jetty for web session clustering.

Jetty is distributed with a dual licensing strategy. It is licensed under the terms of the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2</a>
and under the <a href="https://www.eclipse.org/legal/epl-v10.html" target="_blank">Eclipse Public License v1.0</a>, also known as EPL. Due to the Apache License,
it is fully compatible with Hazelcast.

**JCache API (JSR 107)**:

Hazelcast offers a native implementation for JCache (JSR 107), which has a runtime dependency to the JCache API.

The JCache API is distributed under the terms of the so called <a href="https://jcp.org/aboutJava/communityprocess/licenses/jsr107/Spec-License-JSR-107-10_22_12.pdf" target="_blank">Specification License</a>).
Please read carefully the terms of this license since restrictions might apply.

**Boost C++ Libraries**:

Hazelcast IMDG Enterprise offers a native C++ client, which has a link-time dependency to the Boost C++ Libraries.

The Boost Libraries are distributed under the terms of the <a href="http://www.boost.org/LICENSE_1_0.txt" target="_blank">Boost Software License</a>), which is
very similar to the MIT or BSD license. Please read carefully the terms of this license since restrictions might apply.

