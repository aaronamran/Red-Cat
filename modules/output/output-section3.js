/** Red Cat - Section 3 */

function generateSection3Output(command, input, tokens) {
    // Handle ls commands
    if (command === 'ls') {
        if (hasFlags(input, 'ld') && input.includes('/mnt/backup')) {
            return 'drwxr-xr-x 2 root root 4096 Jan 20 10:00 /mnt/backup';
        }
        if (hasFlags(input, 'ld') && input.includes('/media/usb')) {
            return 'drwxr-xr-x 2 root root 4096 Jan 20 10:00 /media/usb';
        }
        if (hasFlags(input, 'ld') && input.includes('/mnt/external')) {
            return 'drwxr-xr-x 2 root root 4096 Jan 20 10:00 /mnt/external';
        }
        if (input.includes('/mnt') && !input.includes('/mnt/backup')) {
            return 'backup';
        }
        if (input.includes('/media')) {
            return 'usb';
        }
        if (hasFlags(input, 'lh') && input.includes('httpd-backup.tar.gz')) {
            return '-rw-r--r-- 1 root root 2.4K Jan 20 14:30 /tmp/httpd-backup.tar.gz';
        }
        if (input.includes('httpd-backup.tar.gz') && !hasFlags(input, 'l')) {
            return '/tmp/httpd-backup.tar.gz';
        }
        if (hasFlags(input, 'lh') && input.includes('logs-backup.tar.bz2')) {
            return '-rw-r--r-- 1 root root 8.5K Jan 20 14:45 logs-backup.tar.bz2';
        }
        if (input.includes('logs-backup.tar.bz2') && !hasFlags(input, 'l')) {
            return 'logs-backup.tar.bz2';
        }
        if (hasFlags(input, 'lh') && input.includes('data-backup.tar.gz')) {
            return '-rw-r--r-- 1 root root 245K Jan 20 14:30 data-backup.tar.gz';
        }
        if (input.includes('data-backup.tar.gz') && !hasFlags(input, 'lh')) {
            return 'data-backup.tar.gz';
        }
        if (hasFlags(input, 'lR') && input.includes('/backup/databases')) {
            return '/backup/databases:\ntotal 12\ndrwxr-xr-x 2 root root 4096 Jan 20 10:00 mysql\ndrwxr-xr-x 2 root root 4096 Jan 20 10:00 postgres\n\n/backup/databases/mysql:\ntotal 8\n-rw-r--r-- 1 root root 1234 Jan 20 10:00 backup.sql\n\n/backup/databases/postgres:\ntotal 8\n-rw-r--r-- 1 root root 2345 Jan 20 10:00 dump.sql';
        }
        if (hasFlags(input, 'ld') && input.includes('/backup/databases/mysql')) {
            return 'drwxr-xr-x 2 root root 4096 Jan 20 10:00 /backup/databases/mysql';
        }
        if (hasFlags(input, 'ld') && input.includes('/backup/databases')) {
            return 'drwxr-xr-x 3 root root 4096 Jan 20 10:00 /backup/databases';
        }
        if (input.includes('/backup') && hasFlags(input, 'lR')) {
            return '/backup:\ntotal 4\ndrwxr-xr-x 3 root root 4096 Jan 20 10:00 databases\n\n/backup/databases:\ntotal 8\ndrwxr-xr-x 2 root root 4096 Jan 20 10:00 mysql\ndrwxr-xr-x 2 root root 4096 Jan 20 10:00 postgres\n\n/backup/databases/mysql:\ntotal 8\n-rw-r--r-- 1 root root 1234 Jan 20 10:00 backup.sql\n\n/backup/databases/postgres:\ntotal 8\n-rw-r--r-- 1 root root 2345 Jan 20 10:00 dump.sql';
        }
        if (hasFlags(input, 'lR') && input.includes('/restore')) {
            return '/restore:\ntotal 4\ndrwxr-xr-x 3 root root 4096 Jan 20 15:00 etc\n\n/restore/etc:\ntotal 4\ndrwxr-xr-x 3 root root 4096 Jan 20 15:00 httpd\n\n/restore/etc/httpd:\ntotal 8\ndrwxr-xr-x 2 root root 4096 Jan 20 15:00 conf\ndrwxr-xr-x 2 root root 4096 Jan 20 15:00 conf.d';
        }
        if (hasFlags(input, 'l') && input.includes('/restore/etc/httpd')) {
            return 'total 8\ndrwxr-xr-x 2 root root 4096 Jan 20 15:00 conf\ndrwxr-xr-x 2 root root 4096 Jan 20 15:00 conf.d';
        }
        if (input.includes('/restore/etc/httpd')) {
            return 'conf  conf.d';
        }
        if (input.includes('/restore/etc')) {
            return 'httpd';
        }
    }
    
    // Handle df commands
    if (command === 'df') {
        if (input.includes('/mnt/backup')) {
            return 'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sdb1       10485760 2097152   8388608  20% /mnt/backup';
        }
        if (input.includes('/mnt/external')) {
            return 'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sdb1       10485760 2097152   8388608  20% /mnt/external';
        }
        if (input.includes('/media/usb')) {
            return 'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sdc1        5242880 1048576   4194304  20% /media/usb';
        }
    }
    
    // Handle findmnt commands
    if (command === 'findmnt') {
        if (input.includes('/mnt/backup')) {
            return 'TARGET       SOURCE    FSTYPE OPTIONS\n/mnt/backup  /dev/sdb1 ext4   rw,relatime';
        }
        if (input.includes('/mnt/external')) {
            return 'TARGET         SOURCE    FSTYPE OPTIONS\n/mnt/external  /dev/sdb1 ext4   rw,relatime';
        }
        if (input.includes('/media/usb')) {
            return 'TARGET      SOURCE    FSTYPE OPTIONS\n/media/usb  /dev/sdc1 vfat   rw,relatime';
        }
    }
    
    // Handle mount commands
    if (command === 'mount') {
        if (input.includes('/mnt/backup') || (input.includes('/dev/sdb1') && !input.includes('/dev/sdb'))) {
            return '/dev/sdb1 on /mnt/backup type ext4 (rw,relatime)';
        }
        if (input.includes('/mnt/external')) {
            return '/dev/sdb1 on /mnt/external type ext4 (rw,relatime)';
        }
        if (input.includes('/media/usb') || input.includes('/dev/sdc1')) {
            return '/dev/sdc1 on /media/usb type vfat (rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=utf8)';
        }
    }
    
    // Handle blkid commands
    if (command === 'blkid') {
        if (input.includes('/dev/sdb1')) {
            return '/dev/sdb1: UUID="a1b2c3d4-e5f6-7890-abcd-ef1234567890" TYPE="ext4" PARTUUID="12345678-01"';
        }
        if (input.includes('/dev/sdc1')) {
            return '/dev/sdc1: UUID="fedcba98-7654-3210-fedc-ba9876543210" TYPE="vfat" PARTUUID="87654321-01"';
        }
        if (input.includes('/dev/sdd1')) {
            return '/dev/sdd1: UUID="11223344-5566-7788-99aa-bbccddeeff00" TYPE="xfs" PARTUUID="aabbccdd-01"';
        }
        if (input.includes('/dev/sde1')) {
            return '/dev/sde1: UUID="99887766-5544-3322-1100-ffeeddccbbaa" TYPE="ext4" PARTUUID="ffeeddcc-01"';
        }
        if (input.includes('/dev/sdf1')) {
            return '/dev/sdf1: UUID="aaaabbbb-cccc-dddd-eeee-ffff00001111" TYPE="LVM2_member" PARTUUID="11112222-01"';
        }
    }
    
    // Handle cat commands
    if (command === 'cat') {
        if (input.includes('/tmp/uuid.txt')) {
            return 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
        }
    }
    
    // Handle tar commands
    if (command === 'tar') {
        if (hasFlags(input, 'tzf') && input.includes('data-backup.tar.gz')) {
            return '/opt/data/\n/opt/data/file1.txt\n/opt/data/file2.txt\n/opt/data/config.conf\n/opt/data/subdir/\n/opt/data/subdir/data.db';
        }
        if (hasFlags(input, 'tzf') && input.includes('httpd-backup.tar.gz')) {
            return 'etc/httpd/\netc/httpd/conf/\netc/httpd/conf/httpd.conf\netc/httpd/conf.d/\netc/httpd/conf.d/ssl.conf';
        }
        if (hasFlags(input, 'tjf') && input.includes('logs-backup.tar.bz2')) {
            return 'var/log/\nvar/log/messages\nvar/log/secure\nvar/log/httpd/\nvar/log/httpd/access_log\nvar/log/httpd/error_log\nvar/log/audit/\nvar/log/audit/audit.log';
        }
    }
    
    // LVM Physical Volume commands
    if (command === 'pvs') {
        if (!tokens[1]) {
            return '  PV         VG      Fmt  Attr PSize   PFree  \n  /dev/sdb1  datavg  lvm2 a--   <10.00g   5.00g\n  /dev/sdc1  datavg  lvm2 a--    <5.00g   2.00g\n  /dev/sdd1  appvg   lvm2 a--    <8.00g   3.00g\n  /dev/sde1  appvg   lvm2 a--    <8.00g   4.00g';
        }
        if (input.includes('/dev/sdb1')) {
            return '  PV         VG      Fmt  Attr PSize   PFree  \n  /dev/sdb1  datavg  lvm2 a--   <10.00g   5.00g';
        }
        if (input.includes('/dev/sdf1')) {
            return '  PV         VG   Fmt  Attr PSize  PFree \n  /dev/sdf1       lvm2 ---   8.00g  8.00g';
        }
    }
    
    if (command === 'pvdisplay') {
        if (input.includes('/dev/sdb1')) {
            return '  --- Physical volume ---\n  PV Name               /dev/sdb1\n  VG Name               datavg\n  PV Size               10.00 GiB / not usable 4.00 MiB\n  Allocatable           yes \n  PE Size               4.00 MiB\n  Total PE              2559\n  Free PE               1280\n  Allocated PE          1279\n  PV UUID               a1b2c3d4-e5f6-7890-abcd-ef1234567890';
        }
        if (input.includes('/dev/sdf1')) {
            return '  --- Physical volume ---\n  PV Name               /dev/sdf1\n  VG Name               \n  PV Size               8.00 GiB\n  Allocatable           NO\n  PE Size               8.00 MiB\n  Total PE              1024\n  Free PE               1024\n  Allocated PE          0\n  PV UUID               aaaabbbb-cccc-dddd-eeee-ffff00001111';
        }
    }
    
    if (command === 'pvscan') {
        return '  PV /dev/sdb1   VG datavg          lvm2 [<10.00 GiB / 5.00 GiB free]\n  PV /dev/sdc1   VG datavg          lvm2 [<5.00 GiB / 2.00 GiB free]\n  PV /dev/sdd1   VG appvg           lvm2 [<8.00 GiB / 3.00 GiB free]\n  PV /dev/sde1   VG appvg           lvm2 [<8.00 GiB / 4.00 GiB free]\n  Total: 4 [30.99 GiB] / in use: 4 [30.99 GiB] / in no VG: 0 [0   ]';
    }
    
    // LVM Volume Group commands
    if (command === 'vgs') {
        if (!tokens[1]) {
            return '  VG     #PV #LV #SN Attr   VSize   VFree \n  appvg    2   2   0 wz--n- <15.99g  7.00g\n  datavg   2   1   0 wz--n- <14.99g  7.00g';
        }
        if (input.includes('datavg')) {
            return '  VG     #PV #LV #SN Attr   VSize   VFree \n  datavg   2   1   0 wz--n- <14.99g  7.00g';
        }
        if (input.includes('appvg')) {
            return '  VG     #PV #LV #SN Attr   VSize   VFree \n  appvg    2   2   0 wz--n- <15.99g  7.00g';
        }
        if (input.includes('prodvg')) {
            return '  VG      #PV #LV #SN Attr   VSize   VFree \n  prodvg    2   2   0 wz--n- <15.99g  7.00g';
        }
        if (input.includes('-v')) {
            return '  VG     Attr   Ext   #PV #LV #SN VSize   VFree  VG UUID                                \n  appvg  wz--n- 4.00m   2   2   0 <15.99g  7.00g  bbbbcccc-dddd-eeee-ffff-000011112222\n  datavg wz--n- 4.00m   2   1   0 <14.99g  7.00g  ccccdddd-eeee-ffff-0000-111122223333';
        }
    }
    
    if (command === 'vgdisplay') {
        if (input.includes('datavg')) {
            return '  --- Volume group ---\n  VG Name               datavg\n  System ID             \n  Format                lvm2\n  Metadata Areas        2\n  Metadata Sequence No  3\n  VG Access             read/write\n  VG Status             resizable\n  MAX LV                0\n  Cur LV                1\n  Open LV               1\n  Max PV                0\n  Cur PV                2\n  Act PV                2\n  VG Size               14.99 GiB\n  PE Size               4.00 MiB\n  Total PE              3837\n  Alloc PE / Size       2048 / 8.00 GiB\n  Free  PE / Size       1789 / 7.00 GiB\n  VG UUID               ccccdddd-eeee-ffff-0000-111122223333';
        }
        if (input.includes('appvg')) {
            return '  --- Volume group ---\n  VG Name               appvg\n  System ID             \n  Format                lvm2\n  Metadata Areas        2\n  Metadata Sequence No  5\n  VG Access             read/write\n  VG Status             resizable\n  MAX LV                0\n  Cur LV                2\n  Open LV               0\n  Max PV                0\n  Cur PV                2\n  Act PV                2\n  VG Size               15.99 GiB\n  PE Size               8.00 MiB\n  Total PE              2046\n  Alloc PE / Size       1152 / 9.00 GiB\n  Free  PE / Size       894 / 7.00 GiB\n  VG UUID               bbbbcccc-dddd-eeee-ffff-000011112222';
        }
        if (input.includes('prodvg')) {
            return '  --- Volume group ---\n  VG Name               prodvg\n  System ID             \n  Format                lvm2\n  Metadata Areas        2\n  Metadata Sequence No  5\n  VG Access             read/write\n  VG Status             resizable\n  MAX LV                0\n  Cur LV                2\n  Open LV               0\n  Max PV                0\n  Cur PV                2\n  Act PV                2\n  VG Size               15.99 GiB\n  PE Size               8.00 MiB\n  Total PE              2046\n  Alloc PE / Size       1152 / 9.00 GiB\n  Free  PE / Size       894 / 7.00 GiB\n  VG UUID               bbbbcccc-dddd-eeee-ffff-000011112222';
        }
    }
    
    if (command === 'vgscan') {
        return '  Found volume group "appvg" using metadata type lvm2\n  Found volume group "datavg" using metadata type lvm2';
    }
    
    // LVM Logical Volume commands
    if (command === 'lvs') {
        if (!tokens[1]) {
            return '  LV     VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert\n  dblv   appvg  -wi-a-----   2.00g                                                    \n  applv  datavg -wi-ao---- 500.00m                                                    \n  weblv  datavg -wi-a----- 700.00m';
        }
        if (input.includes('datavg/applv') || input.includes('applv')) {
            return '  LV    VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert\n  applv datavg -wi-ao---- 500.00m';
        }
        if (input.includes('datavg/weblv') || input.includes('weblv')) {
            return '  LV    VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert\n  weblv datavg -wi-a----- 700.00m';
        }
        if (input.includes('appvg/dblv') || input.includes('dblv')) {
            return '  LV   VG    Attr       LSize Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert\n  dblv appvg -wi-a----- 2.00g';
        }
    }
    
    if (command === 'lvdisplay') {
        if (input.includes('/dev/datavg/applv') || input.includes('datavg/applv')) {
            return '  --- Logical volume ---\n  LV Path                /dev/datavg/applv\n  LV Name                applv\n  VG Name                datavg\n  LV UUID                11112222-3333-4444-5555-666677778888\n  LV Write Access        read/write\n  LV Creation host, time server1.example.com, 2026-02-23 10:00:00 -0500\n  LV Status              available\n  # open                 1\n  LV Size                500.00 MiB\n  Current LE             128\n  Segments               1\n  Allocation             inherit\n  Read ahead sectors     auto\n  - currently set to     256\n  Block device           253:0';
        }
        if (input.includes('/dev/datavg/weblv') || input.includes('datavg/weblv')) {
            return '  --- Logical volume ---\n  LV Path                /dev/datavg/weblv\n  LV Name                weblv\n  VG Name                datavg\n  LV UUID                22223333-4444-5555-6666-777788889999\n  LV Write Access        read/write\n  LV Creation host, time server1.example.com, 2026-02-23 11:00:00 -0500\n  LV Status              available\n  # open                 0\n  LV Size                700.00 MiB\n  Current LE             175\n  Segments               1\n  Allocation             inherit\n  Read ahead sectors     auto\n  - currently set to     256\n  Block device           253:1';
        }
        if (input.includes('/dev/appvg/dblv') || input.includes('appvg/dblv')) {
            return '  --- Logical volume ---\n  LV Path                /dev/appvg/dblv\n  LV Name                dblv\n  VG Name                appvg\n  LV UUID                33334444-5555-6666-7777-888899990000\n  LV Write Access        read/write\n  LV Creation host, time server1.example.com, 2026-02-23 12:00:00 -0500\n  LV Status              available\n  # open                 0\n  LV Size                2.00 GiB\n  Current LE             256\n  Segments               1\n  Allocation             inherit\n  Read ahead sectors     auto\n  - currently set to     256\n  Block device           253:2';
        }
    }
    
    if (command === 'lvscan') {
        return "  ACTIVE            '/dev/datavg/applv' [500.00 MiB] inherit\n  ACTIVE            '/dev/datavg/weblv' [700.00 MiB] inherit\n  ACTIVE            '/dev/appvg/dblv' [2.00 GiB] inherit";
    }
    
    // LVM Creation/Modification commands (Implementation tasks)
    if (command === 'pvcreate') {
        if (input.includes('/dev/sdf1')) {
            return '  Physical volume "/dev/sdf1" successfully created.';
        }
        if (input.includes('/dev/sdb1')) {
            return '  Physical volume "/dev/sdb1" successfully created.';
        }
        if (input.includes('/dev/sdc1')) {
            return '  Physical volume "/dev/sdc1" successfully created.';
        }
        return '  Physical volume successfully created.';
    }
    
    if (command === 'vgcreate') {
        if (input.includes('datavg')) {
            return '  Volume group "datavg" successfully created';
        }
        if (input.includes('appvg')) {
            return '  Volume group "appvg" successfully created';
        }
        if (input.includes('prodvg')) {
            return '  Volume group "prodvg" successfully created';
        }
        return '  Volume group successfully created';
    }
    
    if (command === 'vgextend') {
        if (input.includes('datavg')) {
            return '  Volume group "datavg" successfully extended';
        }
        if (input.includes('appvg')) {
            return '  Volume group "appvg" successfully extended';
        }
        return '  Volume group successfully extended';
    }
    
    if (command === 'lvcreate') {
        if (input.includes('applv')) {
            return '  Logical volume "applv" created.';
        }
        if (input.includes('weblv')) {
            return '  Logical volume "weblv" created.';
        }
        if (input.includes('dblv')) {
            return '  Logical volume "dblv" created.';
        }
        if (input.includes('-L')) {
            // Extract LV name from -n parameter
            return '  Logical volume created.';
        }
        return '  Logical volume created.';
    }
    
    if (command === 'lvextend' || command === 'lvresize') {
        if (input.includes('applv')) {
            return '  Size of logical volume datavg/applv changed from 500.00 MiB (125 extents) to 1.00 GiB (256 extents).\n  Logical volume datavg/applv successfully resized.';
        }
        if (input.includes('weblv')) {
            return '  Size of logical volume datavg/weblv changed from 700.00 MiB (175 extents) to 2.00 GiB (512 extents).\n  Logical volume datavg/weblv successfully resized.';
        }
        return '  Logical volume successfully resized.';
    }
    
    // Partitioning commands
    if (command === 'fdisk') {
        if (input.includes('-l') && input.includes('/dev/sdb')) {
            return 'Disk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors\nDisk model: Virtual disk    \nUnits: sectors of 1 * 512 = 512 bytes\nSector size (logical/physical): 512 bytes / 512 bytes\nI/O size (minimum/optimal): 512 bytes / 512 bytes\nDisklabel type: gpt\nDisk identifier: 12345678-1234-5678-1234-567812345678\n\nDevice       Start      End  Sectors Size Type\n/dev/sdb1     2048  1050623  1048576 512M Linux filesystem';
        }
    }
    
    if (command === 'parted') {
        if (input.includes('/dev/sdb') && input.includes('print')) {
            return 'Model: VMware Virtual disk (scsi)\nDisk /dev/sdb: 21.5GB\nSector size (logical/physical): 512B/512B\nPartition Table: gpt\nDisk Flags: \n\nNumber  Start   End     Size    File system  Name  Flags\n 1      1049kB  538MB   537MB                      lvm';
        }
        if (input.includes('/dev/sdc') && input.includes('print')) {
            return 'Model: VMware Virtual disk (scsi)\nDisk /dev/sdc: 10.7GB\nSector size (logical/physical): 512B/512B\nPartition Table: gpt\nDisk Flags: \n\nNumber  Start   End     Size    File system  Name  Flags\n 1      1049kB  1075MB  1074MB';
        }
    }
    
    if (command === 'gdisk') {
        if (input.includes('-l') && input.includes('/dev/sdb')) {
            return 'GPT fdisk (gdisk) version 1.0.7\n\nPartition table scan:\n  MBR: protective\n  BSD: not present\n  APM: not present\n  GPT: present\n\nFound valid GPT with protective MBR; using GPT.\nDisk /dev/sdb: 41943040 sectors, 20.0 GiB\nSector size (logical/physical): 512/512 bytes\nDisk identifier (GUID): 12345678-1234-5678-1234-567812345678\nPartition table holds up to 128 entries\nMain partition table begins at sector 2 and ends at sector 33\n\nNumber  Start (sector)    End (sector)  Size       Code  Name\n   1            2048         1050623   512.0 MiB   8E00  Linux LVM';
        }
    }
    
    if (command === 'lsblk') {
        if (input.includes('/dev/sdb')) {
            return 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsdb      8:16   0   20G  0 disk \n└─sdb1   8:17   0  512M  0 part /mnt/backup';
        }
        if (input.includes('/dev/sdc')) {
            return 'NAME   MAJ:MIN RM SIZE RO TYPE MOUNTPOINT\nsdc      8:32   0  10G  0 disk \n└─sdc1   8:33   0   1G  0 part /media/usb';
        }
        if (!tokens[1]) {
            return 'NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda               8:0    0   50G  0 disk \n├─sda1            8:1    0    1G  0 part /boot\n└─sda2            8:2    0   49G  0 part \n  ├─rhel-root   253:0    0   44G  0 lvm  /\n  └─rhel-swap   253:1    0    5G  0 lvm  [SWAP]\nsdb               8:16   0   20G  0 disk \n└─sdb1            8:17   0  512M  0 part /mnt/backup\nsdc               8:32   0   10G  0 disk \n└─sdc1            8:33   0    1G  0 part ';
        }
        if (input.includes('-f')) {
            return 'NAME            FSTYPE      LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT\nsda                                                                          \n├─sda1          xfs               a1b2c3d4-e5f6-7890-abcd-ef1234567890    800M    20% /boot\n└─sda2          LVM2_member       fedcba98-7654-3210-fedc-ba9876543210                \n  ├─rhel-root   xfs               11223344-5566-7788-99aa-bbccddeeff00   35.2G    20% /\n  └─rhel-swap   swap              99887766-5544-3322-1100-ffeeddccbbaa                [SWAP]\nsdb                                                                          \n└─sdb1          ext4              a1b2c3d4-e5f6-7890-abcd-ef1234567890    400M    20% /mnt/backup\nsdc                                                                          \n└─sdc1          vfat              fedcba98-7654-3210-fedc-ba9876543210    800M    20% ';
        }
    }
    
    return null;
}

/**
 * Section 4: Essential Tools - Output Generator
 */
function generateSection3PreCheck(task, command, input, tokens) {
    if (task.id === 1 && command === 'ls') {
        if (hasFlags(input, 'ld') && input.includes('/mnt/backup')) {
            return 'ls: cannot access \'/mnt/backup\': No such file or directory';
        }
        if (input.includes('/mnt') && !input.includes('/mnt/backup')) {
            return '';
        }
    }
    
    if (task.id === 3) {
        if (command === 'mount' && (input.includes('/mnt/backup') || input.includes('/dev/sdb1'))) {
            return '';
        }
        if (command === 'df' && input.includes('/mnt/backup')) {
            return 'df: /mnt/backup: No such file or directory';
        }
        if (command === 'findmnt' && input.includes('/mnt/backup')) {
            return '';
        }
    }
    
    if (task.id === 5 && command === 'ls' && input.includes('data-backup.tar.gz')) {
        return 'ls: cannot access \'data-backup.tar.gz\': No such file or directory';
    }
    
    return null;
}

/**
 * Section 4 Pre-Check Output (BEFORE state)
 */
