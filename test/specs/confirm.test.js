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

    suite( 'alertify.confirm accept method', function () {
        test( 'accept method after OK button click', function ( done ) {
            this.confirm.accept = function () {
                done();
            };

            this.confirm.show();
            triggerClick( this.ok );
        } );
    } );

    suite( 'alertify.confirm deny method', function () {
        test( 'deny method after Cancel button click', function ( done ) {
            this.confirm.deny = function () {
                done();
            };

            this.confirm.show();
            triggerClick( this.cancel );
        } );
    } );

} () );
