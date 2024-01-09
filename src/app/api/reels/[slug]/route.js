

import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/database";
import SpinReelModel from "../../../../../models/ReelSpin";
import CarpReelModel from "../../../../../models/CarpReel";

export async function GET(request, {params}) {
  try {
      const slug = params.slug;
  
    const db = await connectDB;

      const spinReel = await SpinReelModel.findById(slug);
      const carpReel = await CarpReelModel.findById(slug);

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
