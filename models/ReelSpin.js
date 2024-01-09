import mongoose from "mongoose";


const reelSpinSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  purpose: [String],
  description: [{
        text: String
    }],
  brand: String,
  series: String,
  models: [
    {
      price: String,
      stock: Boolean,
      modNumber: String,
      item: String,
      spoolSize: String,
      lineCapacity: String,
      lineRetrieve: String,
      gearRatio: String,
      weight: String,
      dragMax: String,
    },
  ],
  dragSys: String,
  handle: String,
  ballBearing: String,
  country: String,
  img: [String],
  alt: String,
}); 

const SpinReelModel =
  mongoose.models.spinningreel ||
  mongoose.model("spinningreel", reelSpinSchema);

export default SpinReelModel;