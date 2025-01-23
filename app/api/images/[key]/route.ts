import { bucketName, s3Client } from "@/utils/s3/config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const key = req.url.split("/").pop();

    if(!key) {
        return NextResponse.json({ 
            success: false,
            message: "No key provided",
            data: null
        }, { status: 400 });
    }

    const params = {
        Bucket: bucketName,
        Key: key,
    };
  
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    return NextResponse.json({ 
        success: true,
        message: "Image deleted successfully",
        data: null
    });
}