import { checkUser } from "@/lib/checkUser";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth();
    const userId = session.userId;
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await checkUser();
    
    return new NextResponse("User synced successfully", { status: 200 });
  } catch (error) {
    console.error("Error in sync route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}