import { NextResponse } from "next/server";
import SpinReelModel from "../../../../../models/ReelSpin";
import CarpReelModel from "../../../../../models/CarpReel";
import connectDB from "../../../../../utils/database";


export async function GET(request, { params }) {
  try {
    const id = params.id;

    const db = await connectDB;

    const spinReel = await SpinReelModel.findById(id);
    const carpReel = await CarpReelModel.findById(id);

    if (spinReel) {
      return NextResponse.json(spinReel, { status: 200 });
    }
    if (carpReel) {
      return NextResponse.json(carpReel, { status: 200 });
    }

    return NextResponse.json("Not found", { status: 404 });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Error in response", { status: 500 });
  }
}
