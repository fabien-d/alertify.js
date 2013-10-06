( function () {

    setup( function () {
        this.confirm = alertify.confirm( 'test' );
        this.ok = document.getElementById( 'alertifyButtonOk' );
        this.cancel = document.getElementById( 'alertifyButtonCancel' );
    } );

    suite( 'alertify.confirm return', function () {
        test( 'message string', function () {
            assert.isString( this.confirm.message );
        } );

        test( 'message value', function () {
            assert.strictEqual( this.confirm.message, 'test' );
        } );

        test( 'type string', function () {
            assert.isString( this.confirm.type );
        } );

        test( 'type value', function () {
            assert.strictEqual( this.confirm.type, 'confirm' );
        } );

        test( 'onOK method', function () {
            assert.isFunction( this.confirm.onOK );
        } );

        test( 'onCancel method', function () {
            assert.isFunction( this.confirm.onCancel );
        } );
    } );

    suite( 'alertify.confirm prototype', function () {
        test( 'show method', function () {
            assert.isFunction( this.confirm.show );
        } );

        test( 'close method', function () {
            assert.isFunction( this.confirm.close );
        } );

        test( 'el property', function () {
            assert.isObject( this.confirm.el );
        } );
    } );

    suite( 'alertify.confirm show method', function () {
        test( 'custom onshow method', function ( done ) {
            this.confirm.onshow = function () {
                done();
            };

            this.confirm.show();
        } );

        test( 'sets proper classes', function () {
            this.confirm.show();
            assert.strictEqual( this.confirm.el.className, 'alertify alertify--confirm' );
        } );

        test( 'sets proper title', function () {
            this.confirm.show();
            assert.strictEqual( document.getElementById( 'alertifyTitle' ).innerHTML, 'test' );
        } );

        test( 'OK button label', function () {
            this.confirm.show();
            assert.strictEqual( this.ok.innerHTML, 'OK' );
        } );

        test( 'Cancel button label', function () {
            this.confirm.show();
            assert.strictEqual( this.cancel.innerHTML, 'Cancel' );
        } );

        test( 'Custom OK button label', function () {
            this.confirm.settings.ok = 'Accept';
            this.confirm.show();
            assert.strictEqual( this.ok.innerHTML, 'Accept' );
        } );

        test( 'Custom Cancel button label', function () {
            this.confirm.settings.cancel = 'Deny';
            this.confirm.show();
            assert.strictEqual( this.cancel.innerHTML, 'Deny' );
        } );

        test( 'sets focus to ok button', function ( done ) {
            this.confirm.onfocus = function () {
                assert.strictEqual( document.activeElement, document.getElementById( 'alertifyButtonOk' ) );
                done();
            };

            this.confirm.show();
        } );

        test( 'reset focus to cancel button', function ( done ) {
            this.confirm.onfocus = function () {
                triggerEvent( document.getElementById( 'alertifyFocusReset' ), 'focus' );
                assert.strictEqual( document.activeElement, document.getElementById( 'alertifyButtonCancel' ) );
                done();
            };

            this.confirm.show();
        } );
    } );

    suite( 'alertify.confirm close method', function () {
        test( 'custom onclose method', function ( done ) {
            this.confirm.onclose = function () {
                done();
            };

            this.confirm.close();
        } );

        test( 'sets proper classes', function () {
            this.confirm.show();
            this.confirm.close();
            assert.strictEqual( this.confirm.el.className, 'alertify alertify--confirm alertify-close' );
        } );
    } );

    suite( 'alertify.confirm ok method', function () {
        test( 'ok method after OK button click', function ( done ) {
            this.confirm.ok = function () {
                done();
            };

            this.confirm.show();
            triggerEvent( this.ok, 'click' );
        } );
    } );

    suite( 'alertify.confirm cancel method', function () {
        test( 'cancel method after Cancel button click', function ( done ) {
            this.confirm.cancel = function () {
                done();
            };

            this.confirm.show();
            triggerEvent( this.cancel, 'click' );
        } );
    } );

} () );
