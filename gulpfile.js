const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

// Funcion para compilar SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'
}

function css(  ) {
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/css') )
}

function minificarCss(  ) {
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        .pipe( dest('./build/css') )
}

function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img'))
        .pipe( notify({message: 'Imagen Minificada'}) );
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Version webP lista'}) );
}

function watchArchivos() {
    watch( paths.scss, css )
}

exports.css = css;
exports.minificarCss = minificarCss;
exports.watchArchivos = watchArchivos
exports.imagenes = imagenes;
exports.default = series( css, imagenes, versionWebp, watchArchivos );
