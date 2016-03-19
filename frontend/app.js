"use strict";

document.getElementById("loginButton").onclick = function(){
    require.ensure([], function(require) {
        let login = require("./login");

        login();
    }, 'auth');
};

document.getElementById("logoutButton").onclick = function(){
    require.ensure([], function(require) {
        let login = require("./logout");

        login();
    }, 'auth');
};