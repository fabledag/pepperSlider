module.exports = function(grunt) {
    "use strict";
  
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify : {
            options: {
                banner: "/*\n" +
                        " * <%= pkg.name %> - pepperSlider is not another jQuery slider plugin.\n" +
                        " * It is easy/ready to use, multipurpose, ready for parallax, compatible, light, customizable...\n" +
                        " *\n" +
                        " * Copyright (c) 2012-2014 Damien SEGUIN - http://damienseguin.me\n" +
                        " *\n" +
                        " * Licensed under the MIT license:\n" +
                        " *   http://www.opensource.org/licenses/mit-license.php\n" +
                        " *\n" +
                        " * Version: <%= pkg.version %>\n" +
                        " *\n" +
                        " */\n"
            },
            target: {
                files: {
                    "jquery.pepperslider.min.js" : "jquery.pepperslider.js"
                }
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["uglify"]);

};