# Section 4 Vi Modal Editor Implementation

## Overview
Implemented a modal text editor for Section 4 (Shell Scripting) that allows users to write multi-line bash scripts in a popup editor, simulating the vi/vim experience.

## Files Created

### 1. `terminal/vi/vi-modal.js`
- **Purpose**: Modal popup editor for creating/editing scripts
- **Features**:
  - Popup overlay with textarea for script editing
  - Save & Exit button (mimics `:wq` in vi)
  - Cancel button (mimics `:q!` in vi)
  - Keyboard shortcuts: Ctrl+S to save, Esc to cancel
  - Integrates with practice mode's filesystem state
  - Properly stores script content for validation

### 2. `terminal/vi/vi-validator.js`
- **Purpose**: Validates bash script content against requirements
- **Validation Types**:
  - `mustContain`: Required patterns/strings in script
  - `mustContainAny`: At least one of the patterns exists
  - `hasShebang/hasBashShebang`: Checks for proper shebang line
  - `hasVariable`: Checks for variable usage ($VAR)
  - `hasFunction`: Checks for function definitions
  - `hasIfStatement`: Checks for if statements
  - `hasForLoop/hasWhileLoop/hasUntilLoop`: Checks for loops
  - `hasCaseStatement`: Checks for case statements
  - `customValidator`: Custom validation function support

## Files Modified

### 1. `terminal/commands/commands-editors.js`
- Added logic to detect Section 4 and use ViModal instead of traditional vi editor
- Checks `appState.currentSectionId === 4` to trigger modal behavior

### 2. `app.js`
- Added `handleViCommandSection4()` function to intercept vi commands in practice mode
- Opens modal editor when vi/vim command is detected
- After saving, validates script content using `validateScript()`
- Properly integrates with existing task validation flow
- Added `findScriptValidationInTask()` helper function

### 3. `sections/section4-shell-scripting.js`
- Updated questions to include two-step approach:
  1. `touch /root/scriptname.sh` - Create the file first
  2. `vi /root/scriptname.sh` with `scriptValidation` object
- Example validation structure:
  ```javascript
  {
      command: "vi",
      requiredValues: ["/root/hello.sh"],
      scriptValidation: {
          hasBashShebang: true,
          mustContain: ["echo", "Hello World"]
      }
  }
  ```
- Updated Set 1, Set 2, and Set 3 questions with proper validation

### 4. `terminal.html`
- Added script tags to load vi-modal.js and vi-validator.js

### 5. `practice.html`
- Added script tags to load vi-modal.js and vi-validator.js before app.js loads

### 6. `terminal/vi/vi-modal.js`
- Updated save() method to work with practice mode's simulated filesystem state
- Uses `updateFileSystemState()` when in practice mode
- Falls back to actual filesystem operations in free terminal mode

## How It Works

### User Flow (Practice Mode - Section 4):
1. User sees task: "Create a simple bash script that prints 'Hello World'."
2. User types: `touch /root/hello.sh` → Marks file creation
3. User types: `vi /root/hello.sh` → Opens modal editor
4. User writes script in modal:
   ```bash
   #!/bin/bash
   echo "Hello World"
   ```
5. User clicks "Save & Exit" or presses Ctrl+S
6. System validates script content against requirements
7. If valid → Task marked complete with points awarded
8. If invalid → Error message showing what's missing

### Validation Flow:
1. `handleViCommandSection4()` intercepts vi command
2. Opens ViModal with filename and existing content (if any)
3. User edits and saves
4. On save:
   - Content stored in filesystem state via `updateFileSystemState()`
   - `findScriptValidationInTask()` extracts validation requirements
   - `validateScript()` checks content against requirements
   - If valid: `handleCorrectAnswer()` → points awarded
   - If invalid: Error message displayed

### Key Design Decisions:
1. **Touch before Vi**: Ensures fairness - some users might create files first, others might not
2. **Modal Editor**: Simple textarea for functionality focus, not full vi emulation
3. **Flexible Validation**: Uses regex patterns and helper functions for robust checking
4. **Practice Mode Integration**: Uses existing filesystem state management
5. **Section-Specific**: Only activates for Section 4, other sections use normal vi editor

## Testing Checklist
- [x] Modal opens when `vi scriptname.sh` is entered in Section 4
- [x] Modal does NOT open in other sections (uses regular vi)
- [x] Save button stores content properly
- [x] Cancel button discards changes
- [x] Keyboard shortcuts work (Ctrl+S, Esc)
- [ ] Script validation detects missing shebang
- [ ] Script validation detects missing required content
- [ ] Correct scripts pass validation and award points
- [ ] cat command shows saved script content
- [ ] Multiple edits to same file work correctly

## Future Enhancements
- Add syntax highlighting to textarea
- Add line numbers
- Implement basic vi key bindings (i, Esc, :wq, :q!)
- Add script execution preview/testing
- Support for more complex validation patterns
- Template snippets for common patterns
