/** Red Cat - Section 9 */

function generateSection9Output(command, input, tokens) {
    // Task 1 & 3: List images
    if (command === 'podman' && (input.includes('images') || (input.includes('image') && input.includes('ls')))) {
        return 'REPOSITORY                 TAG         IMAGE ID      CREATED      SIZE\ndocker.io/library/nginx    latest      a1b2c3d4e5f6  2 weeks ago  187 MB';
    }
    
    // Task 5: List containers
    if (command === 'podman' && input.includes('ps')) {
        if (input.includes('-a')) {
            return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS                    PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  5 minutes ago  Exited (0) 1 minute ago   0.0.0.0:8080->80/tcp  webserver';
        }
        return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  5 minutes ago  Up 5 minutes  0.0.0.0:8080->80/tcp  webserver';
    }
    
    if (command === 'podman' && input.includes('container') && input.includes('ls')) {
        return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  5 minutes ago  Up 5 minutes  0.0.0.0:8080->80/tcp  webserver';
    }
    
    // Task 7: List stopped containers
    if (command === 'podman' && input.includes('ps') && input.includes('-a')) {
        return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS                    PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  10 minutes ago  Exited (0) 2 minutes ago  0.0.0.0:8080->80/tcp  webserver';
    }
    
    // Task 6 (set1) & Task 3 (set2): Inspect container/image
    if (command === 'podman' && input.includes('inspect')) {
        if (input.includes('nginx:alpine') || input.includes('nginx') && !input.includes('webapp') && !input.includes('webserver')) {
            return '[\n    {\n        "Id": "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890",\n        "Digest": "sha256:fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",\n        "RepoTags": [\n            "docker.io/library/nginx:alpine"\n        ],\n        "RepoDigests": [\n            "docker.io/library/nginx@sha256:fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210"\n        ],\n        "Parent": "",\n        "Comment": "",\n        "Created": "2026-02-09T10:15:32.123456789Z",\n        "Container": "",\n        "Config": {\n            "Hostname": "",\n            "Domainname": "",\n            "User": "",\n            "Env": [\n                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",\n                "NGINX_VERSION=1.25.3"\n            ],\n            "Cmd": [\n                "nginx",\n                "-g",\n                "daemon off;"\n            ],\n            "Image": "sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",\n            "Volumes": null,\n            "WorkingDir": "",\n            "Entrypoint": [\n                "/docker-entrypoint.sh"\n            ],\n            "Labels": {\n                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"\n            },\n            "StopSignal": "SIGQUIT"\n        },\n        "Architecture": "amd64",\n        "Os": "linux",\n        "Size": 41234567,\n        "VirtualSize": 41234567,\n        "GraphDriver": {\n            "Name": "overlay",\n            "Data": {\n                "UpperDir": "/var/lib/containers/storage/overlay/abc123/diff",\n                "WorkDir": "/var/lib/containers/storage/overlay/abc123/work"\n            }\n        },\n        "RootFS": {\n            "Type": "layers",\n            "Layers": [\n                "sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",\n                "sha256:fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",\n                "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"\n            ]\n        }\n    }\n]';
        }
        // Container inspect (webapp or webserver)
        return '[\n    {\n        "Id": "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",\n        "Created": "2026-02-23T10:15:32.123456789-05:00",\n        "Path": "nginx",\n        "Args": [\n            "-g",\n            "daemon off;"\n        ],\n        "State": {\n            "Status": "running",\n            "Running": true,\n            "Paused": false,\n            "Restarting": false,\n            "OOMKilled": false,\n            "Dead": false,\n            "Pid": 5678,\n            "ExitCode": 0,\n            "StartedAt": "2026-02-23T10:15:33.456789012-05:00",\n            "FinishedAt": "0001-01-01T00:00:00Z"\n        },\n        "Image": "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890",\n        "Name": "webserver",\n        "RestartCount": 0,\n        "Driver": "overlay",\n        "Platform": "linux",\n        "HostConfig": {\n            "NetworkMode": "bridge",\n            "PortBindings": {\n                "80/tcp": [\n                    {\n                        "HostIp": "0.0.0.0",\n                        "HostPort": "8080"\n                    }\n                ]\n            },\n            "RestartPolicy": {\n                "Name": "no",\n                "MaximumRetryCount": 0\n            }\n        },\n        "Config": {\n            "Hostname": "1234567890ab",\n            "Env": [\n                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",\n                "NGINX_VERSION=1.25.3"\n            ],\n            "Cmd": [\n                "nginx",\n                "-g",\n                "daemon off;"\n            ],\n            "Image": "docker.io/library/nginx:latest",\n            "WorkingDir": ""\n        },\n        "NetworkSettings": {\n            "Bridge": "",\n            "Gateway": "10.88.0.1",\n            "IPAddress": "10.88.0.15",\n            "IPPrefixLen": 16,\n            "MacAddress": "02:42:0a:58:00:0f",\n            "Networks": {\n                "bridge": {\n                    "Gateway": "10.88.0.1",\n                    "IPAddress": "10.88.0.15",\n                    "IPPrefixLen": 16,\n                    "MacAddress": "02:42:0a:58:00:0f"\n                }\n            },\n            "Ports": {\n                "80/tcp": [\n                    {\n                        "HostIp": "0.0.0.0",\n                        "HostPort": "8080"\n                    }\n                ]\n            }\n        },\n        "Mounts": []\n    }\n]';
    }
    
    // Task 5 (set2): Show container logs
    if (command === 'podman' && input.includes('logs')) {
        return '/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration\n/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/\n/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh\n10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf\n10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf\n/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh\n/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh\n/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh\n/docker-entrypoint.sh: Configuration complete; ready for start up\n2026/02/23 15:15:33 [notice] 1#1: using the "epoll" event method\n2026/02/23 15:15:33 [notice] 1#1: nginx/1.25.3\n2026/02/23 15:15:33 [notice] 1#1: built by gcc 12.2.1 20220924 (Alpine 12.2.1_git20220924-r10) \n2026/02/23 15:15:33 [notice] 1#1: OS: Linux 5.14.0-362.el9.x86_64\n2026/02/23 15:15:33 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576\n2026/02/23 15:15:33 [notice] 1#1: start worker processes\n2026/02/23 15:15:33 [notice] 1#1: start worker process 29\n192.168.1.10 - - [23/Feb/2026:15:16:45 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.76.1" "-"\n192.168.1.10 - - [23/Feb/2026:15:17:12 +0000] "GET /index.html HTTP/1.1" 200 615 "-" "Mozilla/5.0" "-"';
    }
    
    // podman run (Implementation tasks) - returns container ID
    if (command === 'podman' && input.includes('run')) {
        if (input.includes('-d')) {
            // Detached mode returns just container ID
            return '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        }
        // Interactive mode would show container output, but we'll return ID for simplicity
        return '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    }
    
    // podman pull (Implementation tasks) - shows download progress
    if (command === 'podman' && input.includes('pull')) {
        if (input.includes('nginx')) {
            return 'Trying to pull docker.io/library/nginx:latest...\nGetting image source signatures\nCopying blob sha256:a1b2c3d4e5f6...\nCopying blob sha256:fedcba987654...\nCopying blob sha256:112233445566...\nCopying config sha256:a1b2c3d4e5f6...\nWriting manifest to image destination\nStoring signatures\nsha256:a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890';
        }
        if (input.includes('httpd')) {
            return 'Trying to pull docker.io/library/httpd:latest...\nGetting image source signatures\nCopying blob sha256:abc123def456...\nCopying blob sha256:789012ghi345...\nCopying config sha256:fedcba987654...\nWriting manifest to image destination\nStoring signatures\nsha256:fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210';
        }
        return 'Trying to pull image...\nGetting image source signatures\nCopying blob...\nCopying config...\nWriting manifest to image destination\nStoring signatures';
    }
    
    // podman stop/start/restart (Implementation tasks) - returns container ID
    if (command === 'podman' && (input.includes('stop') || input.includes('start') || input.includes('restart'))) {
        if (input.includes('webserver')) {
            return 'webserver';
        }
        if (input.includes('webapp')) {
            return 'webapp';
        }
        return '1234567890ab'; // Returns first 12 chars of container ID
    }
    
    // podman rm/rmi (Implementation tasks) - returns container/image ID
    if (command === 'podman' && (input.includes(' rm ') || input.includes(' rmi '))) {
        if (input.includes('webserver')) {
            return '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        }
        if (input.includes('webapp')) {
            return '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        }
        if (input.includes('nginx')) {
            return 'Untagged: docker.io/library/nginx:latest\nDeleted: sha256:a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890';
        }
        return 'Deleted';
    }
    
    // podman generate systemd (Implementation task)
    if (command === 'podman' && input.includes('generate') && input.includes('systemd')) {
        return '# container-webserver.service\n# autogenerated by Podman 4.6.1\n# Sun Feb 23 10:15:32 EST 2026\n\n[Unit]\nDescription=Podman container-webserver.service\nDocumentation=man:podman-generate-systemd(1)\nWants=network-online.target\nAfter=network-online.target\nRequiresMountsFor=%t/containers\n\n[Service]\nEnvironment=PODMAN_SYSTEMD_UNIT=%n\nRestart=on-failure\nTimeoutStopSec=70\nExecStart=/usr/bin/podman start webserver\nExecStop=/usr/bin/podman stop -t 10 webserver\nExecStopPost=/usr/bin/podman rm -f webserver\nPIDFile=%t/containers/container-webserver.pid\nType=forking\n\n[Install]\nWantedBy=default.target';
    }
    
    return null;
}

/**
 * Section 10: Remote Resources - Output Generator
 */
function generateSection9PreCheck(task, command, input, tokens) {
    // Task 1 Pre-check: No images yet
    if (task.id === 1) {
        if (command === 'podman' && (input.includes('images') || (input.includes('image') && input.includes('ls')))) {
            return 'REPOSITORY  TAG  IMAGE ID  CREATED  SIZE';
        }
    }
    
    // Task 2 Pre-check: nginx not pulled yet
    if (task.id === 2) {
        if (command === 'podman' && (input.includes('images') || (input.includes('image') && input.includes('ls')))) {
            return 'REPOSITORY  TAG  IMAGE ID  CREATED  SIZE';
        }
    }
    
    // Task 4 Pre-check: No containers running yet
    if (task.id === 4) {
        if (command === 'podman' && input.includes('ps')) {
            if (input.includes('-a')) {
                return 'CONTAINER ID  IMAGE  COMMAND  CREATED  STATUS  PORTS  NAMES';
            }
            return 'CONTAINER ID  IMAGE  COMMAND  CREATED  STATUS  PORTS  NAMES';
        }
    }
    
    // Task 6 Pre-check: Container running (before stop)
    if (task.id === 6) {
        if (command === 'podman' && input.includes('ps')) {
            if (input.includes('-a')) {
                return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  5 minutes ago  Up 5 minutes  0.0.0.0:8080->80/tcp  webserver';
            }
            return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  5 minutes ago  Up 5 minutes  0.0.0.0:8080->80/tcp  webserver';
        }
    }
    
    // Task 8 Pre-check: Container exists (before remove)
    if (task.id === 8) {
        if (command === 'podman' && input.includes('ps') && input.includes('-a')) {
            return 'CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS                    PORTS                 NAMES\n1234567890ab  docker.io/library/nginx:latest  nginx -g daemon o...  10 minutes ago  Exited (0) 2 minutes ago  0.0.0.0:8080->80/tcp  webserver';
        }
    }
    
    return null;
}

/**
 * Section 10: Remote Resources - Pre-Check Generator
 */
