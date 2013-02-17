define(["validate"], function (validate) {
    "use strict";

    var element = {},
        setAttributes;

    /**
     * Set Attributes
     * Add attributes to a created element
     *
     * @param {Object} el     Created DOM element
     * @param {Object} params [Optional] Attributes object
     * @return {Object}
     */
    setAttributes = function (el, params) {
        var k;
        if (!validate.isObject(el) ||
            !validate.isObject(params, true)) {
            throw new Error(validate.messages.invalidArguments);
        }
        if (typeof params !== "undefined") {
            if (params.attributes) {
                for (k in params.attributes) {
                    if (params.attributes.hasOwnProperty(k)) {
                        el.setAttribute(k, params.attributes[k]);
                    }
                }
            }
            if (params.classes) {
                el.className = params.classes;
            }
        }
        return el;
    };

    /**
     * element API
     *
     * @type {Object}
     */
    element = {
        create: function (type, params) {
            var el;
            if (!validate.isString(type) ||
                !validate.isObject(params, true)) {
                throw new Error(validate.messages.invalidArguments);
            }

            el = document.createElement(type);
            el = setAttributes(el, params);
            return el;
        },
        ready: function (el) {
            if (!validate.isObject(el)) {
                throw new Error(validate.messages.invalidArguments);
            }
            if (el && el.scrollTop !== null) {
                return;
            } else {
                this.ready();
            }
        }
    };

    return element;
});
