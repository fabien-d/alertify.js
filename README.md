# Alertify.js

[![Build Status](https://semaphoreci.com/api/v1/projects/c3e649b0-cd60-46bd-9a7a-3d23a7e55589/519553/badge.svg)](https://semaphoreci.com/alertifyjs/alertify-js)      
[![Code Climate](https://img.shields.io/codeclimate/github/alertifyjs/alertify.js.svg?style=flat-square)](https://codeclimate.com/github/alertifyjs/alertify.js)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/alertifyjs/alertify.js.svg?style=flat-square)](https://codeclimate.com/github/alertifyjs/alertify.js)
[![Coverage Status](https://coveralls.io/repos/alertifyjs/alertify.js/badge.svg?branch=master&service=github)](https://coveralls.io/github/alertifyjs/alertify.js?branch=master)

[![issues](https://img.shields.io/github/issues/alertifyjs/alertify.js.svg?style=flat-square)](https://github.com/alertifyjs/alertify.js/issues)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/alertifyjs/alertify.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Stories in Ready](https://badge.waffle.io/alertifyjs/alertify.js.png?label=ready&title=Ready)](https://waffle.io/alertifyjs/alertify.js)

[![Bower version](https://img.shields.io/bower/v/bootstrap.svg?style=flat-square)](http://bower.io/search/?q=alertifyjs)
[![Bower version](https://img.shields.io/bower/l/bootstrap.svg?style=flat-square)](http://bower.io/search/?q=alertifyjs)
[![npm downloads](https://img.shields.io/npm/dt/alertify.js.svg?style=flat-square)](https://www.npmjs.com/package/alertify.js)
[![npm downloads](https://img.shields.io/npm/dm/alertify.js.svg?style=flat-square)](https://www.npmjs.com/package/alertify.js)
[![npm version](https://img.shields.io/npm/v/alertify.js.svg?style=flat-square)](https://www.npmjs.com/package/alertify.js)
[![npm license](https://img.shields.io/npm/l/alertify.js.svg?style=flat-square)](https://www.npmjs.com/package/alertify.js)

[![Dependency Status](https://david-dm.org/alertifyjs/alertify.js.svg)](https://david-dm.org/alertifyjs/alertify.js)
[![Dev Dependency status](https://david-dm.org/alertifyjs/alertify.js/dev-status.svg)](https://david-dm.org/alertifyjs/alertify.js#info=devDependencies&view=table)

# Alertify.js

Alertify is an unobtrusive customizable JavaScript notification system.

## Get In Touch

Feel free to stop by the [Alertify.js chat room](https://gitter.im/alertifyjs/alertify.js) to ask questions, report issues, make suggestions, or just say hi.

If you prefer something that's not in real-time, stop by the [Alertify.js Google Group](https://groups.google.com/forum/#!forum/alertifyjs/new) to get in touch, too.

Need to get in contact with us directly? Send us an email at [inbox@alertifyjs.org](mailto:inbox@alertifyjs.org).

## Reporting Issues

If at all possible, please set up an example in [Plunkr](https://plnkr.co), [JS Bin](//jsbin.com), [Codepen](http://codepen.io/)
etc. That will greatly speed up the process of fixing the issue. If you need the issue fixed right away, a reproduce-able,
concrete example is your best way to get our attention! Not to say that we won't do our best to fix other issues, though :-)

## Usage and Examples

For code examples, stop by the [website at alertifyjs.org](http://alertifyjs.org/)

## Contributing

Please follow the ESLint style guide to keep the code style uniform. Also
please add appropriate tests for each contribution. Test coverage is far from
complete, but if everyone adds a test for their contributions, plus one more
test, we should be able to get a reasonable amount of coverage quickly.

## Browser Support

Alertify uses the following JavaScript which may not work in anything
less than Internet Explorer 10, so you'll need to polyfill it.

- `element.classList` (Less than IE 10 needs polyfill)
- `document.querySelector` (Less than IE 7 needs polyfill)
- `element.addEventListener` (Less than IE 9 needs polyfill)
- `Array.prototype.map` (Less than IE 9 needs polyfill)
- `Array.prototype.forEach` (Less than IE 9 needs polyfill)

It should work on Opera Mini, but since Opera Mini doesn't support
transitions, the hiding of elements is not very pretty.

It's being tested on:

- Android 4.0 and Latest (should work on 2.1 and newer, though)
- Chrome (Latest)
- Firefox (Latest)
- Internet Explorer (Latest)
- Internet Explorer 10
- Safari (desktop and iOS)

## Credit where credit is due

See all list of [contributors](https://github.com/alertifyjs/alertify.js/contributors)

## License

alertify.js is licensed under [MIT](http://www.opensource.org/licenses/MIT)
