## 1.0.1

- Fixes an [issue](https://github.com/alertifyjs/alertify.js/issues/40) with default button labels being undefined
- Removes jQuery dependency from website
- Updates website to better understand user interaction
- Optimizes website a bit more for mobile

## 1.0.0-rc1

- Removes the `alertify.extend` method
- Removes the public `alertify.init` method.
- Removes the returning of the alertify global in all methods.
- Removes the reversal of buttons.
- Updates the default styles to be cleaner, lighter.
- Adds an AngularJS module.
- Removes handling of element focus.
- Adds a limit to number of log messages displayed at any time.
- Changes the log messages to have dynamic width.
- Adds a beta preview of the new website look in `examples` directory.
- Injects needed CSS automatically by default.
- Added documentation for HTML in the dialogs.
- Disabled the log click to close feature by default to allow for HTML.
- Removes support for themes by default, add a custom stylesheet to override
  the default style.

## 0.3.18

- Fixed issue with npm support. See PR #31
- Updated SASS/CSS/JS file paths

## 0.3.17

- Created NPM package.
- Updated readme.
- Added JSDelivr info.
- Added [npm support](https://github.com/alertifyjs/alertify.js/pull/26).
