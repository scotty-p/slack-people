System.config({
    defaultJSExtensions: true,
    paths: {
      '@angular/*': './@angular/*',
      '@angular2-material/*': './@angular2-material/*',
      "rxjs/*": "./rxjs/*",
      "reflect-metadata": "./reflect-metadata"
    },
    map: {
      "rxjs": "./rxjs"
    },
    packages: {
      '@angular/common': {
        main: 'index'
      },
      '@angular/compiler': {
        main: 'index'
      },
      '@angular/core': {
        main: 'index'
      },
      '@angular/http': {
        main: 'index'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index'
      },
      '@angular/platform-browser': {
        main: 'index'
      },
      '@angular/router': {
        main: 'index'
      },

      "rxjs": {
        defaultExtension: 'js'
      },
      'dist': {
        defaultExtension: 'js',
        format: 'register'
      }
    }
  });
