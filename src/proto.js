define([], function () {
    "use strict";

    var AlertifyProto,
        add,
        attach;

    /**
     * Add
     * Update bind and unbind method for browser
     * that support add/removeEventListener
     *
     * @return {undefined}
     */
    add = function () {
        this.on = function (el, event, fn) {
            el.addEventListener(event, fn, false);
        };
        this.off = function (el, event, fn) {
            el.removeEventListener(event, fn, false);
        };
    };

    /**
     * Attach
     * Update bind and unbind method for browser
     * that support attach/detachEvent
     *
     * @return {undefined}
     */
    attach = function () {
        this.on = function (el, event, fn) {
            el.attachEvent("on" + event, fn);
        };
        this.off = function (el, event, fn) {
            el.detachEvent("on" + event, fn);
        };
    };

    /**
     * Alertify Prototype API
     *
     * @type {Object}
     */
    AlertifyProto = {
        _version : "0.4.0",
        _prefix  : "alertify",
        get: function (id) {
            return document.getElementById(id);
        },
        on: function (el, event, fn) {
            if (typeof el.addEventListener === "function") {
                el.addEventListener(event, fn, false);
                add.call(this);
            } else if (el.attachEvent) {
                el.attachEvent("on" + event, fn);
                attach.call(this);
            }
        },
        off: function (el, event, fn) {
            if (typeof el.removeEventListener === "function") {
                el.removeEventListener(event, fn, false);
                add.call(this);
            } else if (el.detachEvent) {
                el.detachEvent("on" + event, fn);
                attach.call(this);
            }
        }
    };

    return AlertifyProto;
});
