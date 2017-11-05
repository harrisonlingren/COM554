# COM 554 | Assignment 1
**Harrison Lingren | Fall 2017**
_To view this content as a web page, [click here](https://scm.ulster.ac.uk/~B00745342/workspace/COM554/assignment_1/technical_log.html)._

# Table of implemented requirements

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
# Technical log of completed work

In each weekly section below, I summarize the requirements that were implemented and include their function names where applicable.

## Week 6 changes (10-30 - 11-05)

### `index.html`
#### Summary

- Added `div.dropdown` elements to the contact form section
- Added empty `table` element to the home section

### `script.js`
#### Summary

- Added functions for expanding / collapsing `div.dropdown` menu and for selecting items
- Auto-population of `div.dropdown#residence` element
- Auto-population of `table#halls` on home section

#### Functions implemented:

Dropdown handlers: 
``` javascript
73   // click handler for dropdown
74   function dropdownClick(e) { ... }

89   // click handler for dropdown item
90   function dropdownItemClick(e) { ... }

240  // initialize dropdown elements
241  $('.dropdown').children(':first-child').before(
         '<span class="dropdown-selected">Choose one...</span>'
     );
242  $('.dropdown-selected').click( dropdownClick );
243  $('.dropdown-item').click( dropdownItemClick );
```

Populate `div.dropdown#residence`:
``` javascript
102  // change residence select options when selected year changes
103  function changeSelectedYear() { ... }

262  // click handler for year dropdown
263  $('#year').children()
         .not('.dropdown-selected')
         .click( changeSelectedYear );
```

Populate `table#halls`:
``` javascript
147  // auto-populate the residence hall table from JSON
148  function getHallTable(data) { ... }

207  // get available residences for contact form from JSON
208  $.getJSON( 'js/residences.json', (data) => {
         ...
212      getHallTable(data.residences);
         ....
     });
```


### `style.css`
#### Summary

- Styling for custom `div.dropdown` element
- Styling for `table` element


## Week 5 changes (10-23 - 10-27)

### `index.html`
#### Summary

- Added `div.accordion` elements into the housing options section
- Auto-populated `li` elements in the `div.accordion`
- Changed the sidenav menu to use `li` elements for the `.menu-link` objects instead of `a` elements.
- Fixed the `footer` spacing within the sidenav

### `script.js`
#### Summary

- Added logic for switching active `a.menu-link`
- Added logic for expanding / collapsing `div.accordion` elements
- Auto-populate `li` elements using new `residences.json` file (see below)
- Changed the `nav` expand animation to overlay on top of the page content instead of adjusting the width of `div.container`. It now also collapses upon selection.


#### Functions implemented:

Switching active menu links:
``` javascript
198  // switch between nav menu options
199  $('.menu-link').click((link) => { ... }
```

Expanding & collapsing accordions:
``` javascript
50   // accordion handler function
51   function accordionHandler(e) { ... }

230  // accordion logic
231  $('.accordion-header').click(accordionHandler);
```

Populatiing `li` elements:
``` javascript
124  // auto-populate the hall feature lists from JSON
125  function getHallFeatures(data) { ... }

207  // get available residences for contact form from JSON
208  $.getJSON( 'js/residences.json', (data) => {
         ...
211      getHallFeatures(data.residences);
         ....
     });
```

### `style.css`
#### Summary
- Centered `.title`
- `footer` now displays at bottom of `nav` menu
- Added `z-index` values to `.menu-btn`, `nav`, and `div.container` so the menu would display on top of the main view
- Added styling for `a.menu-link` and `a.menu-link.active` classes
- Added styling for `div.accordion` elements

### `residences.json`
#### Summary

- Moved hall features and room features bulleted lists into JSON for auto-population in `script.js`.

## Week 4 changes (10-16 - 10-20)

### `index.html`
#### Summary
- Added `div.tabs` to Housing Options section. 
- Filled in content on Housing Options section from the [official Butler University Residence Life site](https://www.butler.edu/residence-life) as source material.
- Formatted the header and footer, fixed the menu look and feel so that the whole page shifts when the menu is clicked.

### `script.js`
#### Summary
- Added click handler for tabs. This uses logic which checks for an `div.tab-header.active` class to set which tab content should be shown once a user clicks a tab.

#### Functions implemented:
``` javascript
215  // switch between tabs
216  $('.tab-header').click((tab) => { ... }
```

### `style.css`
#### Summary
- Added styling for header / footer
- Refactored menu styling
- Fixed page margins & spacing issues caused by browser defaults

## Week 3 changes (10-09 - 10-13)

### `index.html`
#### Summary
- Added basic HTML skeleton structure with `div` elements to separate content into 3 sections (home page, options page, contact page)
- Added sidenav menu section with empty links to switch between actively displayed content

### `script.js`
#### Summary
- Added jQuery logic for menu to switch the actively displayed section
- Added hamburger menu with animation to slide in from left

#### Functions implemented:
- For menu animation: `menuExpand() [13]`, `menuCollapse() [26]`, `menuToggle [8]`
- For switching sections in view: `.click()` event handlers at `177:191`

### `style.css`
#### Summary
- Added default 'Roboto' font family & color palette
- Added spacing for basic structural classes (`.menu-section`, `header`, `footer`, etc)
- Added menu styling to show menu on left of page
