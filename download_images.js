const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");

// Load Firebase key
const serviceAccount = require("./service_account_key.json");

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "service_account_key.json"); // ✅ Fix for the error

const storageBucketName = "example-1d8de.firebasestorage.app"; // 🔥 Check that the bucket is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucketName,
});

const storage = new Storage();
const bucket = storage.bucket(storageBucketName);
const downloadPath = "./images"; // Folder for downloads

async function downloadAllFiles() {
  try {
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }

    const [files] = await bucket.getFiles();
    console.log(`📂 Files found: ${files.length}`);

    for (const file of files) {
      const destFilename = path.join(downloadPath, file.name);

      // Create nested folders if necessary
      const dir = path.dirname(destFilename);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      console.log(`📥 Downloading: ${file.name} → ${destFilename}`);
      await file.download({ destination: destFilename });

      console.log(`✅ File saved: ${destFilename}`);
    }

    console.log("🎉 All files downloaded successfully!");
  } catch (err) {
    console.error("❌ Error downloading files:", err);
  }
}

// Run the process
downloadAllFiles();
