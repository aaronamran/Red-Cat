/** Red Cat - Section 13 */

function generateSection13Output(command, input, tokens) {
    // Crontab commands
    if (command === 'crontab' && input.includes('-l')) {
        return '# m h  dom mon dow   command\n0 2 * * * /usr/local/bin/backup.sh\n*/15 * * * * /usr/local/bin/check-disk.sh\n30 3 * * 1 /usr/local/bin/weekly-report.sh';
    }
    
    // at/atq commands
    if (command === 'atq' || (command === 'at' && input.includes('-l'))) {
        return '1\tWed Feb 24 10:00:00 2026 a root\n2\tThu Feb 25 15:30:00 2026 a root';
    }
    
    if (command === 'at' && input.includes('-c')) {
        return '#!/bin/sh\n# atrun uid=0 gid=0\n# mail     root 0\numask 22\ncd /root || {\n\t echo \'Execution directory inaccessible\' >&2\n\t exit 1\n}\n/usr/local/bin/cleanup.sh';
    }
    
    // systemctl timer commands
    if (command === 'systemctl' && input.includes('list-timers')) {
        return 'NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES                     \nWed 2026-02-24 00:00:00 EST 7h left       Tue 2026-02-23 00:00:00 EST 16h ago      dnf-makecache.timer          dnf-makecache.service\nWed 2026-02-24 03:10:00 EST 10h left      Tue 2026-02-23 03:10:00 EST 13h ago      systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service\nWed 2026-02-24 06:00:00 EST 13h left      Tue 2026-02-23 06:00:00 EST 10h ago      logrotate.timer              logrotate.service\n\n3 timers listed.';
    }
    
    // crond/atd status
    if (command === 'systemctl' && input.includes('status')) {
        if (input.includes('crond')) {
            return '● crond.service - Command Scheduler\n     Loaded: loaded (/usr/lib/systemd/system/crond.service; enabled; vendor preset: enabled)\n     Active: active (running) since Tue 2026-02-23 08:15:00 EST; 8h ago\n       Docs: man:crond(8)\n             man:crontab(5)\n   Main PID: 1145 (crond)\n      Tasks: 1 (limit: 23065)\n     Memory: 1.2M\n        CPU: 23ms\n     CGroup: /system.slice/crond.service\n             └─1145 /usr/sbin/crond -n';
        }
        if (input.includes('atd')) {
            return '● atd.service - Deferred execution scheduler\n     Loaded: loaded (/usr/lib/systemd/system/atd.service; enabled; vendor preset: enabled)\n     Active: active (running) since Tue 2026-02-23 08:15:00 EST; 8h ago\n   Main PID: 1156 (atd)\n      Tasks: 1 (limit: 23065)\n     Memory: 612.0K\n        CPU: 12ms\n     CGroup: /system.slice/atd.service\n             └─1156 /usr/sbin/atd -f';
        }
    }
    
    // Cron logs
    if (command === 'grep' && input.includes('CRON') && input.includes('/var/log/cron')) {
        return 'Feb 23 02:00:01 server1 CROND[12345]: (root) CMD (/usr/local/bin/backup.sh)\nFeb 23 02:15:01 server1 CROND[12456]: (root) CMD (/usr/local/bin/check-disk.sh)\nFeb 23 03:30:01 server1 CROND[12567]: (root) CMD (/usr/local/bin/weekly-report.sh)';
    }
    
    if (command === 'journalctl' && input.includes('crond')) {
        return 'Feb 23 02:00:01 server1 crond[1145]: (*system*) RELOAD (/etc/cron.d/0hourly)\nFeb 23 02:00:01 server1 crond[1145]: (root) CMD (/usr/local/bin/backup.sh)\nFeb 23 02:15:01 server1 crond[1145]: (root) CMD (/usr/local/bin/check-disk.sh)';
    }
    
    // anacron/cron directories
    if (command === 'ls') {
        if (input.includes('/etc/cron.daily')) {
            if (hasFlags(input, 'l')) {
                return 'total 8\n-rwxr-xr-x 1 root root 1819 Jan 20 09:00 logrotate\n-rwxr-xr-x 1 root root  712 Jan 20 09:00 man-db.cron';
            }
            return 'logrotate  man-db.cron';
        }
        if (input.includes('/etc/cron.hourly')) {
            if (hasFlags(input, 'l')) {
                return 'total 4\n-rwxr-xr-x 1 root root 392 Jan 20 09:00 0anacron';
            }
            return '0anacron';
        }
        if (input.includes('/etc/cron.d')) {
            if (hasFlags(input, 'l')) {
                return 'total 8\n-rw-r--r-- 1 root root 128 Jan 20 09:00 0hourly\n-rw-r--r-- 1 root root 235 Jan 20 09:00 sysstat';
            }
            return '0hourly  sysstat';
        }
    }
    
    if (command === 'cat' && input.includes('/etc/anacrontab')) {
        return '# /etc/anacrontab: configuration file for anacron\n\n# See anacron(8) and anacrontab(5) for details.\n\nSHELL=/bin/sh\nPATH=/sbin:/bin:/usr/sbin:/usr/bin\nMAILTO=root\n# the maximal random delay added to the base delay of the jobs\nRANDOM_DELAY=45\n# the jobs will be started during the following hours only\nSTART_HOURS_RANGE=3-22\n\n#period in days   delay in minutes   job-identifier   command\n1\t5\tcron.daily\t\tnice run-parts /etc/cron.daily\n7\t25\tcron.weekly\t\tnice run-parts /etc/cron.weekly\n@monthly 45\tcron.monthly\t\tnice run-parts /etc/cron.monthly';
    }
    
    return null;
}

/**
 * Section 14: Boot & GRUB - Output Generator
 */
