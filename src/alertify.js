/*global define*/
(function (global, undefined) {
	"use strict";

	var document = global.document,
	    Alertify;

	Alertify = function () {

		var $, addListeners, bind, build, close, hide, init, notify, setup, unbind,
		    dialog, extend, log,
		    cover, dialogs, delay, element, isopen, keys, labels, logElement, queue;

		dialogs = {
			buttons : {
				holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
				submit : "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"aOK\" />{{ok}}</button>",
				ok     : "<a href=\"#\" class=\"alertify-button alertify-button-ok\" id=\"aOK\">{{ok}}</a>",
				cancel : "<a href=\"#\" class=\"alertify-button alertify-button-cancel\" id=\"aCancel\">{{cancel}}</a>"
			},
			input   : "<input type=\"text\" class=\"alertify-text\" id=\"aText\">",
			message : "<p class=\"alertify-message\">{{message}}</p>",
			log     : "<article class=\"alertify-log{{class}}\">{{message}}</article>"
		};

		delay   = 5000;
		keys    = { ENTER: 13, ESC: 27, SPACE: 32 };
		labels  = { ok: "OK", cancel: "Cancel" };
		queue   = [];
		isopen  = false;

		/**
		 * Shorthand for document.getElementById()
		 * 
		 * @param  {String} id    A specific element ID

		 * @return {Object}       HTML element
		 */
		$ = function (id) {
			return document.getElementById(id);
		};

		/**
		 * Set the proper button click events
		 *
		 * @param {Function} fn    [Optional] Callback function
		 *
		 * @return {undefined}
		 */
		addListeners = function (fn) {
			var btnReset  = $("aResetFocus"),
			    btnOK     = $("aOK")     || undefined,
			    btnCancel = $("aCancel") || undefined,
			    input     = $("aText")   || undefined,
			    form      = $("aForm")   || undefined,
			    hasOK     = (typeof btnOK !== "undefined"),
			    hasCancel = (typeof btnCancel !== "undefined"),
			    hasInput  = (typeof input !== "undefined"),
			    val       = "",
			    ok, cancel, common, key, reset;

			// ok event handler
			ok = function (event) {
				common(event);
				if (typeof input !== "undefined") val = input.value;
				if (typeof fn === "function") fn(true, val);
				if (typeof event.preventDefault !== "undefined") event.preventDefault();
			};

			// cancel event handler
			cancel = function (event) {
				common(event);
				if (typeof fn === "function") fn(false);
				if (typeof event.preventDefault !== "undefined") event.preventDefault();
			};

			// common event handler (keyup, ok and cancel)
			common = function (event) {
				hide();
				unbind(document.body, "keyup", key);
				unbind(btnReset, "focus", reset);
				if (hasInput) unbind(form, "submit", ok);
				if (hasOK) unbind(btnOK, "click", ok);
				if (hasCancel) unbind(btnCancel, "click", cancel);
			};

			// keyup handler
			key = function (event) {
				var keyCode = event.keyCode;
				if (keyCode === keys.SPACE && !hasInput) ok(event);
				if (keyCode === keys.ESC && hasCancel) cancel(event);
			};

			// reset focus to first item in the dialog
			reset = function (event) {
				if (hasInput) input.focus();
				else if (hasCancel) btnCancel.focus();
				else btnOK.focus();
			};

			// handle reset focus link
			// this ensures that the keyboard focus does not
			// ever leave the dialog box until an action has
			// been taken
			bind(btnReset, "focus", reset);
			// handle OK click
			if (hasOK) bind(btnOK, "click", ok);
			// handle Cancel click
			if (hasCancel) bind(btnCancel, "click", cancel);
			// listen for keys, Cancel => ESC
			bind(document.body, "keyup", key);
			// bind form submit
			if (hasInput) bind(form, "submit", ok);
			// set focus on OK button or the input text
			global.setTimeout(function () { 
				if (input) input.focus();
				else btnOK.focus();
			}, 50);
		};

		/**
		 * Bind events to elements
		 * 
		 * @param  {Object}   el       HTML Object
		 * @param  {Event}    event    Event to attach to element
		 * @param  {Function} fn       Callback function
		 * 
		 * @return {undefined}
		 */
		bind = function (el, event, fn) {
			if (typeof el.addEventListener === "function") {
				el.addEventListener(event, fn, false);
			} else if (el.attachEvent) {
				el.attachEvent("on" + event, fn);
			}
		};

		/**
		 * Build the proper message box
		 * 
		 * @param  {Object} item    Current object in the queue
		 * @return {String}         An HTML string of the message box
		 */
		build = function (item) {
			var html    = "",
			    type    = item.type,
			    message = item.message;

			html += "<div class=\"alertify-dialog\">";

			if (type === "prompt") html += "<form id=\"aForm\">";

			html += "<article class=\"alertify-inner\">";
			html += dialogs.message.replace("{{message}}", message);

			if (type === "prompt") html += dialogs.input;

			html += dialogs.buttons.holder;
			html += "</article>";

			if (type === "prompt") html += "</form>";

			html += "<a id=\"aResetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
			html += "</div>";

			switch (type) {
			case "confirm":
				html = html.replace("{{buttons}}", dialogs.buttons.cancel + dialogs.buttons.ok);
				html = html.replace("{{ok}}", labels.ok).replace("{{cancel}}", labels.cancel);
				break;
			case "prompt":
				html = html.replace("{{buttons}}", dialogs.buttons.cancel + dialogs.buttons.submit);
				html = html.replace("{{ok}}", labels.ok).replace("{{cancel}}", labels.cancel);
				break;
			case "alert":
				html = html.replace("{{buttons}}", dialogs.buttons.ok);
				html = html.replace("{{ok}}", labels.ok);
				break;
			default:
				break;
			}

			element.className = "alertify alertify-show alertify-" + type;
			cover.className   = "alertify-cover";
			return html;
		};

		/**
		 * Close the log messages
		 * 
		 * @return {undefined}
		 */
		close = function (elem) {
			bind(elem, "click", function () {
				logElement.removeChild(elem);
			});
			setTimeout(function () {
				if (typeof elem !== "undefined" && elem.parentNode === logElement) logElement.removeChild(elem);
			}, delay);
		};

		/**
		 * Hide the dialog and rest to defaults
		 *
		 * @return {undefined}
		 */
		hide = function () {
			// remove reference from queue
			queue.splice(0,1);
			// if items remaining in the queue
			if (queue.length > 0) setup();
			else {
				isopen = false;
				element.className = "alertify alertify-hide alertify-hidden";
				cover.className   = "alertify-cover alertify-hidden";
			}
		};

		/**
		 * Initialize Alertify
		 * Create the 2 main elements
		 *
		 * @return {undefined}
		 */
		init = function () {
			// ensure legacy browsers support html5 tags
			document.createElement("nav");
			document.createElement("article");
			document.createElement("section");
			// cover
			cover = document.createElement("div");
			cover.setAttribute("id", "alertifycover");
			cover.className = "alertify-cover alertify-hidden";
			document.body.appendChild(cover);
			// main element
			element = document.createElement("section");
			element.setAttribute("id", "alertify");
			element.className = "alertify alertify-hidden";
			document.body.appendChild(element);
			// main element
			logElement = document.createElement("section");
			logElement.setAttribute("id", "alertifylogs");
			logElement.className = "alertify-logs";
			document.body.appendChild(logElement);
			// clean up init method
			delete this.init;
		};

		/**
		 * Add new log message
		 * If a type is passed, a class name "alertify-log-{type}" will get added.
		 * This allows for custom look and feel for various types of notifications.
		 * 
		 * @param  {String} message    The message passed from the callee
		 * @param  {String} type       [Optional] Type of log message
		 * 
		 * @return {undefined}
		 */
		notify = function (message, type) {
			var log = document.createElement("article");
			log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
			log.innerHTML = message;
			// prepend child
			logElement.insertBefore(log, logElement.firstChild);
			// triggers the CSS animation
			setTimeout(function() { log.className = log.className + " alertify-log-show"; }, 50);
			close(log);
		};

		/**
		 * Initiate all the required pieces for the dialog box
		 *
		 * @return {undefined}
		 */
		setup = function () {
			var item = queue[0];
			
			isopen = true;
			element.innerHTML = build(item);
			addListeners(item.callback);
		};

		/**
		 * Unbind events to elements
		 * 
		 * @param  {Object}   el       HTML Object
		 * @param  {Event}    event    Event to detach to element
		 * @param  {Function} fn       Callback function
		 * 
		 * @return {undefined}
		 */
		unbind = function (el, event, fn) {
			if (typeof el.removeEventListener === "function") {
				el.removeEventListener(event, fn, false);
			} else if (el.detachEvent) {
				el.detachEvent("on" + event, fn);
			}
		};

		/**
		 * Create a dialog box
		 * 
		 * @param  {String}   message    The message passed from the callee
		 * @param  {String}   type       Type of dialog to create
		 * @param  {Function} fn         [Optional] Callback function
		 * 
		 * @return {Object}
		 */
		dialog = function (message, type, fn) {
			// check to ensure the alertify dialog element
			// has been successfully created
			var check = function () {
				if (element && element.scrollTop !== null) return;
				else check();
			};
			// error catching
			if (typeof message !== "string") throw new Error("message must be a string");
			if (typeof type !== "string") throw new Error("type must be a string");
			if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
			// initialize alertify if it hasn't already been done
			if (typeof this.init === "function") {
				this.init();
				check();
			}
			
			queue.push({ type: type, message: message, callback: fn });
			if (!isopen) setup();

			return this;
		};

		/**
		 * Extend the log method to create custom methods
		 * 
		 * @param  {String} type    Custom method name
		 * @return {Function}
		 */
		extend = function (type) {
			return function (message) { log(message, type); };
		};

		/**
		 * Show a new log message box
		 * 
		 * @param  {String} message    The message passed from the callee
		 * @param  {String} type       [Optional] Optional type of log message
		 * 
		 * @return {Object}
		 */
		log = function (message, type) {
			// check to ensure the alertify dialog element
			// has been successfully created
			var check = function () {
				if (logElement && logElement.scrollTop !== null) return;
				else check();
			};
			// initialize alertify if it hasn't already been done
			if (typeof this.init === "function") {
				this.init();
				check();
			}
			notify(message, type);
			return this;
		};

		return {
			alert   : function (message, fn) { dialog.call(this, message, "alert", fn); return this; },
			confirm : function (message, fn) { dialog.call(this, message, "confirm", fn); return this; },
			extend  : extend,
			init    : init,
			log     : function (message, type) { log.call(this, message, type); return this; },
			prompt  : function (message, fn) { dialog.call(this, message, "prompt", fn); return this; },
			success : function (message) { log.call(this, message, "success"); return this; },
			error   : function (message) { log.call(this, message, "error"); return this; },
			delay   : delay,
			labels  : labels
		};
	};

	// AMD and window support
	if (typeof define === "function") {
		define([], function () { return new Alertify(); });
	} else {
		if (typeof global.alertify === "undefined") { global.alertify = new Alertify(); }
	}

}(this));