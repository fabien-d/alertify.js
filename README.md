# Alertify.js

[![build status](https://secure.travis-ci.org/alertifyjs/alertify.js.png)](http://travis-ci.org/alertifyjs/alertify.js)
[![Bower version](https://badge.fury.io/bo/alertifyjs.svg)](http://badge.fury.io/bo/alertifyjs)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/alertifyjs/alertify.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Stories in Ready](https://badge.waffle.io/alertifyjs/alertify.js.png?label=ready&title=Ready)](https://waffle.io/alertifyjs/alertify.js)

[![npm downloads](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/alertify.js)
[![npm version](https://img.shields.io/npm/v/alertify.js.svg)](https://www.npmjs.com/package/alertify.js)
[![license](https://img.shields.io/npm/l/alertify.js.svg)](https://www.npmjs.com/package/alertify.js)
[![Dependency Status](https://david-dm.org/alertifyjs/alertify.js.svg)](https://david-dm.org/alertifyjs/alertify.js)
[![Dev Dependency status](https://david-dm.org/alertifyjs/alertify.js/dev-status.svg)](https://david-dm.org/alertifyjs/alertify.js#info=devDependencies&view=table)

[![NPM](https://nodei.co/npm/alertify.js.png)](https://nodei.co/npm/alertify.js/)

# Alertify.js

Alertify is an unobtrusive customizable JavaScript notification system. It's designed as a 
light-weight library for creating simple JavaScript browser dialogs and messages. It requires 
no external libraries like jQuery, and has a minimal feature set to make sure it's fast
and doesn't consume a lot of bandwidth.

## Features

#### Customizable look and feel

If you can edit CSS you can customize the look of alertify.js to match your needs.

#### Lightweight, no dependencies

No matter the type of project, if JavaScript is available alertify.js can be used.

#### Growl-like notification

Unobtrusive notification messages can be used to give feedback to users or even as a console.log replacement.

#### Cross-browser and platform

Whether you use a desktop, laptop, tablet or mobile device, alertify.js has you covered.

#### Simple API

From callbacks to handle OK and Cancel actions to customizable properties, using alertify.js is very 
straightforward.

## Installation

#### Via ZIP

Download the latest files in a ZIP archive from GitHub.

#### Via Bower

```
bower install --save alertifyjs
```

#### Via NPM

```
npm install --save alertify.js
```

## Installation

Include the default JavaScript and css files.

```html
<link rel="stylehsheet" href="path/to/file/dist/css/alertify.css">
<script src="path/to/file/dist/js/alertify.js"></script>
```

To include a theme, replace the `alertfy.css` file with the theme's file.

```html
<link rel="stylehsheet" href="path/to/file/dist/css/bootstrap-3.css">
<script src="path/to/file/dist/js/alertify.js"></script>
```

## Usage

### Dialogs

#### Alert Dialog

```
// alert dialog
alertify.alert("Message");
```

#### Confirm Dialog

```javascript
// confirm dialog
alertify.confirm("Message", function (e) {
    if (e) {
        // user clicked "ok"
    } else {
        // user clicked "cancel"
    }
});
```

#### Prompt Dialog

```javascript
// prompt dialog
alertify.prompt("Message", function (e, str) {
    // str is the input text
    if (e) {
        // user clicked "ok"
    } else {
        // user clicked "cancel"
    }
}, "Default Value");
```
### Notifications

#### Standard Notification
```javascript
// standard notification
// setting the wait property to 0 will
// keep the log message until it's clicked
//
// You can pass a custom function to be executed when the
// notification is clicked using the click argument.
alertify.log("Notification", type, wait, click);
```

#### Success Notification

```javascript
// success notification
// shorthand for alertify.log("Notification", "success");
//
// You can pass a custom function to be executed when the
// notification is clicked using the click argument.
alertify.success("Success notification", null, function() {
  alertify.log("You clicked the success notification");
});
```

#### Error Notification

```javascript
// error notification
// shorthand for alertify.log("Notification", "error");
alertify.error("Error notification");
```


### Customizable Properties

```javascript
// using the `set` method
alertify.set( ... );
```

#### Delay

```javascript
// time (in ms) before log message hides
// default: 5000
alertify.set({ delay: 10000 });
// log will hide after 10 seconds
alertify.log("Notification");
// setting the delay to 0 will leave
// the log message until it's clicked
alertify.log("Notification", "", 0);
```

#### Button Labels

```javascript
// custom OK and Cancel label
// default: OK, Cancel
alertify.set({ labels: {
	ok     : "Accept",
	cancel : "Deny"
} });
// button labels will be "Accept" and "Deny"
alertify.confirm("Message");
```

#### Button Focus

```javascript
// default: OK
alertify.set({ buttonFocus: "cancel" }); // "none", "ok", "cancel"
// focus will be given to the cancel button
alertify.confirm("Message");
```

#### Button Order

```javascript
// order of the buttons
// default: Cancel, OK
alertify.set({ buttonReverse: true }); // true, false
// buttons order will be OK, Cancel
alertify.confirm("Message");
```

### Custom Notifications

```javascript
// extend log method
// set it
alertify.custom = alertify.extend("custom");
// use it
alertify.custom("Notification");
```

## Get In Touch

Feel free to stop by the [Alertify.js chat room](https://gitter.im/alertifyjs/alertify.js) to ask questions, report issues, make suggestions, or just say hi.

If you prefer something that's not in real-time, stop by the [Alertify.js Google Group](https://groups.google.com/forum/#!forum/alertifyjs/new) to get in touch, too.

## Reporting Issues

If at all possible, please set up an example in [Plunkr](http://plunkr.co), 
[JS Bin](//jsbin.com), [Codepen](http://codepen.io/) etc. That will greatly speed up the process of 
fixing the issue. If you need the issue fixed right away, a reproduce-able, concrete example is your 
best way to get our attention! Not to say that we won't do our best to fix other issues, though :-)

## Where is it being tested?

* Microsoft Internet Explorer 9+
* Google Chrome
* Mozilla Firefox
* Apple Safari
* Opera
* iOS
* Android

### IE 8 Support

Internet Explorer 8 support was dropped in version 0.3.13. If you need IE 8 support,
use version 0.3.12. Since Microsoft no longer supports IE 8, it's better to move on.

### IE 9 Support

Internet Explorer 9 will be dropped in 0.4 and above, as well.

## Credit where credit is due

See all list of [contributors](https://github.com/alertifyjs/alertify.js/contributors)

## Maintenance

This is a fork of the original [fabien-d/alertify.js repository](//github.com/fabien-d/alertify.js) which is
no longer being maintained.

This fork is being actively maintained. You should submit your issues here.

## License

alertify.js is licensed under [MIT license](http://www.opensource.org/licenses/MIT)
