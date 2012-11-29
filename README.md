Alertify is an unobtrusive customizable JavaScript notification system.

## Features

* Fully customizable alert, confirm and prompt dialogs
* Fully customizable unobtrusive notification system
* Callback parameter handling both OK and Cancel button clicks
* Chaining which allows queued dialogs

## Examples

http://fabien-d.github.com/alertify.js/

## Usage

```sh
alertify.log( message, type );
```
shorthand available to "success" and "error"
```sh
alertify.success( message ); // same as alertify.log( message, "success" );
alertify.error( message );   // same as alertify.log( message, "error" );
```
extend method allows for custom methods
```sh
alertify.custom = alertify.extend( "custom" );
alertify.custom( message ); // same as alertify.log( message, "custom" );
```
```sh
alertify.alert( message, function () { 
	//after clicking OK
});
```
```sh
alertify.confirm( message, function (e) {
	if (e) {
		//after clicking OK
	} else {
		//after clicking Cancel
	}
});
```
```sh
alertify.prompt( message, function (e, str) {
	if (e) {
		// after clicking OK
		// str is the value from the textbox
	} else {
		// after clicking Cancel
	}
});
```
```sh
alertify.alert(...).confirm(...)...
```

## Where is it being tested?

* Microsoft Internet Explorer 7+ (Standards Mode)
* Google Chrome
* Mozilla FireFox
* Apple Safari
* Opera
* iOS
* Android

Currently in development, not yet fully tested.

## License

Alertify is licensed under MIT http://www.opensource.org/licenses/MIT

### Copyright

Copyright (c) 2012, Fabien Doiron <fabien.doiron@gmail.com>
Twitter: @fabien_doiron <http://twitter.com/fabien_doiron>