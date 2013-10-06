    /**
     * Base object for all dialog object
     *
     * @return {undefined}
     */
    var dialog = (function () {
        var CLASS_BASE = 'alertify';
        var CLASS_TYPE = CLASS_BASE + ' alertify--';
        var btnOK = document.getElementById( 'alertifyButtonOk' );
        var btnCancel = document.getElementById( 'alertifyButtonCancel' );
        var input = document.getElementById( 'alertifyInput' );
        var titleEl = document.getElementById( 'alertifyTitle' );

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

                this.el.className += ' alertify-close';

                // allow custom `onclose` method
                if ( typeof this.onclose === 'function' ) {
                    this.onclose();
                }
            }
        };
    } () );
