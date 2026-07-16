const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
   {
      nickname: {
         type: String,
         required: [true, "Нікнейм є обов'язковим для заповнення"],
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email є обов'язковим для заповнення"],
         unique: true,
         lowercase: true,
         trim: true,
         index: true,
         match: [
            /^\S+@\S+\.\S+$/,
            'Будь ласка, вкажіть коректну адресу електронної пошти',
         ],
      },
      steam_id: {
         type: String,
         required: [true, "Steam ID є обов'язковим для заповнення"],
         unique: true,
         trim: true,
      },
      password: {
         type: String,
         required: [true, "Пароль є обов'язковим"],
         minlength: [6, 'Пароль має бути не менше ніж 6 символів'],
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return;
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
