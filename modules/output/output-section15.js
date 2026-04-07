/** Red Cat - Section 15 */

function generateSection15Output(command, input, tokens) {
    // Date/time commands
    if (command === 'date') {
        if (!tokens[1]) {
            return 'Wed Feb 23 16:45:30 EST 2026';
        }
        if (input.includes('+%Z')) {
            return 'EST';
        }
        if (input.includes('+%z')) {
            return '-0500';
        }
    }
    
    if (command === 'timedatectl') {
        if (!tokens[1] || input.includes('status')) {
            return '               Local time: Wed 2026-02-23 16:45:30 EST\n           Universal time: Wed 2026-02-23 21:45:30 UTC\n                 RTC time: Wed 2026-02-23 21:45:30\n                Time zone: America/New_York (EST, -0500)\nSystem clock synchronized: yes\n              NTP service: active\n          RTC in local TZ: no';
        }
        if (input.includes('list-timezones')) {
            return 'Africa/Abidjan\nAfrica/Accra\nAfrica/Addis_Ababa\nAmerica/Chicago\nAmerica/Denver\nAmerica/Los_Angeles\nAmerica/New_York\nAsia/Tokyo\nEurope/London\nEurope/Paris\nUTC';
        }
    }
    
    if (command === 'hwclock') {
        return '2026-02-23 21:45:30.123456-05:00';
    }
    
    // Chrony commands
    if (command === 'chronyc' && input.includes('sources')) {
        if (input.includes('-v')) {
            return `  .-- Source mode  '^' = server, '=' = peer, '#' = local clock.
 / .- Source state '*' = current best, '+' = combined, '-' = not combined,
| /             'x' = may be in error, '~' = too variable, '?' = unusable.
||                                                 .- xxxx [ xxxx ] +/- xxxx
||      Reachability register (octal) -.           |  xxxx   xxxx     xxxx
||      Log2(Polling interval) --.      |          |   \\____ ____/   /   
||                                \\     |          |        /         |    
MS Name/IP address         Stratum Poll Reach LastRx Last sample               
===============================================================================
^* time1.google.com              1   6   377    23   +123us[ +145us] +/-   15ms
^- time2.google.com              1   6   377    24   +234us[ +256us] +/-   18ms
^+ time3.google.com              1   6   377    25   -156us[ -134us] +/-   16ms
^- time4.google.com              1   6   377    26   +789us[ +811us] +/-   22ms`;
        }
        return 'MS Name/IP address         Stratum Poll Reach LastRx Last sample               \n===============================================================================\n^* time1.google.com              1   6   377    23   +123us[ +145us] +/-   15ms\n^- time2.google.com              1   6   377    24   +234us[ +256us] +/-   18ms\n^+ time3.google.com              1   6   377    25   -156us[ -134us] +/-   16ms\n^- time4.google.com              1   6   377    26   +789us[ +811us] +/-   22ms';
    }
    
    if (command === 'chronyc' && input.includes('tracking')) {
        return 'Reference ID    : C0A80101 (time1.google.com)\nStratum         : 2\nRef time (UTC)  : Wed Feb 23 21:45:00 2026\nSystem time     : 0.000145234 seconds fast of NTP time\nLast offset     : +0.000123456 seconds\nRMS offset      : 0.000234567 seconds\nFrequency       : 23.456 ppm slow\nResidual freq   : +0.003 ppm\nSkew            : 0.124 ppm\nRoot delay      : 0.015432101 seconds\nRoot dispersion : 0.000987654 seconds\nUpdate interval : 64.3 seconds\nLeap status     : Normal';
    }
    
    if (command === 'chronyc' && input.includes('activity')) {
        return '200 OK\n4 sources online\n0 sources offline\n0 sources doing burst (return to online)\n0 sources doing burst (return to offline)\n0 sources with unknown address';
    }
    
    if (command === 'chronyc' && input.includes('sourcestats')) {
        return 'Name/IP Address            NP  NR  Span  Frequency  Freq Skew  Offset  Std Dev\n==============================================================================\ntime1.google.com            8   5   519     +0.012      0.124  +123us   234us\ntime2.google.com            8   5   519     +0.023      0.135  +234us   312us\ntime3.google.com            8   5   519     -0.015      0.128  -156us   245us\ntime4.google.com            8   5   519     +0.078      0.142  +789us   401us';
    }
    
    // Chrony config
    if (command === 'cat' && input.includes('/etc/chrony.conf')) {
        return '# Use public servers from the pool.ntp.org project.\n# Please consider joining the pool (https://www.pool.ntp.org/join.html).\npool 2.rhel.pool.ntp.org iburst\n\n# Use NTP servers from DHCP.\nsourcedir /run/chrony-dhcp\n\n# Record the rate  at which the system clock gains/losses time.\ndriftfile /var/lib/chrony/drift\n\n# Allow the system clock to be stepped in the first three updates\n# if its offset is larger than 1 second.\nmakestep 1.0 3\n\n# Enable kernel synchronization of the real-time clock (RTC).\nrtcsync\n\n# Enable hardware timestamping on all interfaces that support it.\n#hwtimestamp *\n\n# Serve time even if not synchronized to a time source.\n#local stratum 10\n\n# Specify file containing keys for NTP authentication.\nkeyfile /etc/chrony.keys\n\n# Save NTS keys and cookies.\nntsdumpdir /var/lib/chrony\n\n# Insert/delete leap seconds by slewing instead of stepping.\n#leapsecmode slew\n\n# Get TAI-UTC offset and leap seconds from the system tz database.\nleapsectz right/UTC\n\n# Specify directory for log files.\nlogdir /var/log/chrony\n\n# Select which information is logged.\n#log measurements statistics tracking';
    }
    
    if (command === 'cat' && input.includes('/var/lib/chrony/drift')) {
        return '23.456';
    }
    
    // systemctl chronyd status
    if (command === 'systemctl' && input.includes('status') && input.includes('chronyd')) {
        return '● chronyd.service - NTP client/server\n     Loaded: loaded (/usr/lib/systemd/system/chronyd.service; enabled; vendor preset: enabled)\n     Active: active (running) since Tue 2026-02-23 08:15:00 EST; 8h ago\n       Docs: man:chronyd(8)\n             man:chronyc(1)\n   Main PID: 1089 (chronyd)\n      Tasks: 1 (limit: 23065)\n     Memory: 2.1M\n        CPU: 123ms\n     CGroup: /system.slice/chronyd.service\n             └─1089 /usr/sbin/chronyd -F 2\n\nFeb 23 08:15:00 server1.example.com systemd[1]: Starting NTP client/server...\nFeb 23 08:15:00 server1.example.com chronyd[1089]: chronyd version 4.3 starting (+CMDMON +NTP +REFCLOCK +RTC +PRIVDROP +SCFILTER +SIGND +ASYNCDNS +NTS +SECHASH +IPV6 +DEBUG)\nFeb 23 08:15:00 server1.example.com chronyd[1089]: Frequency 23.456 +/- 0.124 ppm read from /var/lib/chrony/drift\nFeb 23 08:15:00 server1.example.com systemd[1]: Started NTP client/server.\nFeb 23 08:15:06 server1.example.com chronyd[1089]: Selected source 216.239.35.0 (time1.google.com)\nFeb 23 08:15:06 server1.example.com chronyd[1089]: System clock was stepped by 0.000123 seconds';
    }
    
    return null;
}

/**
 * Generate pre-check output for Implementation tasks (BEFORE state)
 * @param {object} task - The task object
 * @param {string} input - User's full input
 * @param {object} grepParsed - Parsed grep info if present
 * @returns {string|null} - Pre-check output or null
 */
