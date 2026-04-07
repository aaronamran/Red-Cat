/** Red Cat - Section 12 */

function generateSection12Output(command, input, tokens) {
    // Script execution outputs
    if (command === 'bash' || command === 'sh') {
        if (input.includes('script.sh')) {
            return 'Script executed successfully\nOutput: Hello World\nExit code: 0';
        }
    }
    
    // Test command outputs
    if (command === 'test' || command === '[') {
        return ''; // test command produces no output, uses exit codes
    }
    
    // echo outputs for variable expansion
    if (command === 'echo') {
        if (input.includes('$PATH')) {
            return '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin';
        }
        if (input.includes('$HOME')) {
            return '/root';
        }
        if (input.includes('$USER')) {
            return 'root';
        }
    }
    
    // File checks
    if (command === 'ls' && input.includes('/usr/local/bin')) {
        return 'backup.sh  cleanup.sh  monitor.sh';
    }
    
    if (command === 'cat' && input.includes('.sh')) {
        return '#!/bin/bash\n\n# Sample script\necho "Running backup..."\nrsync -av /data/ /backup/\necho "Backup complete"';
    }
    
    return null;
}

/**
 * Section 13: Task Scheduling - Output Generator
 */
