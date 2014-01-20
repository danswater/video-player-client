'use strict';

module.exports = function( grunt ) {
	grunt.loadNpmTasks( 'grunt-karma' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	grunt.initConfig( {
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			// for CI servers
			ci: {
				singleRun: true,
				browsers: [ 'PhantomJS' ]
			},
			dev: {
				singleRun: true,
				browsers: [ 'Chrome' ]
			}
		},
		// linting
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require( 'jshint-stylish' )
			},
			all: [
				'Gruntfile.js',
				'karma.conf.js',
				'test/{,*/}*.js',
				'src/{,*/}*.js'
			]
		},
	} );

	grunt.registerTask( 'test', [ 'jshint', 'karma:dev' ] );
};
