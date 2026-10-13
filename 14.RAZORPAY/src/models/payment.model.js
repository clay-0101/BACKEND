import mongoose  from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId:   { type: String, required: true, unique: true },
    paymentId: { type: String },
    signature: { type: String },
    amount:    { type: Number, required: true },   // in paise
    currency:  { type: String, default: "INR" },
    productId:   { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    // user:      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status:    { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  },
  { timestamps: true }
);

let paymentModel = mongoose.model("Payments", paymentSchema)
export default paymentModel