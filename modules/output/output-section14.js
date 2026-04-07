/** Red Cat - Section 14 */

function generateSection14Output(command, input, tokens) {
    // systemctl target commands
    if (command === 'systemctl' && input.includes('get-default')) {
        return 'multi-user.target';
    }
    
    if (command === 'systemctl' && input.includes('list-units') && input.includes('target')) {
        return 'UNIT                   LOAD   ACTIVE SUB    DESCRIPTION                              \nbasic.target           loaded active active Basic System\ncryptsetup.target      loaded active active Local Encrypted Volumes\ngetty.target           loaded active active Login Prompts\nlocal-fs.target        loaded active active Local File Systems\nmulti-user.target      loaded active active Multi-User System\nnetwork.target         loaded active active Network\npaths.target           loaded active active Paths\nremote-fs.target       loaded active active Remote File Systems\nslices.target          loaded active active Slices\nsockets.target         loaded active active Sockets\nswap.target            loaded active active Swap\nsysinit.target         loaded active active System Initialization\ntimers.target          loaded active active Timers\n\n13 loaded units listed.';
    }
    
    // GRUB commands
    if (command === 'cat' && input.includes('/proc/cmdline')) {
        return 'BOOT_IMAGE=(hd0,gpt2)/vmlinuz-5.14.0-362.el9.x86_64 root=/dev/mapper/rhel-root ro crashkernel=1G-4G:192M,4G-64G:256M,64G-:512M resume=/dev/mapper/rhel-swap rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet';
    }
    
    if (command === 'grub2-editenv' && input.includes('list')) {
        return 'saved_entry=0\nkernelopts=root=/dev/mapper/rhel-root ro crashkernel=1G-4G:192M,4G-64G:256M,64G-:512M resume=/dev/mapper/rhel-swap rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet';
    }
    
    // Kernel information
    if (command === 'uname' && input.includes('-r')) {
        return '5.14.0-362.el9.x86_64';
    }
    
    if (command === 'lsmod') {
        return 'Module                  Size  Used by\nipmi_devintf           20480  0\nipmi_msghandler        65536  1 ipmi_devintf\nvmw_vsock_virtio_transport_common    32768  1 vmw_vsock_virtio_transport\nvsock                  36864  2 vmw_vsock_virtio_transport_common,vmw_vsock_virtio_transport\nvmw_vmci               77824  2 vmw_vsock_virtio_transport_common,vsock\ni40e                  548864  0\nxt_conntrack           16384  1\nnf_conntrack          139264  2 xt_conntrack,nfnetlink_cttimeout';
    }
    
    if (command === 'lsmod' && input.includes('grep')) {
        if (input.includes('vmw')) {
            return 'vmw_vsock_virtio_transport_common    32768  1 vmw_vsock_virtio_transport\nvmw_vmci               77824  2 vmw_vsock_virtio_transport_common,vsock';
        }
    }
    
    if (command === 'modinfo' && input.includes('vmw_vmci')) {
        return 'filename:       /lib/modules/5.14.0-362.el9.x86_64/kernel/drivers/misc/vmw_vmci/vmw_vmci.ko.xz\nlicense:        GPL v2\ndescription:    VMware VMCI Driver\nauthor:         VMware, Inc.\nalias:          pci:v000015ADd00000740sv*sd*bc*sc*i*\nretpoline:      Y\nintree:         Y\nname:           vmw_vmci\nvermagic:       5.14.0-362.el9.x86_64 SMP preempt mod_unload modversions \nsig_id:         PKCS#7\nsigner:         Red Hat Enterprise Linux kernel signing key\nsig_key:        A1:2B:3C:4D:5E:6F:70:80:90:A0:B0:C0:D0:E0:F0:10';
    }
    
    return null;
}

/**
 * Section 15: Time & Date Services - Output Generator
 */
