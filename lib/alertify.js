/**
 * Alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2012
 * @license The MIT License (MIT) <http://opensource.org/licenses/mit-license.php>
 * @link http://www.github.com/fabien-d
 * @module Alertify
 * @version 0.1a1
 */

(function (global, undefined) {
	"use strict";

	var document = global.document,
	    Alertify;

	Alertify = function () {

		var init, addListeners, bind, build, close, hide, notify, setup, alert, confirm, log, prompt,
		    $, cover, delay = 5000, dialogs, element, labels, logElement, queue = [], isopen = false;

		labels = {
			ok     : "OK",
			cancel : "Cancel"
		};

		dialogs = {
			buttons : {
				holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
				ok     : "<a href=\"#\" class=\"alertify-button alertify-button-ok\" id=\"aOK\">{{ok}}</a>",
				cancel : "<a href=\"#\" class=\"alertify-button alertify-button-cancel\" id=\"aCancel\">{{cancel}}</a>"
			},
			input   : "<input type=\"text\" class=\"alertify-text\" id=\"aText\">",
			message : "<p class=\"alertify-message\">{{message}}</p>",
			log     : "<article class=\"alertify-log{{class}}\">{{message}}</article>"
		};

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
		};

		/**
		 * Set the proper button click events
		 *
		 * @param {Function} fn    [Optional] Callback function
		 *
		 * @return {undefined}
		 */
		addListeners = function (fn) {
			var btnOK     = $("aOK")     || undefined,
			    btnCancel = $("aCancel") || undefined,
			    input     = $("aText")   || undefined,
			    val       = "";

			// handle OK click
			if (typeof btnOK !== "undefined") {
				bind(btnOK, "click", function (event) {
					hide();
					if (typeof input !== "undefined") { val = input.value; }
					if (typeof fn === "function") { fn(true, val); }
					event.preventDefault();
				});
			}

			// handle Cancel click
			if (typeof btnCancel !== "undefined") {
				bind(btnCancel, "click", function (event) {
					hide();
					if (typeof fn === "function") { fn(false); }
					event.preventDefault();
				});
			}
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
			html += "<article class=\"alertify-inner\">";
			html += dialogs.message.replace("{{message}}", message);

			if (type === "prompt") { html += dialogs.input; }

			html += dialogs.buttons.holder;
			html += "</article>";
			html += "</div>";

			switch (type) {
			case "confirm":
			case "prompt":
				html = html.replace("{{buttons}}", dialogs.buttons.cancel + dialogs.buttons.ok);
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
		close = function () {
			setTimeout(function () {
				var child = logElement.childNodes[logElement.childNodes.length - 1];
				if (typeof child !== "undefined") logElement.removeChild(child);
			}, delay);
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
			close();
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
		 * Create an alert dialog box
		 * 
		 * @param  {String}   message    The message passed from the callee
		 * @param  {Function} fn         [Optional] Callback function
		 * 
		 * @return {Object}
		 */
		alert = function (message, fn) {
			queue.push({ type: "alert", message: message, callback: fn });
			if (!isopen) setup();

			return this;
		};

		/**
		 * Create a confirm dialog box
		 * 
		 * @param  {String}   message    The message passed from the callee
		 * @param  {Function} fn         [Optional] Callback function
		 * 
		 * @return {Object}
		 */
		confirm = function (message, fn) {
			queue.push({ type: "confirm", message: message, callback: fn });
			if (!isopen) setup();
			
			return this;
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
			notify(message, type);
			return this;
		};

		/**
		 * Create a prompt dialog box
		 * 
		 * @param  {String}   message    The message passed from the function
		 * @param  {Function} fn         [Optional] Callback function
		 * 
		 * @return {Object}
		 */
		prompt = function (message, fn) {
			queue.push({ type: "prompt", message: message, callback: fn });
			if (!isopen) setup();
			
			return this;
		};

		// Bootstrap
		init();

		return {
			alert   : alert,
			confirm : confirm,
			log     : log,
			prompt  : prompt,
			success : function (message) { log(message, "success"); },
			error   : function (message) { log(message, "error"); },

			labels  : labels,
			delay   : delay
		};
	};

	if (typeof global.alertify === "undefined") { global.alertify = new Alertify(); }
}(this));