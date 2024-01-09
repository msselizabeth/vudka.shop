
import CarpReelModel from "../../../../models/CarpReel";
import SpinReelModel from "../../../../models/ReelSpin";
import connectDB from "../../../../utils/database";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("query");
        ;
        const db = await connectDB();
     
        const spinReels = await SpinReelModel.find({
            purpose: { $elemMatch: { $eq: query } },
        });
        const carpReels = await CarpReelModel.find({
            purpose: { $elemMatch: { $eq: query } },
        });
        
        const result = [...spinReels, ...carpReels];


        return NextResponse.json(
          result ,
          { status: 200 }
        );
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Error in response", { status: 500 });
  }
}
