import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstname?: string | null;
  middlename?: string | null;
  lastname?: string | null;
  avatar?: string | null;
  userTypes?: string[];
  gender?: Date | null;
  birthdate?: string | null;
  bio?: string | null;
  section?: string;
  studentId?:string | null;
  data?: Map<string, string | number | boolean | null>;
  parent?: Map<string, string | number | boolean | null>;
  child?: Map<string, string | number | boolean | null>;
  email?:string;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    email:{
      type: String,
      default: '',
    },
    firstname: {
      type: String,
      default: "",
    },
    middlename: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    studentId: {
      type: String,
      default: "",
    },
    birthdate: {
      type: Date,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    userTypes: [{
      type: String,
    }],
    bio: {
      type: String,
      default: null,
    },
    section: {
      type: String,

    },
    data: {
      type: Map,
      default: {}
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    child: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },

  },
  { timestamps: true }
);

userSchema.index({ sponsors: 1 });
userSchema.index({ sponsorId: 1 });

userSchema.virtual('id').get(function (this: IUser) {
  return this._id?.toHexString();
});

userSchema.virtual('fullname').get(function (this: IUser) {
  if (this.firstname) return `${this.firstname} ${this.lastname}`;
  return undefined;
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: function (_, ret) {
    const newRet = { id: ret._id };
    delete ret._id;
    delete ret.__v;
    Object.assign(newRet, ret);
    return newRet;
  }
});

userSchema.post('save', async () => {
  // Your post-save logic here
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
