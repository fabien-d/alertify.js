/**
 * alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2013
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://fabien-d.github.com/alertify.js/
 * @module alertify
 * @version 0.5.0
 */
( function ( global ) {
    'use strict';

    /**
     * Use a closure to return proper event listener method. Try to use
     * `addEventListener` by default but fallback to `attachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var on = ( function () {
        if ( document.addEventListener ) {
            return function ( el, event, fn ) {
                el.addEventListener( event, fn, false );
            };
        } else if ( document.attachEvent ) {
            return function ( el, event, fn ) {
                el.attachEvent( 'on' + event, fn );
            };
        }
    } () );

    /**
     * Use a closure to return proper event listener method. Try to use
     * `removeEventListener` by default but fallback to `detachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var off = ( function () {
        if ( document.removeEventListener ) {
            return function ( el, event, fn ) {
                el.removeEventListener( event, fn, false );
            };
        } else if ( document.detachEvent ) {
            return function ( el, event, fn ) {
                el.detachEvent( 'on' + event, fn );
            };
        }
    } () );

    /**
     * Prevent default event from firing
     *
     * @param  {Event} event Event object
     * @return {undefined}
     */
    function prevent ( event ) {
        if ( event.preventDefault ) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    var transition = ( function () {
        var t, type;
        var supported = false;
        var el = document.createElement( 'fakeelement' );
        var transitions = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'otransitionend',
            'transition': 'transitionend'
        };

        for ( t in transitions ) {
            if ( el.style[ t ] !== undefined ) {
                type = transitions[ t ];
                supported = true;
                break;
            }
        }

        return {
            type: type,
            supported: supported
        };
    } () );

    /**
     * Base object for all dialog object
     *
     * @return {undefined}
     */
    var dialog = (function () {
        var CLASS_BASE = 'alertify';
        var CLASS_TYPE = CLASS_BASE + ' alertify--';
        var CLASS_COVER_SHOW = 'alertify-cover';
        var CLASS_COVER_HIDE = CLASS_COVER_SHOW + ' alertify-hidden';

        var btnOK = document.getElementById( 'alertifyButtonOk' );
        var btnCancel = document.getElementById( 'alertifyButtonCancel' );
        var input = document.getElementById( 'alertifyInput' );
        var titleEl = document.getElementById( 'alertifyTitle' );
        var coverEl = document.getElementById( 'alertifyCover' );

        var transitionDone;

        /**
         * Set transitionend event listener since you can't set focus to
         * elements during the transition
         *
         * @return {undefined}
         */
        function setTransition () {
            /*jshint validthis:true*/
            var self = this;

            transitionDone = function ( event ) {
                prevent( event );
                setFocus.call( self );

                // allow custom `onfocus` method
                if ( typeof self.onfocus === 'function' ) {
                    self.onfocus();
                }

                off( self.el, transition.type, transitionDone );
            };

            on( this.el, transition.type, transitionDone );
        }

        /**
         * Set focus to proper dialog element
         *
         * @return {undefined} [description]
         */
        function setFocus () {
            /*jshint validthis:true*/
            if ( this.type === 'prompt' ) {
                input.focus();
                input.select();
            } else {
                switch ( this.settings.focus ) {
                case 'ok':
                    btnOK.focus();
                    break;
                case 'cancel':
                    btnCancel.focus();
                    break;
                default:
                    btnOK.focus();
                }
            }
        }

        // common dialog API
        return {
            el: document.getElementById( 'alertifyDialog' ),

            /**
             * Customizable settings
             *
             * @type {Object}
             */
            settings: {
                ok: 'OK',
                cancel: 'Cancel',
                focus: 'ok'
            },

            /**
             * Update HTML copy based on settings as passed message
             *
             * @return {undefined}
             */
            build: function () {
                titleEl.innerHTML = this.message;
                btnOK.innerHTML = this.settings.ok;
                btnCancel.innerHTML = this.settings.cancel;
                input.value = this.value || '';
            },

            /**
             * Handle clicking OK
             *
             * @param  {Event} event Click event
             * @return {undefined}
             */
            onAccept: function ( event ) {
                prevent( event );
                this.close();

                // allow custom `accept` method
                if ( typeof this.accept === 'function' ) {
                    this.accept( input.value );
                }
            },

            /**
             * Handle clicking Cancel
             *
             * @param  {Event} event Click event
             * @return {undefined}
             */
            onDeny: function ( event ) {
                prevent( event );
                this.close();

                // allow custom `deny` method
                if ( typeof this.deny === 'function' ) {
                    this.deny();
                }
            },

            /**
             * Show the dialog
             *
             * @return {undefined}
             */
            show: function () {
                this.build();

                on( btnOK, 'click', this.onOK );
                on( btnCancel, 'click', this.onCancel );

                if ( transition.supported ) {
                    setTransition.call( this );
                }

                coverEl.className = CLASS_COVER_SHOW;
                this.el.className = CLASS_TYPE + this.type;

                if ( !transition.supported ) {
                    setFocus.call( this );
                }

                // allow custom `onshow` method
                if ( typeof this.onshow === 'function' ) {
                    this.onshow();
                }
            },

            /**
             * Close the dialog
             *
             * @return {undefined}
             */
            close: function () {
                off( btnOK, 'click', this.onOK );
                off( btnCancel, 'click', this.onCancel );

                coverEl.className = CLASS_COVER_HIDE;
                this.el.className += ' alertify-close';

                // allow custom `onclose` method
                if ( typeof this.onclose === 'function' ) {
                    this.onclose();
                }
            }
        };
    } () );

    /**
     * Alert dialog object
     *
     * @param  {String} message Alert message
     * @return {Object}
     */
    function AlertifyAlert ( message ) {
        var self = this;

        // alert properties
        this.message = message;
        this.type = 'alert';

        /**
         * Handle clicking OK
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onOK = function ( event ) {
            self.onAccept.call( self, event );
        };
    }

    // Add the common dialog functionality to the prototype
    AlertifyAlert.prototype = dialog;

    /**
     * Confirm dialog object
     *
     * @param  {String} message Confirm message
     * @return {Object}
     */
    function AlertifyConfirm ( message ) {
        var self = this;

        // confirm properties
        this.message = message;
        this.type = 'confirm';

        /**
         * Handle clicking OK
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onOK = function ( event ) {
            self.onAccept.call( self, event );
        };

        /**
         * Handle clicking Cancel
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onCancel = function ( event ) {
            self.onDeny.call( self, event );
        };
    }

    // Add the common dialog functionality to the prototype
    AlertifyConfirm.prototype = dialog;

    /**
     * Prompt dialog object
     *
     * @param  {String} message Prompt message
     * @return {Object}
     */
    function AlertifyPrompt ( message, value ) {
        var self = this;

        // prompt properties
        this.message = message;
        this.value = value;
        this.type = 'prompt';

        /**
         * Handle clicking OK
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onOK = function ( event ) {
            self.onAccept.call( self, event );
        };

        /**
         * Handle clicking Cancel
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onCancel = function ( event ) {
            self.onDeny.call( self, event );
        };
    }

    // Add the common dialog functionality to the prototype
    AlertifyPrompt.prototype = dialog;

    /**
     * Alertify public API
     * This contains everything that is exposed through the alertify object.
     *
     * @return {Object}
     */
    function Alertify () {
        return {
            /**
             * Expose dialog labels for customization
             * @type {Object}
             */
            settings: dialog.settings,

            /**
             * Display an alert dialog with an optional message and an OK button
             *
             * @param  {String} [message=undefined] Message in alert dialog
             * @return {Object}
             */
            alert: function ( message ) {
                return new AlertifyAlert( message );
            },

            /**
             * Display a confirm dialog with an optional message and two
             * buttons, OK and Cancel
             *
             * @param  {String} [message=undefined] Message in confirm dialog
             * @return {Object}
             */
            confirm: function ( message ) {
                return new AlertifyConfirm( message );
            },

            /**
             * Display a prompt dialog with an optional message prompting the
             * user to input some text
             *
             * @param  {String} [message=undefined] Message in confirm dialog
             * @param  {String} [value='']          Default value in input field
             * @return {Object}
             */
            prompt: function ( message, value ) {
                return new AlertifyPrompt( message, value );
            }
        };
    }

    // AMD and window support
    if ( typeof define === 'function' ) {
        define( [], function () {
            return new Alertify();
        } );
    } else if ( !global.alertify ) {
        global.alertify = new Alertify();
    }

} ( this ) );
