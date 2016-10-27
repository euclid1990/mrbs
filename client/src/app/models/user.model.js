"use strict";
var User = (function () {
    function User(id, name, email, gender, avatar, password, password_confirmation) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.avatar = avatar;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
    ;
    return User;
}());
exports.User = User;
exports.FEMALE = 'F';
exports.MALE = 'M';
exports.GENDERS = [
    { name: 'Female', value: 'F' },
    { name: 'Male', value: 'M' }
];
//# sourceMappingURL=user.model.js.map