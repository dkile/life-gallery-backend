import { S3 } from "aws-sdk";
import axios from "axios";
import { randomBytes } from "crypto";
import { FastifyInstance } from "fastify";

export const s3UploadFromUrl = async (
  server: FastifyInstance,
  url: string,
  key: string = Date.now() + randomBytes(8).toString("hex") + ".jpg"
) => {
  const s3 = new S3({ region: "ap-northeast-2" });

  const bucket = "life-gallery-image";

  try {
    const { data } = await axios.get(url, { responseType: "stream" });

    const upload = await s3
      .upload({
        Bucket: "life-gallery-image",
        Key: key,
        Body: data
      })
      .promise();

    return upload.Location;
  } catch (error) {
    console.log(error);
  }
};
