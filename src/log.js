define(["alertify", "validate", "element", "transition"], function (Alertify, validate, element, transition) {
    "use strict";

    var Log,
        onTransitionEnd,
        remove,
        startTimer,
        prefix  = Alertify._prefix + "-log",
        clsShow = prefix + " is-" + prefix + "-showing",
        clsHide = prefix + " is-" + prefix + "-hidden";

    /**
     * Log Method
     *
     * @param {Object} parent HTML DOM to insert log message into
     * @param {String} type   Log type
     * @param {String} msg    Log message
     * @param {Number} delay  [Optional] Delay in ms
     */
    Log = function (parent, type, msg, delay) {
        if (!validate.isObject(parent) ||
            !validate.isString(type) ||
            !validate.isString(msg) ||
            !validate.isNumber(delay, true)) {
            throw new Error(validate.messages.invalidArguments);
        }

        this.delay  = (typeof delay !== "undefined") ? delay : 5000;
        this.msg    = msg;
        this.parent = parent;
        this.type   = type;
        this.create();
        this.show();
    };

    /**
     * Transition End
     * Handle CSS transition end
     *
     * @param  {Event} event Event
     * @return {undefined}
     */
    onTransitionEnd = function (event) {
        event.stopPropagation();
        if (typeof this.el !== "undefined") {
            Alertify.off(this.el, transition.type, this.fn);
            remove.call(this);
        }
    };

    /**
     * Remove
     * Remove the element from the DOM
     *
     * @return {undefined}
     */
    remove = function () {
        this.parent.removeChild(this.el);
        delete this.el;
    };

    /**
     * StartTimer
     *
     * @return {undefined}
     */
    startTimer = function () {
        var that = this;
        if (this.delay !== 0) {
            setTimeout(function () {
                that.close();
            }, this.delay);
        }
    };

    /**
     * Close
     * Prepare the log element to be removed.
     * Set an event listener for transition complete
     * or call the remove directly
     *
     * @return {undefined}
     */
    Log.prototype.close = function () {
        var that = this;
        if (typeof this.el !== "undefined" && this.el.parentNode === this.parent) {
            if (transition.supported) {
                this.fn = function (event) {
                    onTransitionEnd.call(that, event);
                };
                Alertify.on(this.el, transition.type, this.fn);
                this.el.className = clsHide + " " + prefix + "-" + this.type;
            } else {
                remove.call(this);
            }
        }
    };

    /**
     * Create
     * Create a new log element and
     * append it to the parent
     *
     * @return {undefined}
     */
    Log.prototype.create = function () {
        if (typeof this.el === "undefined") {
            var el = element.create("article", {
                classes: clsHide + " " + prefix + "-" + this.type
            });
            el.innerHTML = this.msg;
            this.parent.appendChild(el);
            element.ready(el);
            this.el = el;
        }
    };

    /**
     * Show
     * Show new log element and bind click listener
     *
     * @return {undefined}
     */
    Log.prototype.show = function () {
        var that = this;
        if (typeof this.el === "undefined") {
            return;
        }
        Alertify.on(this.el, "click", function () {
            that.close();
        });
        this.el.className = clsShow + " " + prefix + "-" + this.type;
        startTimer.call(this);
    };

    return Log;
});