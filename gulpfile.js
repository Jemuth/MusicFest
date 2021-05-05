const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

// Funcion para compilar SASS

function css(  ) {
    return src('src/scss/app.scss')
        .pipe( sass({
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/css') )
}

function minificarCss(  ) {
    return src('src/scss/app.scss')
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        .pipe( dest('./build/css') )
}

function watchArchivos() {
    watch( 'src/scss/**/*.scss', css )
}

exports.css = css;
exports.minificarCss = minificarCss;
exports.watchArchivos = watchArchivos