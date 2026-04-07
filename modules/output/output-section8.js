/** Red Cat - Section 8 */

function generateSection8Output(command, input, tokens) {
    // Task 1: Show network connections
    if (command === 'nmcli' && (input.includes('connection show') || input.includes('c s'))) {
        const questionSetIndex = getQuestionSetForSection(appState.currentSectionId);
        
        // Check if showing details of a specific connection
        if (input.includes('office')) {
            // Show detailed configuration of 'office' connection
            if (questionSetIndex === 2) {
                const progress = appState.sectionProgress[appState.currentSectionId];
                if (progress && progress.completedTasks.includes(1)) {
                    // Show office connection details with IP if task 2+ completed
                    const hasIP = progress.completedTasks.includes(2);
                    const ipv4Addresses = hasIP ? '10.0.0.50/24' : '';
                    const ipv4Method = progress.completedTasks.includes(4) ? 'manual' : 'auto';
                    const gateway = progress.completedTasks.includes(3) ? '10.0.0.1' : '';
                    const dns = progress.completedTasks.includes(3) ? '10.0.0.2' : '';
                    
                    return `connection.id:                          office\nconnection.uuid:                        a1b2c3d4-e5f6-7890-abcd-ef1234567890\nconnection.interface-name:              enp0s8\nconnection.type:                        802-3-ethernet\nipv4.method:                            ${ipv4Method}\nipv4.addresses:                         ${ipv4Addresses}\nipv4.gateway:                           ${gateway}\nipv4.dns:                               ${dns}\nGENERAL.STATE:                          activated`;
                } else {
                    return 'Error: connection \'office\' not found';
                }
            }
            return 'Error: connection \'office\' not found';
        }
        
        // Set 2: Show 'office' connection after it's created
        if (questionSetIndex === 2) {
            const progress = appState.sectionProgress[appState.currentSectionId];
            // If task 1 (create office connection) is completed, show office in the list
            if (progress && progress.completedTasks.includes(1)) {
                return 'NAME    UUID                                  TYPE      DEVICE \noffice  a1b2c3d4-e5f6-7890-abcd-ef1234567890  ethernet  enp0s8\nens160  b2c3d4e5-f6a7-8901-bcde-f12345678901  ethernet  ens160\nvirbr0  fedcba98-7654-3210-fedc-ba9876543210  bridge    virbr0';
            } else {
                // Before task 1 completion, don't show office yet
                return 'NAME    UUID                                  TYPE      DEVICE \nens160  b2c3d4e5-f6a7-8901-bcde-f12345678901  ethernet  ens160\nvirbr0  fedcba98-7654-3210-fedc-ba9876543210  bridge    virbr0';
            }
        }
        
        // Default for other sets
        return 'NAME    UUID                                  TYPE      DEVICE \nens160  a1b2c3d4-e5f6-7890-abcd-ef1234567890  ethernet  ens160\nvirbr0  fedcba98-7654-3210-fedc-ba9876543210  bridge    virbr0';
    }
    
    // Task 2 & 5: Show firewall rules
    if (command === 'firewall-cmd' && input.includes('--list-all')) {
        return 'public (active)\n  target: default\n  icmp-block-inversion: no\n  interfaces: ens160\n  sources: \n  services: cockpit dhcpv6-client http ssh\n  ports: 8080/tcp\n  protocols: \n  forward: yes\n  masquerade: no\n  forward-ports: \n  source-ports: \n  icmp-blocks: \n  rich rules:';
    }
    
    if (command === 'firewall-cmd' && input.includes('--list-services')) {
        return 'cockpit dhcpv6-client http ssh';
    }
    
    if (command === 'firewall-cmd' && input.includes('--list-ports')) {
        return '8080/tcp';
    }
    
    // Task 7: Show hostname
    if (command === 'hostnamectl' || (command === 'hostnamectl' && input.includes('status'))) {
        return ' Static hostname: localhost.localdomain\n       Icon name: computer-vm\n         Chassis: vm\n      Machine ID: a1b2c3d4e5f67890abcdef1234567890\n         Boot ID: fedcba9876543210fedcba9876543210\n  Virtualization: vmware\nOperating System: Red Hat Enterprise Linux 9.3 (Plow)\n     CPE OS Name: cpe:/o:redhat:enterprise_linux:9::baseos\n          Kernel: Linux 5.14.0-362.el9.x86_64\n    Architecture: x86-64\n Hardware Vendor: VMware, Inc.\n  Hardware Model: VMware Virtual Platform';
    }
    
    if (command === 'cat' && input.includes('/etc/hostname')) {
        return 'localhost.localdomain';
    }
    
    // Task 8: Show IP addresses
    if (command === 'ip' && (input.includes('addr show') || input.includes('a'))) {
        return '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n       valid_lft forever preferred_lft forever\n    inet6 ::1/128 scope host \n       valid_lft forever preferred_lft forever\n2: ens160: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000\n    link/ether 00:0c:29:12:34:56 brd ff:ff:ff:ff:ff:ff\n    altname enp2s0\n    inet 192.168.1.50/24 brd 192.168.1.255 scope global noprefixroute ens160\n       valid_lft forever preferred_lft forever\n    inet6 fe80::20c:29ff:fe12:3456/64 scope link noprefixroute \n       valid_lft forever preferred_lft forever';
    }
    
    if (command === 'nmcli' && input.includes('device show')) {
        return 'GENERAL.DEVICE:                         ens160\nGENERAL.TYPE:                           ethernet\nGENERAL.HWADDR:                         00:0C:29:12:34:56\nGENERAL.MTU:                            1500\nGENERAL.STATE:                          100 (connected)\nGENERAL.CONNECTION:                     ens160\nIP4.ADDRESS[1]:                         192.168.1.50/24\nIP4.GATEWAY:                            192.168.1.1\nIP4.DNS[1]:                             192.168.1.1';
    }
    
    // Task 9: DNS lookup
    if (command === 'nslookup' && input.includes('redhat.com')) {
        return 'Server:\t\t192.168.1.1\nAddress:\t192.168.1.1#53\n\nNon-authoritative answer:\nName:\tredhat.com\nAddress: 52.200.142.250';
    }
    
    if (command === 'dig' && input.includes('redhat.com')) {
        return '; <<>> DiG 9.16.23-RH <<>> redhat.com\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345\n;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1\n\n;; QUESTION SECTION:\n;redhat.com.\t\t\tIN\tA\n\n;; ANSWER SECTION:\nredhat.com.\t\t300\tIN\tA\t52.200.142.250\n\n;; Query time: 12 msec\n;; SERVER: 192.168.1.1#53(192.168.1.1)\n;; WHEN: Sun Feb 23 12:45:30 EST 2026\n;; MSG SIZE  rcvd: 55';
    }
    
    if (command === 'host' && input.includes('redhat.com')) {
        return 'redhat.com has address 52.200.142.250\nredhat.com mail is handled by 10 mx1.redhat.com.';
    }
    
    // Task 12: Test network connectivity
    if (command === 'ping') {
        if (input.includes('8.8.8.8')) {
            return 'PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=12.3 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=115 time=11.8 ms\n64 bytes from 8.8.8.8: icmp_seq=3 ttl=115 time=12.1 ms\n\n--- 8.8.8.8 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2003ms\nrtt min/avg/max/mdev = 11.825/12.067/12.283/0.189 ms';
        }
        if (input.includes('192.168.1.100')) {
            return 'PING 192.168.1.100 (192.168.1.100) 56(84) bytes of data.\n64 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=0.234 ms\n64 bytes from 192.168.1.100: icmp_seq=2 ttl=64 time=0.198 ms\n64 bytes from 192.168.1.100: icmp_seq=3 ttl=64 time=0.256 ms\n\n--- 192.168.1.100 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2004ms\nrtt min/avg/max/mdev = 0.198/0.229/0.256/0.024 ms';
        }
        return 'PING localhost (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.035 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=2 ttl=64 time=0.041 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=3 ttl=64 time=0.038 ms\n\n--- localhost ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2048ms\nrtt min/avg/max/mdev = 0.035/0.038/0.041/0.002 ms';
    }
    
    // Task 10 (set4): Show SSH connections
    if (command === 'ss') {
        if (hasFlags(input, 'tn') && (input.includes('sport') || input.includes(':22'))) {
            return 'State      Recv-Q Send-Q Local Address:Port               Peer Address:Port              \nESTAB      0      0      192.168.1.50:22                 192.168.1.10:54321            \nESTAB      0      0      192.168.1.50:22                 192.168.1.11:54322';
        }
        if (input.includes('-tulnp') || input.includes('-tulpn')) {
            return 'Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  Process                                        \ntcp    LISTEN  0       128            0.0.0.0:22             0.0.0.0:*      users:(("sshd",pid=1098,fd=3))                \ntcp    LISTEN  0       511            0.0.0.0:80             0.0.0.0:*      users:(("httpd",pid=1234,fd=4))               \ntcp    LISTEN  0       511            0.0.0.0:443            0.0.0.0:*      users:(("httpd",pid=1234,fd=6))               \ntcp    LISTEN  0       128               [::]:22                [::]:*      users:(("sshd",pid=1098,fd=4))                \ntcp    LISTEN  0       511               [::]:80                [::]:*      users:(("httpd",pid=1234,fd=5))               \nudp    UNCONN  0       0              0.0.0.0:68             0.0.0.0:*      users:(("NetworkManager",pid=1045,fd=23))';
        }
        if (input.includes('-s')) {
            return 'Total: 187\nTCP:   45 (estab 12, closed 5, orphaned 0, timewait 3)\nTransport Total     IP        IPv6\nRAW\t  0         0         0        \nUDP\t  12        8         4        \nTCP\t  40        25        15       \nINET\t  52        33        19       \nFRAG\t  0         0         0';
        }
        return 'Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  \ntcp    ESTAB   0       0        192.168.1.50:22       192.168.1.10:54321\ntcp    ESTAB   0       0        192.168.1.50:80       192.168.1.15:48292';
    }
    
    if (command === 'who') {
        return 'root     pts/0        2026-02-23 10:15 (192.168.1.10)\nalice    pts/1        2026-02-23 11:30 (192.168.1.11)';
    }
    
    // firewall-cmd commands (Implementation tasks)
    if (command === 'firewall-cmd') {
        if (input.includes('--add-service')) {
            return 'success';
        }
        if (input.includes('--remove-service')) {
            return 'success';
        }
        if (input.includes('--add-port')) {
            return 'success';
        }
        if (input.includes('--remove-port')) {
            return 'success';
        }
        if (input.includes('--reload')) {
            return 'success';
        }
        if (input.includes('--set-default-zone')) {
            return 'success';
        }
    }
    
    // nmcli commands (Implementation tasks)
    if (command === 'nmcli') {
        if (input.includes('connection add') || input.includes('con add')) {
            if (input.includes('office')) {
                return 'Connection \'office\' (a1b2c3d4-e5f6-7890-abcd-ef1234567890) successfully added.';
            }
            if (input.includes('static-eth')) {
                return 'Connection \'static-eth\' (fedcba98-7654-3210-fedc-ba9876543210) successfully added.';
            }
            return 'Connection successfully added.';
        }
        if (input.includes('connection modify') || input.includes('con mod')) {
            return ''; // Silent success for modify
        }
        if (input.includes('connection up') || input.includes('con up')) {
            if (input.includes('office')) {
                return 'Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/3)';
            }
            return 'Connection successfully activated';
        }
        if (input.includes('connection down') || input.includes('con down')) {
            return 'Connection successfully deactivated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/3)';
        }
        if (input.includes('connection delete') || input.includes('con del')) {
            return ''; // Silent success
        }
        if (input.includes('connection reload') || input.includes('con reload')) {
            return ''; // Silent success
        }
    }
    
    // hostnamectl set-hostname (Implementation task)
    if (command === 'hostnamectl' && input.includes('set-hostname')) {
        return ''; // Silent success
    }
    
    // SSH key file ls/stat/cat outputs
    if (command === 'ls' && input.includes('.ssh')) {
        if (input.includes('authorized_keys')) {
            return '-rw------- 1 root root 395 Jan 20 10:00 /root/.ssh/authorized_keys';
        }
        if (input.includes('id_rsa.pub')) {
            return '-rw-r--r-- 1 root root 395 Jan 20 10:00 /root/.ssh/id_rsa.pub';
        }
        if (input.includes('id_rsa')) {
            if (hasFlags(input, 'lR') || hasFlags(input, 'R')) {
                return '/root/.ssh:\ntotal 16\n-rw------- 1 root root 1679 Jan 20 10:00 id_rsa\n-rw-r--r-- 1 root root  395 Jan 20 10:00 id_rsa.pub\n-rw------- 1 root root  395 Jan 20 10:00 authorized_keys';
            }
            return '-rw------- 1 root root 1679 Jan 20 10:00 /root/.ssh/id_rsa';
        }
    }
    
    if (command === 'stat' && input.includes('.ssh/id_rsa') && !input.includes('id_rsa.pub')) {
        return '  File: /root/.ssh/id_rsa\n  Size: 1679      \tBlocks: 8          IO Block: 4096   regular file\nDevice: fd00h/64768d\tInode: 12345      Links: 1\nAccess: (0600/-rw-------)  Uid: (    0/    root)   Gid: (    0/    root)\nAccess: 2026-01-20 10:00:00.000000000 -0500\nModify: 2026-01-20 10:00:00.000000000 -0500\nChange: 2026-01-20 10:00:00.000000000 -0500\n Birth: -';
    }
    
    if (command === 'cat' && input.includes('.ssh/authorized_keys')) {
        return 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDVeKGAp3FiuToqeXxYm1qVpayMeS2mDXBfHBF+gTmLz8JlKjPbZW8QkNrD1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL user@workstation';
    }
    
    if (command === 'cat' && input.includes('.ssh/id_rsa.pub')) {
        return 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDVeKGAp3FiuToqeXxYm1qVpayMeS2mDXBfHBF+gTmLz8JlKjPbZW8QkNrD1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL root@server1.example.com';
    }
    
    if (command === 'ssh-keygen' && input.includes('.ssh/id_rsa')) {
        return '2048 SHA256:mK3ABcDeFgHiJkLmNoPqRsTuVwXyZ1234567890abcd root@server1.example.com (RSA)';
    }
    
    if (command === 'ls' && hasFlags(input, 'lR') && input.includes('/opt/config')) {
        return '/opt/config:\ntotal 8\n-rw-r--r-- 1 root root 1024 Jan 20 10:00 app.conf\n-rw-r--r-- 1 root root 2048 Jan 20 10:00 db.conf';
    }
    
    if (command === 'ls' && hasFlags(input, 'l') && input.includes('/tmp/data.txt')) {
        return '-rw-r--r-- 1 root root 4096 Jan 20 14:00 /tmp/data.txt';
    }
    
    return null;
}

/**
 * Section 9: Containers - Output Generator
 */
function generateSection8PreCheck(task, command, input, tokens) {
    const questionSetIndex = getQuestionSetForSection(appState.currentSectionId);
    
    // Set 2, Task 1 Pre-check: Show connections before creating 'office'
    if (questionSetIndex === 2 && task.id === 1) {
        if (command === 'nmcli' && (input.includes('connection show') || input.includes('c s'))) {
            if (input.includes('office')) {
                return 'Error: connection \'office\' not found';
            }
            return 'NAME    UUID                                  TYPE      DEVICE \nens160  b2c3d4e5-f6a7-8901-bcde-f12345678901  ethernet  ens160\nvirbr0  fedcba98-7654-3210-fedc-ba9876543210  bridge    virbr0';
        }
    }
    
    // Set 2, Task 2 Pre-check: Show office connection without IP yet
    if (questionSetIndex === 2 && task.id === 2) {
        if (command === 'nmcli' && input.includes('connection show') && input.includes('office')) {
            return `connection.id:                          office\nconnection.uuid:                        a1b2c3d4-e5f6-7890-abcd-ef1234567890\nconnection.interface-name:              enp0s8\nconnection.type:                        802-3-ethernet\nipv4.method:                            auto\nipv4.addresses:                         \nipv4.gateway:                           \nipv4.dns:                               \nGENERAL.STATE:                          activated`;
        }
    }
    
    // Task 3 Pre-check: http service not in firewall yet
    if (task.id === 3) {
        if (command === 'firewall-cmd' && input.includes('--list-all')) {
            return 'public (active)\n  target: default\n  icmp-block-inversion: no\n  interfaces: ens160\n  sources: \n  services: cockpit dhcpv6-client ssh\n  ports: \n  protocols: \n  forward: yes\n  masquerade: no\n  forward-ports: \n  source-ports: \n  icmp-blocks: \n  rich rules:';
        }
        if (command === 'firewall-cmd' && input.includes('--list-services')) {
            return 'cockpit dhcpv6-client ssh';
        }
    }
    
    // Task 6 Pre-check: port 8080 not added yet
    if (task.id === 6) {
        if (command === 'firewall-cmd' && input.includes('--list-all')) {
            return 'public (active)\n  target: default\n  icmp-block-inversion: no\n  interfaces: ens160\n  sources: \n  services: cockpit dhcpv6-client http ssh\n  ports: \n  protocols: \n  forward: yes\n  masquerade: no\n  forward-ports: \n  source-ports: \n  icmp-blocks: \n  rich rules:';
        }
        if (command === 'firewall-cmd' && input.includes('--list-ports')) {
            return '';
        }
    }
    
    return null;
}

/**
 * Section 9: Containers - Pre-Check Generator
 */
