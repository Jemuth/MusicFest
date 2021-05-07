const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*js'
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

function javascript() {
    return src(paths.js)
        .pipe( concat('bundle.js') )
        .pipe( dest( './build/js') )   
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
    watch( paths.scss, css );
    watch( paths.js, javascript);
}

exports.css = css;
exports.minificarCss = minificarCss;
exports.watchArchivos = watchArchivos
exports.imagenes = imagenes;
exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );
