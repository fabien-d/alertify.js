## 1.0.7

- Adds NPM compatibility, issue #62

## 1.0.6

- Fixes issue with closing log on link, issue #56
- Improved Bootstrap button theming, issue #52

## 1.0.5

- Adds option for positioning of log elements: issue #49
- Adds more theming: issue #52, issue #50
- Adds ability to disable injection of css issue #53

## 1.0.4

- Adds focus on dialogs to input or button for easier navigation. [Issue 42](https://github.com/alertifyjs/alertify.js/issues/42)
- Adds (yet documented) option to set themes (for buttons only now)
- Adds more unit tests

## 1.0.3

- Adds promise aware API [issue #32](https://github.com/alertifyjs/alertify.js/issues/32)
- Runs Karma tests as part of development process

## 1.0.2

- Fixes `ngAlertify` issues
- Adds Karma unit testing
- Adds SauceLabs to CI process
- Fixes website documentation typos
- Updates rawgit link on website

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
