import { bucketName, s3Client } from "@/utils/s3/config";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const imgs = formData.getAll("images") as File[];

    if(imgs.length === 0) {
        return NextResponse.json({ 
            success: false,
            message: "No image(s) provided",
            data: null
        }, { status: 400 });
    }

    const urls = await Promise.all(
        imgs.map(async (img) => {
            const body = Buffer.from(await img.arrayBuffer());
            const params = {
                Bucket: bucketName,
                Key: img.name,
                Body: body,
                ContentType: img.type, 
            };
        
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
        
            const getObjectParams = {
                Bucket: bucketName,
                Key: img.name,
                ACL: "private"
            }
        
            const getCommand = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 86400 });

            return url;
        }
    ));

    return NextResponse.json({ 
        success: true,
        message: "Image(s) uploaded successfully",
        data: {
            urls,
        }
    });
}