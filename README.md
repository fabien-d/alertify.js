Alertify is an unobtrusive customizable JavaScript notification system.

## Features

* Fully customizable alert, confirm and prompt dialogs
* Fully customizable unobtrusive notification system
* Callback parameter handling both OK and Cancel button clicks

## Usage

```sh
alertify.log( message, type );
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

## Where is it being tested?

* Microsoft Internet Explorer 8+ (Standards Mode)
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