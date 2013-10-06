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
