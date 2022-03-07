const { series, src, dest, watch, paralell } = require('gulp');  
const sass = require('gulp-sass')(require('sass'));
const imagemin = import('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Funciones que compilan SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}
function css(  ){
    return src( paths.scss )
        .pipe( sass({}) )
        .pipe( dest('./build/css') )
}

function minificarcss(){
    return src( paths.scss )
        .pipe( sass({}) )
        .pipe( dest('./build/css') )
}

function javascript(){
    return src( paths.js )
        .pipe( concat('bundle.js') )
        .pipe( dest('./build/js'))
}

function imagenes(){
    return src( paths.imagenes )
        //.pipe( imagemin() )
        .pipe( dest('./build/img') )
        .pipe( notify({message: 'Imagen Minificada'}));
}

function versionWebp(){
    return src( paths.imagenes )
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify( {message: 'Versión WebP lista'} ))
}

function watchFile(){ //esta función compila los archivos sass y actualiza automaticamente el archivo css
    watch( paths.scss , css);
    watch( paths.js, javascript);
}

exports.css = css; 
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchFile = watchFile;

exports.default = series( css, javascript, imagenes, versionWebp, watchFile); 