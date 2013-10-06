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

        test( 'onOK method', function () {
            assert.isFunction( this.alert.onOK );
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

    suite( 'alertify.alert accept method', function () {
        test( 'accept method after OK button click', function ( done ) {
            this.alert.accept = function () {
                done();
            };

            this.alert.show();
            triggerClick( this.ok );
        } );
    } );

} () );
