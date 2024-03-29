import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
  amount?: number | null;
  description?: string | null;
  subject?: string | null;
  status?:string;
  transaction:string;
}

const querySchema: Schema<IPayment> = new Schema<IPayment>(
  {
    amount: {
        type: Number,
        default:0
    },
    status: {
      type: String,
      default: 'pending',
      enum:['pending','paid','failed']
    },
    description: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      default: '',
    },
    transaction: {
      type: String,
      default: 'User',
    }

  },
  { timestamps: true }
);

querySchema.index({ sponsors: 1 });
querySchema.index({ sponsorId: 1 });

querySchema.virtual('id').get(function (this: IPayment) {
  return this._id?.toHexString();
});



querySchema.set('toJSON', {
  virtuals: true,
  transform: function (_, ret) {
    const newRet = { id: ret._id };
    delete ret._id;
    delete ret.__v;
    Object.assign(newRet, ret);
    return newRet;
  }
});

querySchema.post('save', async () => {
  // Your post-save logic here
});

const QueryModel = mongoose.model<IPayment>('Query', querySchema);

export default QueryModel;
