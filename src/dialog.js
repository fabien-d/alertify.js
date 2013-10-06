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

        var parent, transitionTimeout;

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
            onOK: function ( event ) {
                prevent( event );
                parent.close();

                // allow custom `ok` method
                if ( typeof parent.ok === 'function' ) {
                    parent.ok( input.value );
                }
            },

            /**
             * Handle clicking Cancel
             *
             * @param  {Event} event Click event
             * @return {undefined}
             */
            onCancel: function ( event ) {
                prevent( event );
                parent.close();

                // allow custom `cancel` method
                if ( typeof parent.cancel === 'function' ) {
                    parent.cancel();
                }
            },

            /**
             * Handle resetting focus
             *
             * @param  {Event} event Focus event
             * @return {undefined}
             */
            onReset: function ( event ) {
                prevent( event );
                setFocus( true );
            },

            /**
             * Show the dialog
             *
             * @return {undefined}
             */
            show: function () {
                parent = this;
                this.build();

                on( btnOK, 'click', this.onOK );
                on( btnCancel, 'click', this.onCancel );
                on( btnFocusReset, 'focus', this.onReset );

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
                off( btnOK, 'click', this.onOK );
                off( btnCancel, 'click', this.onCancel );
                off( btnFocusReset, 'focus', this.onResetFocus );

                coverEl.className = CLASS_COVER_HIDE;
                this.el.className += ' alertify-close';

                // allow custom `onclose` method
                if ( typeof this.onclose === 'function' ) {
                    this.onclose();
                }
            }
        };
    } () );
