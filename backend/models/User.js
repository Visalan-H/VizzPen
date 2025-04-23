const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, 10);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        if (await compare(password, user.password)) return user;
        throw new Error('Invalid email or password');

    }
    else {
        throw new Error('Invalid email or password');
    }
}
const User = model('User', userSchema)
module.exports = User;
