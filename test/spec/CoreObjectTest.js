define( function( require ) {
	'use strict';

	var CoreObject = require( 'lib/CoreObject' );

	describe( 'CoreObject', function() {
		var TestObject;

		describe( 'One level extension', function() {
			var instance;

			before(function () {
				TestObject = CoreObject.extend( {
					init: function( initOptions ) {
						this.a = initOptions.a;
					},
					testFn: function() {
						return true;
					}
				} );
				instance = new TestObject( { 'a' : true } );
			} );

			it( 'should be an instance of CoreObject', function() {
				instance.should.be.an.instanceof( CoreObject );
			} );

			it( 'should be an instance of TestObject', function() {
				instance.should.be.an.instanceof( TestObject );
			} );

			it('should have the correct properties and methods', function () {
				instance.a.should.equal( true );
				instance.testFn().should.equal( true );
			} );
		} );

		describe('Two level extension', function () {
			var SubTestObject;
			var subInstance;

			before(function () {
				SubTestObject = TestObject.extend({
					init: function( initOptions ){
						TestObject.call(this, initOptions);
						this.b = initOptions.b;
					},
					testFn: function() {
						return false;
					}
				});

				subInstance = new SubTestObject({'a': true, 'b': true});
			} );

			it( 'should be an instance of CoreObject and TestObject', function() {
				subInstance.should.be.an.instanceof( CoreObject );
				subInstance.should.be.an.instanceof( TestObject );
			} );

			it( 'should have the correct properties and methods', function() {
				subInstance.a.should.equal( true );
				subInstance.a.should.equal( true );
				subInstance.testFn().should.equal( false );
			} );
		} );

		describe( 'CoreObject creation', function() {
			var createdInstance;

			before( function() {
				createdInstance = TestObject.create( { 'a': true } );
			} );

			it( 'should be an instance of CoreObject', function() {
				createdInstance.should.be.an.instanceof( CoreObject );
			} );

			it('should be an instance of TestObject', function () {
				createdInstance.should.be.an.instanceof( TestObject );
			} );

			it( 'should have the correct properties and methods', function() {
				createdInstance.a.should.equal( true );
				createdInstance.testFn().should.equal( true );
			} );
		} );
	} );
} );
