const { series, src, dest, watch, paralell } = require('gulp');  
const sass = require('gulp-sass')(require('sass'));
const imagemin = import('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js'); //minifica el javascript

//Funciones que compilan SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}
function css(  ){
    return src( paths.scss )
        .pipe( sourcemaps.init()) //identifica dónde esta la referencia del codigo css para poder encontrarlo luego de la minificacion
        .pipe( sass({}) )
        .pipe( postcss( [autoprefixer(), cssnano()]))
        .pipe( sourcemaps.write('.'))
        .pipe( dest('./build/css') )
}

function javascript(){
    return src( paths.js )
        .pipe( sourcemaps.init())
        .pipe( concat('bundle.js') )
        .pipe( terser())
        .pipe( sourcemaps.write('.'))
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
exports.imagenes = imagenes;
exports.watchFile = watchFile;

exports.default = series( css, javascript, imagenes, versionWebp, watchFile); 