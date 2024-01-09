import mongoose from "mongoose";

const reelCarpSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  price: String,
  stock: Boolean,
  purpose: [String],
  description: [
    {
      text: String,
    },
  ],
  brand: String,
  series: String,
  model: String,
  item: String,
  dragSys: String,
  dragMax: String,
  spoolSize: String,
  lineCapacity: String,
  lineRetrieve: String,
  gearRatio: String,
  handle: String,
  weght: String,
  ballBearing: String,
  country: String,
  img: [String],
});

const CarpReelModel =
  mongoose.models.carpreel ||
  mongoose.model("carpreel", reelCarpSchema);

export default CarpReelModel;
