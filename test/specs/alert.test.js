( function () {

    setup( function () {
        this.alert = alertify.alert( 'test' );
        this.ok = document.getElementById( 'alertifyButtonOk' );
    } );

    suite( 'alertify.alert return', function () {
        test( 'message string', function () {
            assert.isString( this.alert.message );
        } );

        test( 'message value', function () {
            assert.strictEqual( this.alert.message, 'test' );
        } );

        test( 'type string', function () {
            assert.isString( this.alert.type );
        } );

        test( 'type value', function () {
            assert.strictEqual( this.alert.type, 'alert' );
        } );
    } );

    suite( 'alertify.alert prototype', function () {
        test( 'show method', function () {
            assert.isFunction( this.alert.show );
        } );

        test( 'close method', function () {
            assert.isFunction( this.alert.close );
        } );

        test( 'el property', function () {
            assert.isObject( this.alert.el );
        } );

        test( 'settings object', function () {
            assert.isObject( this.alert.settings );
        } );

        test( 'activeElement node', function () {
            assert.isDefined( this.alert.activeElement );
        } );
    } );

    suite( 'alertify.alert show method', function () {
        test( 'custom onshow method', function ( done ) {
            this.alert.onshow = function () {
                done();
            };

            this.alert.show();
        } );

        test( 'sets proper classes main element', function () {
            this.alert.show();
            assert.strictEqual( this.alert.el.className, 'alertify alertify--alert' );
        } );

        test( 'sets proper classes on cover', function () {
            this.alert.show();
            assert.strictEqual( document.getElementById( 'alertifyCover' ).className, 'alertify-cover' );
        } );

        test( 'sets proper title', function () {
            this.alert.show();
            assert.strictEqual( document.getElementById( 'alertifyTitle' ).innerHTML, 'test' );
        } );

        test( 'sets focus to ok button', function ( done ) {
            this.alert.onfocus = function () {
                assert.strictEqual( document.activeElement, document.getElementById( 'alertifyButtonOk' ) );
                done();
            };

            this.alert.show();
        } );

        test( 'reset focus to ok button', function ( done ) {
            this.alert.onfocus = function () {
                triggerEvent( document.getElementById( 'alertifyFocusReset' ), 'focus' );
                assert.strictEqual( document.activeElement, document.getElementById( 'alertifyButtonOk' ) );
                done();
            };

            this.alert.show();
        } );
    } );

    suite( 'alertify.alert close method', function () {
        test( 'custom onclose method', function ( done ) {
            this.alert.onclose = function () {
                done();
            };

            this.alert.close();
        } );

        test( 'sets proper classes main element', function () {
            this.alert.show();
            this.alert.close();
            assert.strictEqual( this.alert.el.className, 'alertify alertify--alert alertify-close' );
        } );

        test( 'sets proper classes on cover', function () {
            this.alert.show();
            this.alert.close();
            assert.strictEqual( document.getElementById( 'alertifyCover' ).className, 'alertify-cover alertify-hidden' );
        } );
    } );

    suite( 'alertify.alert ok method', function () {
        test( 'ok method after OK button click', function ( done ) {
            this.alert.ok = function () {
                done();
            };

            this.alert.show();
            triggerEvent( this.ok, 'click' );
        } );
    } );

} () );
