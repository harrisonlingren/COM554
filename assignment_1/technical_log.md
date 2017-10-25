# Assignment 1 Technical Log
**Harrison Lingren | COM 554**

## 2017-10-25

### `index.html`
- Changed the sidenav menu to use `li` elements for the `.menu-link` objects instead of `a` elements.
- Fixed the `footer` spacing within the sidenav

### `script.js`
- Changed the `nav` expand animation to overlay on top of the page content instead of adjusting the width of `.container`
- Added logic for switching active `.menu-link`
- `nav` menu collapses on selection

### `style.css`
- Vertically centered `.title`
- `footer` now displays at bottom of `nav` menu
- Added `z-index` values to `.menu-btn`, `nav`, and `.container` to handle overlapping content
- Added styling for `.menu-link` and `.menu-link.active` classes

## 2017-10-17

### `index.html`
- Added `tabs` elements to Housing Options section. Pulled from the official Butler University Residence Life site as source material for page filler content.
- Formatted the header and footer, fixed the menu look and feel so that the whole page shifts when the menu is clicked.

### `script.js`
- Added click handler for tabs. This uses logic which checks for an `active` class to set which tab content should be shown.

### `style.css`
- Added styling for header / footer
- Refactored menu styling
- Fixed page margins & spacing issues caused by browser defaults

## 2017-10-11

### `index.html`
- Added basic HTML skeleton structure with `div` elements to separate section content
- Added menu section with empty links to switch between actively displayed content

### `script.js`
- Added jQuery logic for menu to switch displayed content
- Added hamburger menu animation to slide in from left

### `style.css`
- Added default font family & colors
- Added spacing for basic structural classes (`menu-section`, `header`, `footer`, etc)
- Added menu styling to show on left of page