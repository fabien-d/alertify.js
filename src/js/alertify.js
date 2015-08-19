/* global require, module */

var Alertify = (function(global, undefined) {

    "use strict";

    var document = global.document, Alertify;

    Alertify = function() {

        var hasCss;
        var isopen = false;
        var keys = { ENTER: 13, ESC: 27, SPACE: 32 };
        var queue = [];
        var btnCancel;
        var btnOK;
        var elDialog;
        var elLog;
        var form;
        var input;
        var transitionType;
        var transitionSupported = false;

        /**
         * Markup pieces
         * @type {Object}
         */
        var dialogs = {
            buttons: {
                holder: "<nav class='alertify-buttons'>{{buttons}}</nav>",
                ok: "<button class='alertify-button alertify-button-ok' id='alertify-ok'>{{ok}}</button>",
                cancel: "<button class='alertify-button alertify-button-cancel' id='alertify-cancel'>{{cancel}}</button>"
            },
            input: "<div class='alertify-text-wrapper'><input type='text' class='alertify-text' id='alertify-text'></div>",
            message: "<p class='alertify-message'>{{message}}</p>",
            log: "<div class='alertify-log{{class}}'>{{message}}</div>"
        };

        /**
         * Shorthand for document.getElementById()
         *
         * @param  {String} id    A specific element ID
         * @return {Object}       HTML element
         */
        function $(id) {
            return document.getElementById(id);
        }

        function removeLogElement(el) {
            if ("undefined" !== typeof elLog && el.parentNode === elLog) {
                elLog.removeChild(el);
            }
        }

        /**
         * Return the proper transitionend event
         * @return {String}    Transition type string
         */
        function getTransitionEvent() {

            if (! transitionType) {
                var el = document.createElement("fakeelement");
                var transitions = {
                    "WebkitTransition": "webkitTransitionEnd",
                    "MozTransition": "transitionend",
                    "OTransition": "otransitionend",
                    "transition": "transitionend"
                };

                for (var t in transitions) {
                    if (transitions.hasOwnProperty(t)) {
                        if (el.style[t] !== undefined) {
                            transitionType = transitions[t];
                            transitionSupported = true;
                            break;
                        }
                    }
                }
            }

            return {
                type: transitionType,
                supported: transitionSupported
            };

        }

        /**
         * Alertify private object
         * @type {Object}
         */
        var _alertify = {

            /**
             * Labels object
             * @type {Object}
             */
            defaultOkLabel: "Ok",

            okLabel: this.defaultOkLabel,

            defaultCancelLabel: "Cancel",

            cancelLabel: this.defaultCancelLabel,

            defaultMaxLogItems: 2,

            maxLogItems: this.defaultMaxLogItems,

            promptValue: "",

            promptPlaceholder: "",

            /**
             * Delay number
             * @type {Number}
             */
            delay: 5000,
            defaultDelay: 5000,

            /**
             * Set the transition event on load
             * @type {[type]}
             */
            transition: undefined,

            /**
             * Set the proper button click events
             *
             * @param {Function} fn    [Optional] Callback function
             *
             * @return {undefined}
             */
            addListeners: function(onOkay, onCancel) {

                var hasOK = typeof btnOK !== "undefined";
                var hasCancel = typeof btnCancel !== "undefined";
                var hasInput = typeof input !== "undefined";
                var val = "";
                var self = this;

                // common event handler (ok and cancel)
                var common = function() {
                    self.hide();
                    if (hasOK) {
                        btnOK.removeEventListener("click", ok);
                    }
                    if (hasCancel) {
                        btnCancel.removeEventListener("click", cancel);
                    }
                };

                // ok event handler
                var ok = function(event) {
                    common(event);
                    if ("function" === typeof onOkay) {
                      if ("undefined" === typeof input) {
                        onOkay(event);
                      } else {
                        onOkay(input.value, event);
                      }
                    }
                };

                // cancel event handler
                var cancel = function(event) {
                    common(event);
                    if ("function" === typeof onCancel) {
                        onCancel(event);
                    }
                };

                if (hasOK) {
                    btnOK.addEventListener("click", ok);
                }

                if (hasCancel) {
                    btnCancel.addEventListener("click", cancel);
                }

            },

            /**
             * Build the proper message box
             *
             * @param  {Object} item    Current object in the queue
             *
             * @return {String}         An HTML string of the message box
             */
            build: function(item) {

                var css = item.cssClass || "";
                var btnTxt = dialogs.buttons.ok;
                var html = "<div class='alertify-dialog'>" + "<div class='alertify-inner'>" + dialogs.message.replace("{{message}}", item.message);

                if(item.type === "confirm" || item.type === "prompt") {
                  btnTxt = dialogs.buttons.cancel + dialogs.buttons.ok;
                }

                if (item.type === "prompt") {
                    html += dialogs.input;
                }

                html = (html + dialogs.buttons.holder + "</div>" + "</div>")
                  .replace("{{buttons}}", btnTxt)
                  .replace("{{ok}}", this.okLabel)
                  .replace("{{cancel}}", this.cancelLabel);

                elDialog.className = "alertify";
                return html;

            },

            closeLogOnClick: false,

            closeLogOnClickDefault: false,

            setCloseLogOnClick: function(bool) {
                this.closeLogOnClick = !! bool;
            },

            /**
             * Close the log messages
             *
             * @param  {Object} elem    HTML Element of log message to close
             * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
             *
             * @return {undefined}
             */
            close: function(elem, wait) {

                // Unary Plus: +"2" === 2
                var timer = (wait && !isNaN(wait)) ? +wait : this.delay;
                var self = this;
                var hideElement;
                var transitionDone;

                // set click event on log messages
                if (this.closeLogOnClick) {
                  elem.addEventListener("click", function() {
                      hideElement(elem);
                  });
                }

                // Hide the dialog box after transition
                // This ensure it doens't block any element from being clicked
                transitionDone = function(event) {
                    event.stopPropagation();
                    // unbind event so function only gets called once
                    this.removeEventListener(self.transition.type, transitionDone);
                    removeLogElement(this);
                };

                // this sets the hide class to transition out
                // or removes the child if css transitions aren't supported
                hideElement = function(el) {

                    var time = 1;

                    if (typeof el !== "undefined" && el.parentNode === elLog) {

                        // whether CSS transition exists
                        if (self.transition.supported) {
                            el.addEventListener(self.transition.type, transitionDone);
                            el.className += " alertify-log-hide";
                            time = 500;
                        }

                        setTimeout(function () {
                            removeLogElement(el);
                        }, time || 1);

                    }
                };
                // never close (until click) if wait is set to 0
                if (wait === 0) {
                    return;
                }
                // set timeout to auto close the log message
                setTimeout(function() {
                    hideElement(elem);
                }, timer);

            },

            /**
             * Create a dialog box
             *
             * @param  {String}   message      The message passed from the callee
             * @param  {String}   type         Type of dialog to create
             * @param  {Function} onOkay       [Optional] Callback function when clicked okay.
             * @param  {Function} onCancel     [Optional] Callback function when cancelled.
             *
             * @return {Object}
             */
            dialog: function(message, type, onOkay, onCancel) {

                this.init();

                queue.push({
                  type: type,
                  message: message,
                  onOkay: onOkay,
                  onCancel: onCancel
                });

                if (!isopen) {
                    this.setup();
                }
            },

            /**
             * Hide the dialog and rest to defaults
             *
             * @return {undefined}
             */
            hide: function() {

                var transitionDone;
                var self = this;

                // remove reference from queue
                queue.splice(0, 1);
                // if items remaining in the queue
                if (queue.length > 0) {
                    this.setup(true);

                } else {
                    isopen = false;
                    // Hide the dialog box after transition
                    // This ensure it doens't block any element from being clicked
                    transitionDone = function(event) {
                        event.stopPropagation();
                        // unbind event so function only gets called once
                        elDialog.removeEventListener(self.transition.type, transitionDone);
                    };

                    // whether CSS transition exists
                    if (this.transition.supported) {
                        elDialog.addEventListener(this.transition.type, transitionDone);
                    }

                    elDialog.className = "alertify alertify-hide alertify-hidden";

                }
            },

            /**
             * Initialize Alertify
             * Create the 2 main elements
             *
             * @return {undefined}
             */
            init: function() {

                this.injectCss();

                if ($("alertify") === null) {
                    isopen = false;
                    queue = [];
                    elDialog = document.createElement("div");
                    elDialog.setAttribute("id", "alertify");
                    elDialog.className = "alertify alertify-hidden";
                    document.body.appendChild(elDialog);
                }

                if ($("alertify-logs") === null) {
                    elLog = document.createElement("div");
                    elLog.setAttribute("id", "alertify-logs");
                    elLog.className = "alertify-logs";
                    document.body.appendChild(elLog);
                }

                // set transition type
                this.transition = getTransitionEvent();

            },

            /**
             * Show a new log message box
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Optional type of log message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
             *
             * @return {Object}
             */
            log: function(message, type, click) {

                this.init();
                elLog.className = "alertify-logs";

                var diff = elLog.childNodes.length - this.maxLogItems;
                if(diff >= 0) {
                  for (var i = 0, _i = diff + 1; i < _i; i++) {
                    this.close(elLog.childNodes[i], 1);
                  }
                }

                this.notify(message, type, click);

            },

            /**
             * Add new log message
             * If a type is passed, a class name "alertify-log-{type}" will get added.
             * This allows for custom look and feel for various types of notifications.
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Type of log message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
             *
             * @return {undefined}
             */
            notify: function(message, type, click) {

                var log = document.createElement("div");
                log.className = "alertify-log alertify-log-" + (type || "default");
                log.innerHTML = message;

                // Add the click handler, if specified.
                if ("function" === typeof click) {
                    log.addEventListener("click", click);
                }

                elLog.appendChild(log);
                setTimeout(function() {
                    log.className += " alertify-log-show";
                }, 50);

                this.close(log, this.delay);

            },

            /**
             * Initiate all the required pieces for the dialog box
             *
             * @return {undefined}
             */
            setup: function(fromQueue) {

                var item = queue[0];
                var self = this;

                var transitionDone = function(ev) {
                    elDialog.removeEventListener(self.transition.type, transitionDone);
                };

                // dialog is open
                isopen = true;

                // whether CSS transition exists
                if (this.transition.supported && !fromQueue) {
                    elDialog.addEventListener(this.transition.type, transitionDone);
                }

                // build the proper dialog HTML
                elDialog.innerHTML = this.build(item);

                // assign all the common elements
                btnOK = $("alertify-ok") || undefined;
                btnCancel = $("alertify-cancel") || undefined;
                input = $("alertify-text") || undefined;
                form = $("alertify-form") || undefined;

                if(input) {
                  if (typeof this.promptPlaceholder === "string") {
                      input.placeholder = this.promptPlaceholder;
                  }
                  if (typeof this.promptValue === "string") {
                      input.value = this.promptValue;
                  }
                }

                this.addListeners(item.onOkay, item.onCancel);

            },

            okBtn: function(label) {
                this.okLabel = label;
                return this;
            },

            setDelay: function(time) {

              var dur = parseInt(time || 0, 10);
              this.delay = isNaN(dur) ? this.defultDelay : time;
              return this;
            },

            cancelBtn: function(str) {
              this.cancelLabel = str;
              return this;
            },

            setMaxLogItems: function(num) {
              this.maxLogItems = parseInt(num || this.defaultMaxLogItems);
            },

            reset: function() {

              this.okBtn(this.defaultOkLabel);
              this.cancelBtn(this.defaultCancelLabel);
              this.setMaxLogItems();
              this.promptValue = "";
              this.promptPlaceholder = "";
              this.delay = this.defaultDelay;
              this.setCloseLogOnClick(this.closeLogOnClickDefault);

            },

            injectCss: function() {
              if (! hasCss) {
                var head = document.getElementsByTagName("head")[0];
                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = "/* style.css */";
                head.insertBefore(css, head.firstChild);
                hasCss = true;
              }
            }

        };

        return {
            reset: function() {
                _alertify.reset();
                return this;
            },
            alert: function(message, onOkay, onCancel) {
                _alertify.dialog(message, "alert", onOkay, onCancel);
                return this;
            },
            confirm: function(message, onOkay, onCancel) {
                _alertify.dialog(message, "confirm", onOkay, onCancel);
                return this;
            },
            prompt: function(message, onOkay, onCancel) {
                _alertify.dialog(message, "prompt", onOkay, onCancel);
                return this;
            },
            log: function(message, click) {
                _alertify.log(message, "default", click);
                return this;
            },
            success: function(message, click) {
                _alertify.log(message, "success", click);
                return this;
            },
            error: function(message, click) {
                _alertify.log(message, "error", click);
                return this;
            },
            cancelBtn: function(label) {
                _alertify.cancelBtn(label);
                return this;
            },
            okBtn: function(label) {
                _alertify.okBtn(label);
                return this;
            },
            delay: function(time) {
                _alertify.setDelay(time);
                return this;
            },
            placeholder: function(str) {
                _alertify.promptPlaceholder = str;
                return this;
            },
            defaultValue: function(str) {
                _alertify.promptValue = str;
                return this;
            },
            maxLogItems: function(num) {
                _alertify.setMaxLogItems(num);
                return this;
            },
            closeLogOnClick: function(bool) {
                _alertify.setCloseLogOnClick(!! bool);
                return this;
            }
        };
    };

    // AMD, window, and NPM support
    if ("undefined" !== typeof module && !! module && !! module.exports) {
        module.exports = Alertify;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return new Alertify();
        });
    } else {
        global.alertify = new Alertify();
    }

}(typeof window !== "undefined" ? window : {}));
