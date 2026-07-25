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
         required: [
            function () {
               return !this.steam_id;
            },
            "Email є обов'язковим для заповнення",
         ],
         unique: true,
         sparse: true,
         lowercase: true,
         trim: true,
         match: [
            /^\S+@\S+\.\S+$/,
            'Будь ласка, вкажіть коректну адресу електронної пошти',
         ],
      },
      steam_id: {
         type: String,
         trim: true,
         unique: true,
         sparse: true,
      },
      avatar: {
         type: String,
         default: '',
      },
      level: {
         type: Number,
         default: 0,
      },
      reputation: {
         type: Number,
         default: 0,
      },
      synergy: {
         type: Number,
         default: 0,
      },
      password: {
         type: String,
         required: [
            function () {
               return !this.steam_id;
            },
            "Пароль є обов'язковим",
         ],
         minlength: [8, 'Пароль має бути не менше ніж 8 символів'],
      },
      passwordChangedAt: {
         type: Date,
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', async function (next) {
   if (!this.password || !this.isModified('password')) return;

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);

   if (!this.isNew) {
      this.passwordChangedAt = Date.now() - 1000;
   }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
   if (!this.password) return false;
   return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
