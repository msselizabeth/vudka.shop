import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/database";
import SpinReelModel from "../../../../../models/ReelSpin";
import CarpReelModel from "../../../../../models/CarpReel";

export async function GET(request, { params }) {
  try {
    const slug = params.slug;

    const db = await connectDB();

    const spinReels = await SpinReelModel.find({
      purpose: { $elemMatch: { $eq: slug } },
    });
    const carpReels = await CarpReelModel.find({
      purpose: { $elemMatch: { $eq: slug } },
    });

    const result = [...spinReels, ...carpReels];

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Error in response", { status: 500 });
  }
}

