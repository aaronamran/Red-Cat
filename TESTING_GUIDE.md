# Testing Guide for Section 4 Vi Modal Editor

## Quick Test Steps

### Test 1: Basic Modal Opening
1. Open practice mode and navigate to Section 4 (Shell Scripting)
2. Type: `touch /root/hello.sh`
3. Press Enter (should accept the command)
4. Type: `vi /root/hello.sh`
5. Press Enter
6. **Expected**: Modal popup appears with textarea

### Test 2: Script Creation and Validation
1. In the modal, type:
   ```bash
   #!/bin/bash
   echo "Hello World"
   ```
2. Click "Save & Exit" or press Ctrl+S
3. **Expected**: 
   - Modal closes
   - Task marked complete
   - Points awarded
   - Success message displayed

### Test 3: Invalid Script Validation
1. Type: `touch /root/test.sh`
2. Type: `vi /root/test.sh`  
3. In modal, type (missing shebang):
   ```bash
   echo "test"
   ```
4. Click Save
5. **Expected**: Error message about missing bash shebang

### Test 4: Modal Shortcuts
1. Open any vi command
2. Press `Esc` key
3. **Expected**: Modal closes without saving
4. Open vi again
5. Type some content
6. Press `Ctrl+S`
7. **Expected**: Modal closes and saves content

### Test 5: Touch Before Vi Requirement
1. Try typing `vi /root/newscript.sh` WITHOUT touch first
2. **Expected**: Should work but won't pass validation until both commands complete

### Test 6: Section Specificity
1. Navigate to Section 1, 2, or 3
2. Type: `vi /etc/someconfig`
3. **Expected**: Traditional vi editor opens (NOT the modal)

## Validation Examples

### Valid Hello World Script:
```bash
#!/bin/bash
echo "Hello World"
```

### Valid Script with Variables:
```bash
#!/bin/bash
USER=$USER
HOSTNAME=$(hostname)
echo "User: $USER on $HOSTNAME"
```

### Valid Script with If Statement:
```bash
#!/bin/bash
if [ -f /etc/passwd ]; then
    echo "File exists"
else
    echo "File not found"
fi
```

### Valid Script with For Loop:
```bash
#!/bin/bash
for name in Alice Bob Charlie; do
    echo "Hello, $name"
done
```

## Common Issues and Solutions

### Issue: Modal doesn't appear
- **Solution**: Make sure you're in Section 4
- Check browser console for errors
- Verify vi-modal.js and vi-validator.js are loaded

### Issue: Script validation always fails
- **Solution**: Check that `validateScript` function is available
- Ensure script meets ALL requirements in `scriptValidation` object
- Check browser console for validation error details

### Issue: Content not saved
- **Solution**: Check that `updateFileSystemState` function exists
- Verify filesystem state is being updated in console logs

### Issue: Modal appears in other sections
- **Solution**: Check the condition `appState.currentSectionId === 4`
- Ensure section ID is correctly set

## Browser Console Debugging

Open browser console (F12) and look for:
- `📝 Updated filesystem state for /root/hello.sh:` (when saving)
- `🎯 Practice Mode: default, Starting Section: 4` (on page load)
- Any errors in red

## Expected Console Output Example:
```
🚀 Initializing Red Cat...
✅ Progress loaded from localStorage
📚 Loaded Section 4 - Question Set 0
[After typing vi command and saving]
📝 Updated filesystem state for /root/hello.sh: {content: "#!/bin/bash\necho \"Hello World\"", mode: "0644", owner: "root", group: "root"}
```

## Files to Check in DevTools

In Sources tab or Network tab, verify these files load:
- terminal/vi/vi-modal.js
- terminal/vi/vi-validator.js
- sections/section4-shell-scripting.js
- modules/state.js
- app.js

All should return HTTP 200 status
