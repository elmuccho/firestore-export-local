# 🔥 Firebase Firestore & Storage Backup CLI

A simple Node.js script to **export Firestore database to JSON** and **download all files from Firebase Storage**. Ideal for local backups and offline use.

---

## 📌 Features:

✅ **Exports Firestore database** as JSON  
✅ **Saves each Firestore collection** in a separate file (`Hotels.json`, `Museums.json`, etc.)  
✅ **Downloads all images/files** from Firebase Storage  
✅ **Fully autonomous** (No GUI required)

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/elmuccho/firestore-export-local.git
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Your Firebase Credentials

- Go to **Firebase Console → Project Settings → Service Accounts**
- Click **"Generate new private key"**
- Rename the file to **`service_account_key.json`** and place it inside the project folder.

### 4️⃣ Specify the Firestore collections at export.js to export

Open `export.js` and modify the `collections` array to include the Firestore collections you want to export:

```bash
const collections = ["Example", "Users", "Clubs", "Pubs", "Shops", "Restaurants"];
```

---

## 🔄 Export Firestore Database

```bash
npm run export
```

This will create separate JSON files for each Firestore collection.

---

## 📥 Download All Files from Firebase Storage

```bash
npm run eximages
```

This will download all files from Firebase Storage into the `images/` folder.

### ⚠️ **Important Step for Storage Backup**

To ensure correct access to your Storage bucket, go to **Firebase Console → Storage → Files** and copy the GS URL from there. Example:

```
gs://example-1d8de.firebasestorage.app
```

For correct usage in the script, remove `gs://` and use:

```
example-1d8de.firebasestorage.app
```

---

## 🛠 Requirements

- Node.js (v16+ recommended)
- Firebase Admin SDK
- A valid Firebase project

---

## 📜 License

MIT License - Free to use and modify.

---

🚀 **Contribute & Star the Repo!** ⭐

# firestore-export-local
