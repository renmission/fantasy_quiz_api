const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

// hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;

    next();
});

// compare password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;