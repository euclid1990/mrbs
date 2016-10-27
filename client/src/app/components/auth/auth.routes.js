"use strict";
var register_component_1 = require('./register.component');
var login_component_1 = require('./login.component');
var logout_component_1 = require('./logout.component');
exports.AuthRoutes = [
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'logout',
        component: logout_component_1.LogoutComponent
    }
];
//# sourceMappingURL=auth.routes.js.map