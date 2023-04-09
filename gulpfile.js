import gulp from "gulp";
import htmlMin from "gulp-htmlmin"
import jquery from "jquery";
import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import clean from "gulp-clean";
import cleanCSS from "gulp-clean-css";
import gulpConcat from "gulp-concat";
import imagemin from "gulp-imagemin";
import minify from "gulp-js-minify";
import gulpRename from "gulp-rename";
import gulpUglify from "gulp-uglify";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import spriteGulp from "gulp-svg-sprite"
import uncss from "gulp-uncss"


const sass = gulpSass(dartSass);

const {src, dest, watch, series, parallel} = gulp;
const bsServer = browserSync.create();

function serve() {
    bsServer.init({
        server: {
            baseDir: "./",
            browser: "chrome",
        },
    });
}

//до лучших времен
// function html() {
//     return src("./src/html/*.html")
//         .pipe(htmlMin({collapseWhitespace: true}))
//         .pipe(gulp.dest("./dist/"))
//         .pipe(bsServer.reload({stream: true}))
// }

function styles() {
    return src("./src/scss/styles.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(uncss({
                html: ['*.html'],
                ignore: [
                    '.open',
                    '.is-open',
                    '.opened',
                    '.close',
                    '.show',
                    '.hide',
                    '.active',
                    '.d-none',
                    '.visible',
                    '.checked',
                    ".visible",
                    ".hidden",
                ],
            })
        )
        .pipe(
            autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
                cascade: true,
            })
        )
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(gulpRename("styles.min.css"))
        .pipe(dest("./dist/css/"))
        .pipe(bsServer.reload({stream: true}))
}

function scripts() {
    return src("./src/js/**/*.js")
        .pipe(gulpConcat('scripts.min.js'))
        .pipe(gulpUglify())
        .pipe(dest("./dist/js/"))
        .pipe(bsServer.reload({stream: true}))
}

function images() {
    return gulp.src("./src/img/**/*.{jpg,jpeg,png,svg,webp}")
        .pipe(imagemin())
        .pipe(dest("./dist/img"))
        .pipe(bsServer.reload({stream: true}))
}

function sprite() {
    return gulp.src("./src/sprite/*.svg")
        .pipe(spriteGulp({
            mode: {
                symbol: true
            }
        }))
        .pipe(dest("./dist/sprite"))
        .pipe(bsServer.reload({stream: true}))
}

function watcher() {
    watch('./src/scss/**/*.scss', styles)
    watch("*.html", done => done()).on("change", bsServer.reload)
    //watch("./src/html/*.html").on("change", bsServer.reload) при подключении html minimizer
    watch("./src/js/*.js").on("change", series(scripts, bsServer.reload))
    watch("./src/img/**/*.{jpg,jpeg,png,svg,webp}").on("change", series(images, bsServer.reload))
    watch("./src/sprite/*.svg").on("change", series(sprite, bsServer.reload))
}

function clear() {
    return gulp.src("dist", {read: false, allowEmpty: true})
        .pipe(clean())
}

export const dev = series(styles, scripts, images, sprite, parallel(serve, watcher));
export const build = series(clear, styles, scripts, images, sprite);


