module.exports = (grunt) ->
    'use strict'

    # Variables
    pkg = grunt.file.readJSON 'package.json'
    repo = "https://github.com/ststgc/baseline-grid.git"
    image = "build/assets/images"
    css = 'build/assets/stylesheets/*.css'

    # Configs
    grunt.initConfig

        # Optimize PNG, JPG, GIF images
        image:
            options:
                optimizationLevel: 3
            dist:
                files: [
                    expand: true
                    cwd: "build/assets/images"
                    src: ["**/*.{png,jpg,jpeg,gif}"]
                    dest: image
                ]

        # Middleman build/server
        middleman:
            options:
                useBundle: true
            build:
                options:
                    command: 'build'
            server:
                options:
                    command: 'server'

        # Autoprefixer
        autoprefixer:
            options:
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            dist:
                src: css

        # Combine spagetty media-queries
        cmq:
            options:
                log: false
            dist:
                files:
                    'build/assets/stylesheets/': css

        # Minify CSS files with CSSO
        csso:
            dist:
                options:
                    banner: """

                    """
                files:
                    'build/assets/stylesheets/sushi.css': css

        # Minify HTML
        htmlmin:
            dist:
                options:
                    removeComments: true
                    collapseWhitespace: true
                    removeRedundantAttributes: true
                    removeOptionalTags: true
                expand: true
                cwd: 'build'
                src: ['**/*.html']
                dest: 'build'

        # Minify js
        uglify:
            dist:
                files: [
                    expand: true
                    cwd: 'build/assets/javascripts'
                    src: '**/*.js'
                    dest: 'build/assets/javascripts'
                ]

        # Publish to Github-Page
        'gh-pages':
            options:
                base: 'build/'
                branch: 'gh-pages'
                repo: repo
                message: 'updated'
            src: '**/*'


        # Browser sync
        browserSync:
            files:
                src: [
                    'build/**/*'
                ]
                options:
                    watchTask: true
                    proxy: "http://0.0.0.0:4567/"
                    browser: "google chrome"
                    ghostMode:
                        scroll: true
                        links: true
                        forms: true


    # Load packages
    ## if it name starts with 'grunt-'
    for taskName of pkg.devDependencies
        if taskName.substring(0,6) == 'grunt-'
            grunt.loadNpmTasks taskName
    ## else
    require("time-grunt") grunt








    # Grunt tasks
    ## Variable-ish thing
    grunt.registerTask 'stylesheet', ['autoprefixer', 'cmq', 'csso']
    grunt.registerTask 'image', ['image']

    ## Dev
    grunt.registerTask 'default', ['middleman:server']
    grunt.registerTask 'check', ['browserSync', 'middleman:server']
    grunt.registerTask 'build', ['middleman:build', 'stylesheet', 'htmlmin', 'uglify']
    grunt.registerTask 'publish', ['build', 'gh-pages']

    ## Production
    grunt.registerTask 'production', ['build', 'image']
