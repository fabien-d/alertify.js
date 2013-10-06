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
        var btnFocusReset = document.getElementById( 'alertifyFocusReset' );
        var input = document.getElementById( 'alertifyInput' );
        var titleEl = document.getElementById( 'alertifyTitle' );
        var coverEl = document.getElementById( 'alertifyCover' );
        var btnWrapper = document.getElementById( 'alertifyButtons' );

        var keys = {
            ENTER: 13,
            ESC: 27
        };

        var parent, transitionTimeout;

        // set tabindex attribute on body element this allows script to give it
        // focus after the dialog is closed
        document.body.setAttribute( 'tabindex', '0' );

        /**
         * Update HTML copy based on settings as passed message
         *
         * @return {undefined}
         */
        function build () {
            titleEl.innerHTML = parent.message;
            btnOK.innerHTML = parent.settings.ok;
            btnCancel.innerHTML = parent.settings.cancel;
            input.value = parent.value || '';
        }

        /**
         * Handle transitionend event listener since you can't set focus to
         * elements during the transition
         *
         * @return {undefined}
         */
        function handleTransitionEvent ( event ) {
            prevent( event );
            clearTimeout( transitionTimeout );
            setFocus();

            // allow custom `onfocus` method
            if ( typeof parent.onfocus === 'function' ) {
                parent.onfocus();
            }

            off( parent.el, transition.type, handleTransitionEvent );
        }

        /**
         * Set focus to proper dialog element
         *
         * @return {undefined} [description]
         */
        function setFocus ( reset ) {
            on( document.body, 'keyup', onKeyup );

            if ( parent.type === 'prompt' ) {
                input.focus();
                input.select();
            } else if ( reset ) {
                if ( parent.type === 'alert' ) {
                    btnOK.focus();
                } else {
                    btnWrapper.children[ 0 ].focus();
                }
            } else {
                switch ( parent.settings.focus ) {
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

        /**
         * Handle resetting focus
         *
         * @param  {Event} event Focus event
         * @return {undefined}
         */
        function onReset ( event ) {
            prevent( event );
            setFocus( true );
        }

        /**
         * Handle clicking OK
         *
         * @param  {Event} event Click event
         * @return {undefined}
         */
        function onOK ( event ) {
            prevent( event );
            parent.close();

            // allow custom `ok` method
            if ( typeof parent.ok === 'function' ) {
                parent.ok( input.value );
            }
        }

        /**
         * Handle clicking Cancel
         *
         * @param  {Event} event Click event
         * @return {undefined}
         */
        function onCancel ( event ) {
            prevent( event );
            parent.close();

            // allow custom `cancel` method
            if ( typeof parent.cancel === 'function' ) {
                parent.cancel();
            }
        }

        /**
         * Handle keyboard shortcut
         *
         * @param  {Event} event Keyboard event
         * @return {undefined}
         */
        function onKeyup ( event ) {
            var keyCode = event.keyCode;

            if ( keyCode === keys.ENTER ) {
                onOK( event );
            }

            if ( keyCode === keys.ESC && /prompt|confirm/.test( parent.type ) ) {
                onCancel( event );
            }
        }

        // common dialog API
        return {
            /**
             * Main alertify dialog node.
             *
             * @type {Node}
             */
            el: document.getElementById( 'alertifyDialog' ),

            /**
             * Active element is the element that will receive focus after
             * closing the dialog. It defaults as the body tag, but gets updated
             * to the last focused element before the dialog was opened.
             *
             * @type {Node}
             */
            activeElement: document.body,

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
             * Show the dialog
             *
             * @return {undefined}
             */
            show: function () {
                parent = this;
                build();

                dialog.activeElement = document.activeElement;

                on( btnOK, 'click', onOK );
                on( btnCancel, 'click', onCancel );
                on( btnFocusReset, 'focus', onReset );

                if ( transition.supported ) {
                    on( this.el, transition.type, handleTransitionEvent );
                    // set 1s fallback in case transition event doesn't fire
                    clearTimeout( transitionTimeout );
                    transitionTimeout = setTimeout( handleTransitionEvent, 1000 );
                }

                coverEl.className = CLASS_COVER_SHOW;
                this.el.className = CLASS_TYPE + this.type;

                if ( !transition.supported ) {
                    setFocus();
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
                off( btnOK, 'click', onOK );
                off( btnCancel, 'click', onCancel );
                off( document.body, 'keyup', onKeyup );
                off( btnFocusReset, 'focus', onReset );

                coverEl.className = CLASS_COVER_HIDE;
                this.el.className += ' alertify-close';

                dialog.activeElement.focus();

                // allow custom `onclose` method
                if ( typeof this.onclose === 'function' ) {
                    this.onclose();
                }
            }
        };
    } () );
