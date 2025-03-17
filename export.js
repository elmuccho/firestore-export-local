const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load Firebase credentials
const serviceAccount = require("./service_account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// ⚠️ Specify the Firestore collections to export
const collections = ["Attractions", "Museums", "Clubs", "Pubs", "Shops", "Restaurants"];

async function exportFirestoreData() {
  try {
    const exportDir = path.join(__dirname, "data");

    // Ensure the "Collections" directory exists
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    for (const coll of collections) {
      console.log(`📥 Exporting collection: ${coll}`);

      const snapshot = await firestore.collection(coll).get();
      const collectionData = {};

      snapshot.forEach((doc) => {
        collectionData[doc.id] = doc.data();
      });

      // Save each collection as a separate JSON file inside "Collections"
      const filePath = path.join(exportDir, `${coll}.json`);
      fs.writeFileSync(filePath, JSON.stringify(collectionData, null, 2));

      console.log(`✅ Collection "${coll}" saved to file: ${filePath}`);
    }

    console.log("🎉 All collections have been successfully exported!");
  } catch (err) {
    console.error("❌ Error exporting collections:", err);
  }
}

// Start the export process
exportFirestoreData();
