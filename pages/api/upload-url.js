import { Storage } from "@google-cloud/storage";

export default async function handler(req, res) {
  console.log("entra a upload-url111");
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
      // private_key: process.env.PRIVATE_KEY
    }
  });

  let pid = req.query.pid;
  let timestamp = new Date().toISOString();
  let ext = req.query.file.split(".").pop();

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  //  e.g. {123456}/2021-01-27T00:45:40.558Z.png
  const file = bucket.file(`${pid}/${timestamp}.${ext}`);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" }
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  // response.newFileName = `${timestamp}.${ext}`;
  res.status(200).json(response);
}
