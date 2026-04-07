/** Red Cat - Section 5 */

function generateSection5Output(command, input, tokens) {
    // systemctl commands
    if (command === 'systemctl') {
        // Check httpd status
        if (input.includes('status') && input.includes('httpd')) {
            return '● httpd.service - The Apache HTTP Server\n     Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)\n     Active: active (running) since Sun 2026-02-23 10:15:32 EST; 2h 15min ago\n       Docs: man:httpd.service(8)\n   Main PID: 1234 (httpd)\n     Status: "Total requests: 0; Idle/Busy workers 100/0;Requests/sec: 0; Bytes served/sec:   0 B/sec"\n      Tasks: 213 (limit: 23065)\n     Memory: 24.5M\n        CPU: 1.234s\n     CGroup: /system.slice/httpd.service\n             ├─1234 /usr/sbin/httpd -DFOREGROUND\n             ├─1235 /usr/sbin/httpd -DFOREGROUND\n             ├─1236 /usr/sbin/httpd -DFOREGROUND\n             └─1237 /usr/sbin/httpd -DFOREGROUND\n\nFeb 23 10:15:32 localhost.localdomain systemd[1]: Starting The Apache HTTP Server...\nFeb 23 10:15:32 localhost.localdomain httpd[1234]: AH00558: httpd: Could not reliably determine server fully qualified domain name\nFeb 23 10:15:32 localhost.localdomain systemd[1]: Started The Apache HTTP Server.';
        }
        
        if (input.includes('is-active') && input.includes('httpd')) {
            return 'active';
        }
        
        // Check httpd enabled status
        if (input.includes('is-enabled') && input.includes('httpd')) {
            return 'enabled';
        }
        
        // systemctl enable commands (Implementation tasks)
        if (input.includes('enable') && !input.includes('--now') && !input.includes('is-enabled')) {
            if (input.includes('httpd')) {
                return 'Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.';
            }
            if (input.includes('firewalld')) {
                return 'Created symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service → /usr/lib/systemd/system/firewalld.service.\nCreated symlink /etc/systemd/system/multi-user.target.wants/firewalld.service → /usr/lib/systemd/system/firewalld.service.';
            }
            if (input.includes('sshd')) {
                return 'Created symlink /etc/systemd/system/multi-user.target.wants/sshd.service → /usr/lib/systemd/system/sshd.service.';
            }
            if (input.includes('crond')) {
                return 'Created symlink /etc/systemd/system/multi-user.target.wants/crond.service → /usr/lib/systemd/system/crond.service.';
            }
            // Generic enable output
            return 'Created symlink /etc/systemd/system/multi-user.target.wants/' + input.match(/enable\s+(\S+)/)?.[1] + '.service → /usr/lib/systemd/system/' + input.match(/enable\s+(\S+)/)?.[1] + '.service.';
        }
        
        // systemctl disable command (Implementation tasks)
        if (input.includes('disable') && !input.includes('--now')) {
            if (input.includes('httpd')) {
                return 'Removed /etc/systemd/system/multi-user.target.wants/httpd.service.';
            }
            if (input.includes('firewalld')) {
                return 'Removed /etc/systemd/system/multi-user.target.wants/firewalld.service.\nRemoved /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.';
            }
            // Generic disable output
            return 'Removed /etc/systemd/system/multi-user.target.wants/' + input.match(/disable\s+(\S+)/)?.[1] + '.service.';
        }
        
        // systemctl start/stop/restart (Implementation tasks - silent success)
        if (input.includes('start') || input.includes('stop') || input.includes('restart')) {
            if (!input.includes('status')) {
                return ''; // Silent on success
            }
        }
        
        // systemctl daemon-reload (Implementation task - silent success)
        if (input.includes('daemon-reload')) {
            return '';
        }
        
        // Get default boot target
        if (input.includes('get-default')) {
            return 'multi-user.target';
        }
        
        // Check crond status (stopped)
        if (input.includes('status') && input.includes('crond')) {
            return '○ crond.service - Command Scheduler\n     Loaded: loaded (/usr/lib/systemd/system/crond.service; enabled; vendor preset: enabled)\n     Active: inactive (dead) since Sun 2026-02-23 12:30:15 EST; 5min ago\n       Docs: man:crond(8)\n             man:crontab(5)\n    Process: 1145 ExecStart=/usr/sbin/crond -n $CRONDARGS (code=exited, status=0/SUCCESS)\n   Main PID: 1145 (code=exited, status=0/SUCCESS)\n        CPU: 12ms\n\nFeb 23 08:15:42 localhost.localdomain systemd[1]: Started Command Scheduler.\nFeb 23 12:30:15 localhost.localdomain systemd[1]: Stopping Command Scheduler...\nFeb 23 12:30:15 localhost.localdomain systemd[1]: crond.service: Deactivated successfully.\nFeb 23 12:30:15 localhost.localdomain systemd[1]: Stopped Command Scheduler.';
        }
        
        if (input.includes('is-active') && input.includes('crond')) {
            return 'inactive';
        }
        
        // sshd service status
        if (input.includes('status') && input.includes('sshd')) {
            return '● sshd.service - OpenSSH server daemon\n     Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)\n     Active: active (running) since Sun 2026-02-23 08:15:42 EST; 8h ago\n       Docs: man:sshd(8)\n             man:sshd_config(5)\n   Main PID: 1098 (sshd)\n      Tasks: 1 (limit: 23065)\n     Memory: 4.2M\n        CPU: 234ms\n     CGroup: /system.slice/sshd.service\n             └─1098 /usr/sbin/sshd -D';
        }
    }
    
    // journalctl commands
    if (command === 'journalctl') {
        // View journal errors
        if ((input.includes('-p') || input.includes('--priority')) && 
            (input.includes('err') || input.includes('3'))) {
            return '-- Journal begins at Mon 2026-02-23 08:15:30 EST, ends at Sun 2026-02-23 12:35:42 EST. --\nFeb 23 08:16:05 localhost.localdomain kernel: ACPI BIOS Error (bug): Could not resolve symbol\nFeb 23 08:16:12 localhost.localdomain systemd[1]: Failed to start Network Manager Wait Online.\nFeb 23 10:22:35 localhost.localdomain bluetoothd[892]: Failed to set privacy: Rejected (0x0b)';
        }
        
        // View httpd journal
        if ((input.includes('-u') || input.includes('--unit')) && input.includes('httpd')) {
            return '-- Journal begins at Mon 2026-02-23 08:15:30 EST, ends at Sun 2026-02-23 12:35:42 EST. --\nFeb 23 10:15:32 localhost.localdomain systemd[1]: Starting The Apache HTTP Server...\nFeb 23 10:15:32 localhost.localdomain httpd[1234]: Server configured, listening on: port 80\nFeb 23 10:15:32 localhost.localdomain systemd[1]: Started The Apache HTTP Server.';
        }
        
        // View crond journal
        if ((input.includes('-u') || input.includes('--unit')) && input.includes('crond')) {
            return '-- Journal begins at Mon 2026-02-23 08:15:30 EST, ends at Sun 2026-02-23 12:35:42 EST. --\nFeb 23 08:15:42 localhost.localdomain systemd[1]: Started Command Scheduler.\nFeb 23 12:30:15 localhost.localdomain systemd[1]: Stopping Command Scheduler...\nFeb 23 12:30:15 localhost.localdomain systemd[1]: crond.service: Deactivated successfully.';
        }
    }
    
    // ps commands - process listings
    if (command === 'ps') {
        // ps aux - full process list
        if (input.includes('aux') && !input.includes('grep') && !input.includes('sort')) {
            return 'USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot           1  0.0  0.1 243512 15632 ?        Ss   08:15   0:02 /usr/lib/systemd/systemd --switched-root --system --deserialize 18\nroot           2  0.0  0.0      0     0 ?        S    08:15   0:00 [kthreadd]\nroot           3  0.0  0.0      0     0 ?        I<   08:15   0:00 [rcu_gp]\nroot        1098  0.0  0.0 112860  7420 ?        Ss   08:15   0:00 /usr/sbin/sshd -D\nroot        1145  0.0  0.0  25388  2548 ?        Ss   08:15   0:00 /usr/sbin/crond -n\napache      1234  0.2  0.5 224080 87456 ?        Ss   10:15   0:02 /usr/sbin/httpd -DFOREGROUND\napache      1235  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND\napache      1236  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND\napache      1237  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND\nroot        2345  0.1  0.2  62488 34512 ?        Ss   11:00   0:05 /usr/bin/python3 /usr/sbin/firewalld --nofork --nopid\nroot        3456  0.0  0.1  53764  9876 ?        Ss   08:15   0:00 /usr/sbin/rsyslogd -n\nroot        4567  0.0  0.0      0     0 ?        I    12:00   0:00 [kworker/0:1-events]\nroot        5678  0.0  0.0   9876  3456 pts/0    R+   16:45   0:00 ps aux';
        }
        
        // ps -ef - process list with parent PIDs
        if (hasFlags(input, 'ef')) {
            return 'UID          PID    PPID  C STIME TTY          TIME CMD\nroot           1       0  0 08:15 ?        00:00:02 /usr/lib/systemd/systemd --switched-root --system\nroot           2       0  0 08:15 ?        00:00:00 [kthreadd]\nroot        1098       1  0 08:15 ?        00:00:00 /usr/sbin/sshd -D\nroot       1145       1  0 08:15 ?        00:00:00 /usr/sbin/crond -n\napache      1234       1  0 10:15 ?        00:00:02 /usr/sbin/httpd -DFOREGROUND\napache      1235    1234  0 10:15 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND\napache      1236    1234  0 10:15 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND\napache      1237    1234  0 10:15 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND\nroot        2345       1  0 11:00 ?        00:00:05 /usr/bin/python3 /usr/sbin/firewalld --nofork\nroot        3456       1  0 08:15 ?        00:00:00 /usr/sbin/rsyslogd -n';
        }
        
        // ps aux with grep httpd
        if (input.includes('aux') && input.includes('grep') && input.includes('httpd')) {
            return 'apache      1234  0.2  0.5 224080 87456 ?        Ss   10:15   0:02 /usr/sbin/httpd -DFOREGROUND\napache      1235  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND\napache      1236  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND\napache      1237  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND';
        }
        
        // ps -p <PID> - specific process
        if (input.includes('-p') && input.includes('1234')) {
            return '  PID TTY      STAT   TIME COMMAND\n 1234 ?        Ss     0:02 /usr/sbin/httpd -DFOREGROUND';
        }
        
        // ps aux --sort=-pcpu - sorted by CPU usage
        if (input.includes('sort') && input.includes('pcpu')) {
            return 'USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\napache      1234  0.2  0.5 224080 87456 ?        Ss   10:15   0:02 /usr/sbin/httpd -DFOREGROUND\nroot        2345  0.1  0.2  62488 34512 ?        Ss   11:00   0:05 /usr/bin/python3 /usr/sbin/firewalld --nofork\nroot           1  0.0  0.1 243512 15632 ?        Ss   08:15   0:02 /usr/lib/systemd/systemd --switched-root\nroot        1098  0.0  0.0 112860  7420 ?        Ss   08:15   0:00 /usr/sbin/sshd -D\napache      1235  0.0  0.5 224216 87592 ?        S    10:15   0:00 /usr/sbin/httpd -DFOREGROUND';
        }
        
        // ps auxf - forest view
        if (input.includes('auxf')) {
            return 'USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot           1  0.0  0.1 243512 15632 ?        Ss   08:15   0:02 /usr/lib/systemd/systemd --switched-root\nroot        1098  0.0  0.0 112860  7420 ?        Ss   08:15   0:00  \\_ /usr/sbin/sshd -D\napache      1234  0.2  0.5 224080 87456 ?        Ss   10:15   0:02  \\_ /usr/sbin/httpd -DFOREGROUND\napache      1235  0.0  0.5 224216 87592 ?        S    10:15   0:00      \\_ /usr/sbin/httpd -DFOREGROUND\napache      1236  0.0  0.5 224216 87592 ?        S    10:15   0:00      \\_ /usr/sbin/httpd -DFOREGROUND\napache      1237  0.0  0.5 224216 87592 ?        S    10:15   0:00      \\_ /usr/sbin/httpd -DFOREGROUND';
        }
    }
    
    // pgrep - find process IDs
    if (command === 'pgrep') {
        if (input.includes('httpd')) {
            return '1234\n1235\n1236\n1237';
        }
        if (input.includes('sshd')) {
            return '1098';
        }
        if (input.includes('crond')) {
            return '1145';
        }
    }
    
    // pstree - process tree
    if (command === 'pstree') {
        return 'systemd─┬─ModemManager───2*[{ModemManager}]\n        ├─NetworkManager───2*[{NetworkManager}]\n        ├─accounts-daemon───2*[{accounts-daemon}]\n        ├─crond\n        ├─dbus-daemon\n        ├─firewalld───{firewalld}\n        ├─httpd───3*[httpd]\n        ├─polkitd───2*[{polkitd}]\n        ├─rsyslogd───2*[{rsyslogd}]\n        ├─sshd\n        ├─systemd-journal\n        ├─systemd-logind\n        └─systemd-udevd';
    }
    
    // top - process monitor
    if (command === 'top') {
        return 'top - 16:45:30 up  8:30,  1 user,  load average: 0.15, 0.21, 0.18\nTasks: 187 total,   1 running, 186 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  1.2 us,  0.5 sy,  0.0 ni, 98.0 id,  0.2 wa,  0.0 hi,  0.1 si,  0.0 st\nMiB Mem :  15872.5 total,  10234.2 free,   2456.8 used,   3181.5 buff/cache\nMiB Swap:   2048.0 total,   2048.0 free,      0.0 used.  12845.6 avail Mem\n\n    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n   1234 apache    20   0  224080  87456  12345 S   0.2   0.5   0:02.34 httpd\n   2345 root      20   0   62488  34512   8765 S   0.1   0.2   0:05.12 firewalld\n      1 root      20   0  243512  15632  10234 S   0.0   0.1   0:02.45 systemd\n   1098 root      20   0  112860   7420   5432 S   0.0   0.0   0:00.12 sshd\n   1145 root      20   0   25388   2548   1876 S   0.0   0.0   0:00.05 crond\n   1235 apache    20   0  224216  87592  12356 S   0.0   0.5   0:00.45 httpd\n   1236 apache    20   0  224216  87592  12356 S   0.0   0.5   0:00.43 httpd\n   1237 apache    20   0  224216  87592  12356 S   0.0   0.5   0:00.41 httpd\n   3456 root      20   0   53764   9876   6543 S   0.0   0.1   0:00.23 rsyslogd';
    }
    
    // kill verification - no output for successful kill
    if (command === 'kill') {
        return ''; // kill produces no output on success
    }
    
    // pkill verification - no output for successful kill
    if (command === 'pkill') {
        return ''; // pkill produces no output on success
    }
    
    // View httpd PID file
    if ((command === 'cat' || command === 'less' || command === 'more') && 
        input.includes('/tmp/httpd-pid.txt')) {
        return '1234';
    }
    
    return null;
}

/**
 * Section 6: File Systems - Output Generator
 */
function generateSection5PreCheck(task, command, input, tokens) {
    // Task 1 Pre-check: httpd not running yet
    if (task.id === 1) {
        if (command === 'systemctl' && input.includes('status') && input.includes('httpd')) {
            return '○ httpd.service - The Apache HTTP Server\n     Loaded: loaded (/usr/lib/systemd/system/httpd.service; disabled; vendor preset: disabled)\n     Active: inactive (dead)\n       Docs: man:httpd.service(8)';
        }
        if (command === 'systemctl' && input.includes('is-active') && input.includes('httpd')) {
            return 'inactive';
        }
    }
    
    // Task 3 Pre-check: httpd not enabled yet
    if (task.id === 3) {
        if (command === 'systemctl' && input.includes('is-enabled') && input.includes('httpd')) {
            return 'disabled';
        }
    }
    
    // Task 5 Pre-check: default target is graphical
    if (task.id === 5) {
        if (command === 'systemctl' && input.includes('get-default')) {
            return 'graphical.target';
        }
    }
    
    // Task 7 Pre-check: crond is running
    if (task.id === 7) {
        if (command === 'systemctl' && input.includes('status') && input.includes('crond')) {
            return '● crond.service - Command Scheduler\n     Loaded: loaded (/usr/lib/systemd/system/crond.service; enabled; vendor preset: enabled)\n     Active: active (running) since Sun 2026-02-23 08:15:42 EST; 4h 15min ago\n       Docs: man:crond(8)\n             man:crontab(5)\n   Main PID: 1145 (crond)\n      Tasks: 1 (limit: 23065)\n     Memory: 1.2M\n        CPU: 12ms\n     CGroup: /system.slice/crond.service\n             └─1145 /usr/sbin/crond -n';
        }
        if (command === 'systemctl' && input.includes('is-active') && input.includes('crond')) {
            return 'active';
        }
    }
    
    // Task 11 Pre-check: PID file doesn't exist yet
    if (task.id === 11) {
        if ((command === 'cat' || command === 'less' || command === 'more') && 
            input.includes('/tmp/httpd-pid.txt')) {
            return `${command}: /tmp/httpd-pid.txt: No such file or directory`;
        }
        if (command === 'ls' && input.includes('-l') && input.includes('/tmp/httpd-pid.txt')) {
            return 'ls: cannot access \'/tmp/httpd-pid.txt\': No such file or directory';
        }
    }
    
    return null;
}
/**
 * Section 6 Pre-Check Output (BEFORE state)
 */
