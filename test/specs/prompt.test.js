( function () {

    setup( function () {
        this.prompt = alertify.prompt( 'test', 'default value' );
        this.ok = document.getElementById( 'alertifyButtonOk' );
        this.cancel = document.getElementById( 'alertifyButtonCancel' );
    } );

    teardown( function () {
        delete this.prompt;
    } );

    suite( 'alertify.prompt return', function () {
        test( 'message string', function () {
            assert.isString( this.prompt.message );
        } );

        test( 'message value', function () {
            assert.strictEqual( this.prompt.message, 'test' );
        } );

        test( 'type string', function () {
            assert.isString( this.prompt.type );
        } );

        test( 'type value', function () {
            assert.strictEqual( this.prompt.type, 'prompt' );
        } );
    } );

    suite( 'alertify.prompt prototype', function () {
        test( 'show method', function () {
            assert.isFunction( this.prompt.show );
        } );

        test( 'close method', function () {
            assert.isFunction( this.prompt.close );
        } );

        test( 'el property', function () {
            assert.isObject( this.prompt.el );
        } );

        test( 'settings object', function () {
            assert.isObject( this.prompt.settings );
        } );

        test( 'activeElement node', function () {
            assert.isDefined( this.prompt.activeElement );
        } );
    } );

    suite( 'alertify.prompt show method', function () {
        test( 'custom onshow method', function ( done ) {
            this.prompt.onshow = function () {
                done();
            };

            this.prompt.show();
        } );

        test( 'sets proper classes', function () {
            this.prompt.show();
            assert.strictEqual( this.prompt.el.className, 'alertify alertify--prompt' );
        } );

        test( 'sets proper title', function () {
            this.prompt.show();
            assert.strictEqual( document.getElementById( 'alertifyTitle' ).innerHTML, 'test' );
        } );

        test( 'sets default value in input field', function () {
            this.prompt.show();
            assert.strictEqual( document.getElementById( 'alertifyInput' ).value, 'default value' );
        } );

        test( 'sets focus in input field', function ( done ) {
            this.prompt.onfocus = function () {
                done();
            };

            this.prompt.show();
        } );

        test( 'reset focus in input field', function ( done ) {
            this.prompt.onfocus = function () {
                triggerEvent( document.getElementById( 'alertifyFocusReset' ), 'focus' );
                assert.strictEqual( document.activeElement, document.getElementById( 'alertifyInput' ) );
                done();
            };

            this.prompt.show();
        } );
    } );

    suite( 'alertify.prompt close method', function () {
        test( 'custom onclose method', function ( done ) {
            this.prompt.onclose = function () {
                done();
            };

            this.prompt.show();
            this.prompt.close();
        } );

        test( 'sets proper classes', function () {
            this.prompt.show();
            this.prompt.close();
            assert.strictEqual( this.prompt.el.className, 'alertify alertify--prompt alertify-close' );
        } );
    } );

    suite( 'alertify.prompt ok method', function () {
        test( 'ok method after OK button click', function ( done ) {
            this.prompt.ok = function () {
                done();
            };

            this.prompt.show();
            triggerEvent( this.ok, 'click' );
        } );
    } );

    suite( 'alertify.prompt cancel method', function () {
        test( 'cancel method after Cancel button click', function ( done ) {
            this.prompt.cancel = function () {
                done();
            };

            this.prompt.show();
            triggerEvent( this.cancel, 'click' );
        } );
    } );

} () );
