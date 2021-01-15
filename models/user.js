const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.statics.findAndValidate = async function(email, password) {
    const foundUser = await this.findOne({ email: email });
    if (foundUser) {
        const isValid = await bcrypt.compare(password, foundUser.password);
        return isValid ? foundUser: false;
    }
    return false;
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { 
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;