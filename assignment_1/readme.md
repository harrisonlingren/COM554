# COM 554 | Assignment 1
**Harrison Lingren | Fall 2017**



## Table of implemented requirements



| Requirement | `jquery_demos.html` | `script.js` | `style.css` |
| - | - | - | - |
| jQuery add / remove classes | ... | `80`, `83`, `98`, `202:203`, `220:221` | ... |
| Adding elements to the DOM | ... | `215:228` | `65`, `112`, `241` |
| HTML5 elements | `14`, `20`, `24`, `37`, `58` | ... | `75`, `39`, `13`, `112`, `160` |
| Adding CSS | ... | `55`, `66`, `118` | ... |
| Tabs | `48:189` | `215:228` | `123:195` |
| Accordion | `67:78` `96:107` | `50:60` `230:231` | `264:287` |
| Hide/Show/Fade/Toggle | ... | `34:35`, `66`, `70`, `172:191` | ... |
| Dropdown Menu | `198:203` `207` | `73:100` `240:254` | `289:338` |
| Event handling | ... | `177:205`, `216`, `231`, `240:243`, `246` | ... |
| Tooltips | ... | `62:71`, `233:238`, `269` | `237:262` |
| Animation | ... | `16:19`, `29:32` | ... |
| Automatic population of `li` | `69:71`, `75:77` | `124:145` | ... |
| Automatic population of `table` | `43` | `147:169` | ... |
| Automatic population of `select`* | `207` | `102:119` | ... |

\* _Since I built a custom dropdown menu, I used it and auto-populated that instead of the `select`. It operates the same._

&nbsp;
## Technical log of completed work

In each weekly section below, I summarize the requirements that were implemented and include their function names where applicable.

### Week 6 changes (10-30 - 11-05)

- blah
- blah

### Week 5 changes (10-23 - 10-27)

#### `index.html`
##### Summary
- Changed the sidenav menu to use `li` elements for the `.menu-link` objects instead of `a` elements.
- Fixed the `footer` spacing within the sidenav

#### `script.js`
##### Summary
- Changed the `nav` expand animation to overlay on top of the page content instead of adjusting the width of `.container`
- Added logic for switching active `.menu-link`
- `nav` menu collapses on selection

#### `style.css`
##### Summary
- Vertically centered `.title`
- `footer` now displays at bottom of `nav` menu
- Added `z-index` values to `.menu-btn`, `nav`, and `.container` to handle overlapping content
- Added styling for `.menu-link` and `.menu-link.active` classes

### Week 4 changes (10-16 - 10-20)

#### `index.html`
##### Summary
- Added `.tabs` to Housing Options section. Pulled from the official Butler University Residence Life site as source material for page filler content.
- Formatted the header and footer, fixed the menu look and feel so that the whole page shifts when the menu is clicked.

#### `script.js`
##### Summary
- Added click handler for tabs. This uses logic which checks for an `active` class to set which tab content should be shown.

#### `style.css`
##### Summary
- Added styling for header / footer
- Refactored menu styling
- Fixed page margins & spacing issues caused by browser defaults

### Week 3 changes (10-09 - 10-13)

#### `index.html`
##### Summary
- Added basic HTML skeleton structure with `div` elements to separate content into 3 sections (home page, options page, contact page)
- Added sidenav menu section with empty links to switch between actively displayed content

#### `script.js`

##### Summary
- Added jQuery logic for menu to switch the actively displayed section
- Added hamburger menu with animation to slide in from left

##### Functions implemented:
- For menu animation: `menuExpand() [13]`, `menuCollapse() [26]`, `menuToggle [8]`
- For switching sections in view: `.click()` event handlers at `177:191`

#### `style.css`
##### Summary
- Added default 'Roboto' font family & color palette
- Added spacing for basic structural classes (`.menu-section`, `header`, `footer`, etc)
- Added menu styling to show menu on left of page