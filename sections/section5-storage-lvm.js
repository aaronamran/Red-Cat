/**
 * Section 5: Storage - Partitions & LVM
 * NEW FOCUS - Critical for RHCSA EX200
 * 3 unique question sets for practice variety
 * 
 * Focus areas:
 * - Physical Volumes (PV)
 * - Volume Groups (VG)
 * - Logical Volumes (LV)
 * - Extending LVs and filesystems
 * - VDO basics
 */

const section5Data = {
    id: 5,
    title: "Storage: Partitions & LVM",
    description: "Master Logical Volume Management for flexible and scalable storage solutions.",
    totalPoints: 20,
    
    questionSets: {
        set1: [
            {
                id: 1,
                category: "Audit",
                description: "List all available block devices on the system.",
                expected: [
                    { command: "lsblk" },
                    { command: "lsblk", requiredFlags: ["-a"] }
                ],
                explanation: "lsblk shows all block devices in a tree format. This helps identify available disks before partitioning.",
                points: 1
            },
            {
                id: 2,
                category: "Audit",
                description: "Display detailed information about block device /dev/sdb.",
                expected: [
                    { command: "blkid", requiredValues: ["/dev/sdb"] },
                    { command: "lsblk", requiredValues: ["/dev/sdb"] }
                ],
                explanation: "blkid shows UUID, filesystem type, and other metadata. lsblk shows partitions and mount points.",
                points: 1
            },
            {
                id: 3,
                category: "Implementation",
                description: "Initialize /dev/sdb1 as a Physical Volume (PV) for LVM.",
                expected: {
                    command: "pvcreate",
                    requiredValues: ["/dev/sdb1"]
                },
                allowedPreChecks: [
                    { command: "pvdisplay", requiredValues: ["/dev/sdb1"] },
                    { command: "pvs", requiredValues: ["/dev/sdb1"] },
                    { command: "pvscan" }
                ],
                explanation: "pvcreate initializes a partition or disk for use with LVM. This is always the first step.",
                points: 3
            },
            {
                id: 4,
                category: "Audit",
                description: "Verify that /dev/sdb1 is now a Physical Volume.",
                expected: [
                    { command: "pvdisplay", requiredValues: ["/dev/sdb1"] },
                    { command: "pvs", requiredValues: ["/dev/sdb1"] },
                    { command: "pvscan" }
                ],
                explanation: "Use pvdisplay, pvs, or pvscan to verify PV creation.",
                points: 2
            },
            {
                id: 5,
                category: "Implementation",
                description: "Create a Volume Group named 'vg_data' using the Physical Volume /dev/sdb1.",
                expected: {
                    command: "vgcreate",
                    orderedValues: ["vg_data", "/dev/sdb1"]
                },
                allowedPreChecks: [
                    { command: "vgdisplay", requiredValues: ["vg_data"] },
                    { command: "vgs", requiredValues: ["vg_data"] },
                    { command: "vgscan" }
                ],
                explanation: "vgcreate creates a Volume Group from one or more Physical Volumes. VG name comes first, then PV(s).",
                points: 3
            },
            {
                id: 6,
                category: "Audit",
                description: "Verify that Volume Group 'vg_data' was created successfully.",
                expected: [
                    { command: "vgdisplay", requiredValues: ["vg_data"] },
                    { command: "vgs", requiredValues: ["vg_data"] },
                    { command: "vgscan" }
                ],
                explanation: "vgdisplay shows detailed VG information including total size and free space.",
                points: 1
            },
            {
                id: 7,
                category: "Implementation",
                description: "Create a Logical Volume named 'lv_app' with size 2GB in Volume Group 'vg_data'.",
                expected: {
                    command: "lvcreate",
                    requiredFlags: ["-L", "-n"],
                    requiredValues: ["2G", "vg_data", "lv_app"]
                },
                allowedPreChecks: [
                    { command: "lvdisplay", requiredValues: ["vg_data/lv_app"] },
                    { command: "lvs", requiredValues: ["vg_data/lv_app"] },
                    { command: "lvscan" }
                ],
                explanation: "lvcreate -L <size> -n <name> <VG> creates a Logical Volume. -L specifies size, -n specifies name.",
                points: 4
            },
            {
                id: 8,
                category: "Audit",
                description: "Verify that Logical Volume 'lv_app' was created in 'vg_data'.",
                expected: [
                    { command: "lvdisplay", requiredValues: ["vg_data/lv_app"] },
                    { command: "lvs", requiredValues: ["vg_data/lv_app"] },
                    { command: "lvscan" }
                ],
                explanation: "lvdisplay shows LV path, size, and status. The device path will be /dev/vg_data/lv_app.",
                points: 1
            },
            {
                id: 9,
                category: "Implementation",
                description: "Extend the Logical Volume 'lv_app' by 500MB and resize the filesystem in one command.",
                expected: {
                    command: "lvextend",
                    requiredFlags: ["-L", "-r"],
                    requiredValues: ["+500M", "/dev/vg_data/lv_app"]
                },
                allowedPreChecks: [
                    { command: "lvdisplay", requiredValues: ["/dev/vg_data/lv_app"] },
                    { command: "lvs", requiredValues: ["vg_data/lv_app"] }
                ],
                explanation: "lvextend -L +<size> -r <LV_path> extends the LV and resizes the filesystem. The -r flag is critical - it runs resize2fs or xfs_growfs automatically.",
                points: 4
            }
        ],
        set2: [
            // Placeholder for set2 - different scenarios
            {
                id: 1,
                category: "Implementation",
                description: "Initialize /dev/sdc1 as a Physical Volume.",
                expected: {
                    command: "pvcreate",
                    requiredValues: ["/dev/sdc1"]
                },
                allowedPreChecks: [
                    { command: "pvs" }
                ],
                explanation: "Always initialize partitions as PVs before adding to Volume Groups.",
                points: 3
            },
            {
                id: 2,
                category: "Implementation",
                description: "Create Volume Group 'vg_backup' using /dev/sdc1.",
                expected: {
                    command: "vgcreate",
                    orderedValues: ["vg_backup", "/dev/sdc1"]
                },
                allowedPreChecks: [
                    { command: "vgs" }
                ],
                explanation: "Volume Groups pool storage from Physical Volumes.",
                points: 3
            },
            {
                id: 3,
                category: "Implementation",
                description: "Create a 1GB Logical Volume named 'lv_logs' in 'vg_backup'.",
                expected: {
                    command: "lvcreate",
                    requiredFlags: ["-L", "-n"],
                    requiredValues: ["1G", "vg_backup", "lv_logs"]
                },
                allowedPreChecks: [
                    { command: "lvs" }
                ],
                explanation: "Logical Volumes are created from free space in Volume Groups.",
                points: 4
            }
        ],
        set3: [
            // Placeholder for set3
            {
                id: 1,
                category: "Implementation",
                description: "Extend Logical Volume /dev/vg_backup/lv_logs by 300MB with filesystem resize.",
                expected: {
                    command: "lvextend",
                    requiredFlags: ["-L", "-r"],
                    requiredValues: ["+300M", "/dev/vg_backup/lv_logs"]
                },
                allowedPreChecks: [
                    { command: "lvs" }
                ],
                explanation: "The -r flag ensures the filesystem is resized to match the new LV size.",
                points: 4
            }
        ]
    }
};
