// === Firebase (Firestore) setup ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNk1D5VgHfTZOELm3M28Q_I0DkX8D9xEg",
  authDomain: "water-quality-afa4e.firebaseapp.com",
  projectId: "water-quality-afa4e",
  storageBucket: "water-quality-afa4e.firebasestorage.app",
  messagingSenderId: "312509243970",
  appId: "1:312509243970:web:e5c235e72826e52b4583db"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection name in Firestore (you can change this if you want)
const FIRESTORE_COLLECTION = "wtp_submissions";

// === Historical seed data (imported from Excel) ===
const HISTORICAL_SEED = {"14.01.2026": {"status": "submitted", "dateKey": "14.01.2026", "dateLabel": "14.01.2026", "timeLabel": "8.00am", "updatedAt": "2026-01-16T00:00:00.000Z", "rows": [{"type": "section", "label": "Kandy District"}, {"no": "1", "region": "Central South", "plant": "Kandy South", "capacity": "32000", "connections": "48304", "t1_raw": "7.3", "t1_treated": "0.2", "t1_rcl": "0.7", "t1_ph": "6.5"}, {"no": "2", "region": "", "plant": "Elpitiya", "capacity": "7000", "connections": "4739", "t1_raw": "5.99", "t1_treated": "0.32", "t1_rcl": "0.8", "t1_ph": "6.75"}, {"no": "3", "region": "", "plant": "Nillambe", "capacity": "14500", "connections": "21150", "t1_raw": "7.3", "t1_treated": "0.63", "t1_rcl": "0.8", "t1_ph": "6.63"}, {"no": "4", "region": "", "plant": "Hanthana", "capacity": "48052", "connections": "823", "t1_raw": "over to 100", "t1_treated": "2.03", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "5", "region": "", "plant": "Paradeka", "capacity": "6000", "connections": "6661", "t1_raw": "15.1", "t1_treated": "0.216", "t1_rcl": "0.8", "t1_ph": "7"}, {"no": "6", "region": "", "plant": "Ulapane", "capacity": "8500", "connections": "11000", "t1_raw": "7.43", "t1_treated": "0.72", "t1_rcl": "0.8", "t1_ph": "6.9"}, {"no": "7", "region": "", "plant": "Gampola Watta", "capacity": "1200", "connections": "1259", "t1_raw": "8.85", "t1_treated": "1.32", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "8", "region": "", "plant": "Doluwa", "capacity": "250", "connections": "483", "t1_raw": "5.45", "t1_treated": "1.42", "t1_rcl": "0.7", "t1_ph": "-"}, {"no": "9", "region": "", "plant": "Datrry", "capacity": "500", "connections": "149", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "10", "region": "", "plant": "Pussellawa", "capacity": "750", "connections": "1838", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "11", "region": "", "plant": "Nawalapitiya", "capacity": "4500", "connections": "6706", "t1_raw": "1.43", "t1_treated": "0.51", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "12", "region": "Central East", "plant": "Araththana", "capacity": "1500", "connections": "33462", "t1_raw": "16.6", "t1_treated": "1.59", "t1_rcl": "1", "t1_ph": "7.83"}, {"no": "13", "region": "", "plant": "Balagolla", "capacity": "1300", "connections": "9663", "t1_raw": "10.7", "t1_treated": "0.637", "t1_rcl": "1", "t1_ph": "7.21"}, {"no": "14", "region": "", "plant": "Madadumbara", "capacity": "3000", "connections": "7392", "t1_raw": "0.43", "t1_treated": "0.27", "t1_rcl": "1", "t1_ph": "7.24"}, {"no": "15", "region": "", "plant": "Marassana", "capacity": "3000", "connections": "6293", "t1_raw": "12.5", "t1_treated": "0.65", "t1_rcl": "1", "t1_ph": "6.91"}, {"no": "16", "region": "", "plant": "Haragama", "capacity": "2400", "connections": "5829", "t1_raw": "Intake off", "t1_treated": "0.35", "t1_rcl": "1", "t1_ph": ""}, {"no": "17", "region": "", "plant": "Ampitiya", "capacity": "4700", "connections": "7500", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "1", "t1_ph": "-"}, {"no": "18", "region": "Central North", "plant": "GKWTP", "capacity": "65000", "connections": "60446", "t1_raw": "15.2", "t1_treated": "0.08", "t1_rcl": "0.8", "t1_ph": "7.26"}, {"no": "19", "region": "", "plant": "Galagedara", "capacity": "1200", "connections": "3131", "t1_raw": "54.2", "t1_treated": "2.14", "t1_rcl": "1.2", "t1_ph": "7.5"}, {"no": "20", "region": "", "plant": "Polgolla", "capacity": "10000", "connections": "21766", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"no": "", "region": "Total", "plant": "20", "capacity": "", "connections": "258594", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"type": "section", "label": "Nuwara Eliya District"}, {"no": "1", "region": "Central South", "plant": "Thalawakele", "capacity": "2000", "connections": "2446", "t1_raw": "1.56", "t1_treated": "0.74", "t1_rcl": "0.9", "t1_ph": "6.63"}, {"no": "2", "region": "Ginigaththene", "plant": "Ginigathhena", "capacity": "1200", "connections": "2994", "t1_raw": "9.74", "t1_treated": "0.15", "t1_rcl": "0.9", "t1_ph": "7.19"}, {"no": "3", "region": "", "plant": "Pudaluoya", "capacity": "800", "connections": "885", "t1_raw": "1.75", "t1_treated": "0.83", "t1_rcl": "0.6", "t1_ph": "6.72"}, {"no": "0", "region": "", "plant": "Kotagala", "capacity": "900", "connections": "1298", "t1_raw": "1.1", "t1_treated": "0.73", "t1_rcl": "0.6", "t1_ph": "6.41"}, {"no": "5", "region": "", "plant": "Maskeliya", "capacity": "780", "connections": "1999", "t1_raw": "3.84", "t1_treated": "0.2", "t1_rcl": "0.5", "t1_ph": "-"}, {"no": "", "region": "", "plant": "Hatton", "capacity": "3000", "connections": "4832", "t1_raw": "1.7", "t1_treated": "1", "t1_rcl": "0.8", "t1_ph": "6.9"}, {"no": "7", "region": "", "plant": "Nallathanniya", "capacity": "30", "connections": "133", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "0.4", "t1_ph": "-"}, {"no": "8", "region": "Central East", "plant": "Ragala", "capacity": "800", "connections": "2305", "t1_raw": "0.8", "t1_treated": "0.6", "t1_rcl": "0.9", "t1_ph": "7.21"}, {"no": "9", "region": "", "plant": "Walapane", "capacity": "1000", "connections": "2916", "t1_raw": "20.6", "t1_treated": "0.3", "t1_rcl": "1", "t1_ph": ""}, {"no": "10", "region": "", "plant": "Rikillagaskada", "capacity": "3600", "connections": "7836", "t1_raw": "3.55", "t1_treated": "0.38", "t1_rcl": "0.9", "t1_ph": "6.81"}, {"no": "", "region": "Total", "plant": "10", "capacity": "", "connections": "27644", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"type": "section", "label": "Matale District"}, {"no": "1", "region": "", "plant": "Dambulla", "capacity": "30000", "connections": "14060", "t1_raw": "21.1", "t1_treated": "0.44", "t1_rcl": "1", "t1_ph": "7.92"}, {"no": "2", "region": "", "plant": "Matale", "capacity": "30000", "connections": "27154", "t1_raw": "77", "t1_treated": "0.12", "t1_rcl": "1", "t1_ph": "7.03"}, {"no": "3", "region": "", "plant": "Pussella", "capacity": "300", "connections": "1072", "t1_raw": "8", "t1_treated": "0.5", "t1_rcl": "1", "t1_ph": "7"}, {"no": "4", "region": "", "plant": "Naula", "capacity": "1800", "connections": "5470", "t1_raw": "15.26", "t1_treated": "0.48", "t1_rcl": "0.8", "t1_ph": "7.4"}, {"no": "5", "region": "", "plant": "Wilgamuwa", "capacity": "500", "connections": "1042", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "-", "t1_ph": "-"}, {"no": "6", "region": "", "plant": "Ambanganga", "capacity": "18000", "connections": "9222", "t1_raw": "83.9", "t1_treated": "0.13", "t1_rcl": "1.01", "t1_ph": "7.68"}, {"no": "7", "region": "", "plant": "Rattota", "capacity": "9000", "connections": "3957", "t1_raw": "5.71", "t1_treated": "0.17", "t1_rcl": "0.84", "t1_ph": "7.03"}, {"no": "8", "region": "", "plant": "Ukuwela", "capacity": "9000", "connections": "6170", "t1_raw": "14.91", "t1_treated": "0.16", "t1_rcl": "0.92", "t1_ph": "6.97"}, {"no": "9", "region": "", "plant": "Udathanna", "capacity": "9000", "connections": "6887", "t1_raw": "19.2", "t1_treated": "0.14", "t1_rcl": "1.21", "t1_ph": "7.09"}, {"no": "", "region": "Total", "plant": "9", "capacity": "", "connections": "75034", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"no": "", "region": "", "plant": "", "capacity": "", "connections": "361272", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}]}, "15.01.2026": {"status": "submitted", "dateKey": "15.01.2026", "dateLabel": "15.01.2026", "timeLabel": "8.00am", "updatedAt": "2026-01-16T00:00:00.000Z", "rows": [{"type": "section", "label": "Kandy District"}, {"no": "1", "region": "Central South", "plant": "Kandy South", "capacity": "32000", "connections": "48304", "t1_raw": "7.8", "t1_treated": "0.2", "t1_rcl": "0.7", "t1_ph": "6.5"}, {"no": "2", "region": "", "plant": "Elpitiya", "capacity": "7000", "connections": "4739", "t1_raw": "7.69", "t1_treated": "0.35", "t1_rcl": "0.8", "t1_ph": "6.7"}, {"no": "3", "region": "", "plant": "Nillambe", "capacity": "14500", "connections": "21150", "t1_raw": "7.08", "t1_treated": "0.74", "t1_rcl": "0.9", "t1_ph": "6.13"}, {"no": "4", "region": "", "plant": "Hanthana", "capacity": "48052", "connections": "823", "t1_raw": "21.54", "t1_treated": "1.01", "t1_rcl": "0.7", "t1_ph": "-"}, {"no": "5", "region": "", "plant": "Paradeka", "capacity": "6000", "connections": "6661", "t1_raw": "5.84", "t1_treated": "0.174", "t1_rcl": "0.8", "t1_ph": "7"}, {"no": "6", "region": "", "plant": "Ulapane", "capacity": "8500", "connections": "11000", "t1_raw": "8.14", "t1_treated": "0.49", "t1_rcl": "0.8", "t1_ph": "6.88"}, {"no": "7", "region": "", "plant": "Gampola Watta", "capacity": "1200", "connections": "1259", "t1_raw": "7.61", "t1_treated": "1.22", "t1_rcl": "0.8", "t1_ph": ""}, {"no": "8", "region": "", "plant": "Doluwa", "capacity": "250", "connections": "483", "t1_raw": "5.45", "t1_treated": "1.42", "t1_rcl": "0.7", "t1_ph": ""}, {"no": "9", "region": "", "plant": "Datrry", "capacity": "500", "connections": "149", "t1_raw": "", "t1_treated": "", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "10", "region": "", "plant": "Pussellawa", "capacity": "750", "connections": "1838", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "11", "region": "", "plant": "Nawalapitiya", "capacity": "4500", "connections": "6706", "t1_raw": "1.42", "t1_treated": "0.58", "t1_rcl": "0.8", "t1_ph": "-"}, {"no": "12", "region": "Central East", "plant": "Araththana", "capacity": "1500", "connections": "33462", "t1_raw": "7.54", "t1_treated": "0.23", "t1_rcl": "0.9", "t1_ph": "7.63"}, {"no": "13", "region": "", "plant": "Balagolla", "capacity": "1300", "connections": "9663", "t1_raw": "11.9", "t1_treated": "0.77", "t1_rcl": "", "t1_ph": ""}, {"no": "14", "region": "", "plant": "Madadumbara", "capacity": "3000", "connections": "7392", "t1_raw": "0.42", "t1_treated": "0.28", "t1_rcl": "1", "t1_ph": "7.39"}, {"no": "15", "region": "", "plant": "Marassana", "capacity": "3000", "connections": "6293", "t1_raw": "9.3", "t1_treated": "0.4", "t1_rcl": "1", "t1_ph": "6.99"}, {"no": "16", "region": "", "plant": "Haragama", "capacity": "2400", "connections": "5829", "t1_raw": "11.6", "t1_treated": "0.35", "t1_rcl": "1", "t1_ph": "7"}, {"no": "17", "region": "", "plant": "Ampitiya", "capacity": "4700", "connections": "7500", "t1_raw": "-", "t1_treated": "-", "t1_rcl": "1", "t1_ph": "-"}, {"no": "18", "region": "Central North", "plant": "GKWTP", "capacity": "65000", "connections": "60446", "t1_raw": "21", "t1_treated": "0.07", "t1_rcl": "0.8", "t1_ph": "7.29"}, {"no": "19", "region": "", "plant": "Galagedara", "capacity": "1200", "connections": "3131", "t1_raw": "16.5", "t1_treated": "2.21", "t1_rcl": "1.2", "t1_ph": "7.5"}, {"no": "20", "region": "", "plant": "Polgolla", "capacity": "10000", "connections": "21766", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"no": "", "region": "Total", "plant": "20", "capacity": "", "connections": "258594", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"type": "section", "label": "Nuwara Eliya District"}, {"no": "1", "region": "Central South", "plant": "Thalawakele", "capacity": "2000", "connections": "2446", "t1_raw": "1.46", "t1_treated": "0.71", "t1_rcl": "0.9", "t1_ph": "6.72"}, {"no": "2", "region": "Ginigaththene", "plant": "Ginigathhena", "capacity": "1200", "connections": "2994", "t1_raw": "10.8", "t1_treated": "0.14", "t1_rcl": "0.9", "t1_ph": "7.16"}, {"no": "3", "region": "", "plant": "Pudaluoya", "capacity": "800", "connections": "885", "t1_raw": "1.59", "t1_treated": "0.75", "t1_rcl": "0.6", "t1_ph": "6.78"}, {"no": "0", "region": "", "plant": "Kotagala", "capacity": "900", "connections": "1298", "t1_raw": "1.12", "t1_treated": "0.71", "t1_rcl": "0.6", "t1_ph": "6.2"}, {"no": "5", "region": "", "plant": "Maskeliya", "capacity": "780", "connections": "1999", "t1_raw": "3.86", "t1_treated": "0.15", "t1_rcl": "0.5", "t1_ph": ""}, {"no": "", "region": "", "plant": "Hatton", "capacity": "3000", "connections": "4832", "t1_raw": "1.65", "t1_treated": "0.88", "t1_rcl": "0.8", "t1_ph": "6.7"}, {"no": "7", "region": "", "plant": "Nallathanniya", "capacity": "30", "connections": "133", "t1_raw": "", "t1_treated": "", "t1_rcl": "0.4", "t1_ph": ""}, {"no": "8", "region": "Central East", "plant": "Ragala", "capacity": "800", "connections": "2305", "t1_raw": "0.74", "t1_treated": "0.54", "t1_rcl": "1", "t1_ph": "7.23"}, {"no": "9", "region": "", "plant": "Walapane", "capacity": "1000", "connections": "2916", "t1_raw": "17.7", "t1_treated": "0.18", "t1_rcl": "1", "t1_ph": "7.63"}, {"no": "10", "region": "", "plant": "Rikillagaskada", "capacity": "3600", "connections": "7836", "t1_raw": "2.38", "t1_treated": "0.12", "t1_rcl": "0.9", "t1_ph": "7.08"}, {"no": "", "region": "Total", "plant": "10", "capacity": "", "connections": "27644", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"type": "section", "label": "Matale District"}, {"no": "1", "region": "", "plant": "Dambulla", "capacity": "30000", "connections": "14060", "t1_raw": "23.4", "t1_treated": "0.41", "t1_rcl": "1", "t1_ph": "80.7"}, {"no": "2", "region": "", "plant": "Matale", "capacity": "30000", "connections": "27154", "t1_raw": "54.6", "t1_treated": "0.12", "t1_rcl": "1.01", "t1_ph": "6.98"}, {"no": "3", "region": "", "plant": "Pussella", "capacity": "300", "connections": "1072", "t1_raw": "9", "t1_treated": "0.5", "t1_rcl": "1", "t1_ph": "7"}, {"no": "4", "region": "", "plant": "Naula", "capacity": "1800", "connections": "5470", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"no": "5", "region": "", "plant": "Wilgamuwa", "capacity": "500", "connections": "1042", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"no": "6", "region": "", "plant": "Ambanganga", "capacity": "18000", "connections": "9222", "t1_raw": "57.9", "t1_treated": "0.12", "t1_rcl": "1.2", "t1_ph": "7.54"}, {"no": "7", "region": "", "plant": "Rattota", "capacity": "9000", "connections": "3957", "t1_raw": "5.76", "t1_treated": "0.16", "t1_rcl": "0.89", "t1_ph": "7.04"}, {"no": "8", "region": "", "plant": "Ukuwela", "capacity": "9000", "connections": "6170", "t1_raw": "13.7", "t1_treated": "0.15", "t1_rcl": "0.96", "t1_ph": "7.02"}, {"no": "9", "region": "", "plant": "Udathanna", "capacity": "9000", "connections": "6887", "t1_raw": "23.4", "t1_treated": "0.14", "t1_rcl": "1.22", "t1_ph": "7.02"}, {"no": "", "region": "Total", "plant": "9", "capacity": "", "connections": "75034", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}, {"no": "", "region": "", "plant": "", "capacity": "", "connections": "361272", "t1_raw": "", "t1_treated": "", "t1_rcl": "", "t1_ph": ""}]}};

async function seedHistoricalDataOnce(){
  try{
    const flagKey = "wq_seed_v3_jan14_15_done";
    if(localStorage.getItem(flagKey)==="1") return;

    // Seed only if the doc doesn't already exist (no overwrites)
    for(const [key,payload] of Object.entries(HISTORICAL_SEED)){
      const ref = doc(db, FIRESTORE_COLLECTION, key);
      const snap = await getDoc(ref);
      if(!snap.exists()){
        await setDoc(ref, payload);
        console.info("✅ Seeded", key);
      }
    }

    localStorage.setItem(flagKey,"1");
  }catch(err){
    console.warn("Historical seed failed:", err);
    // Don't block app if seeding fails
  }
}


console.log("✅ Firestore connected");


// Prefilled rows based on the provided PDF (first 5 columns) + section separators
// You can edit ONLY the turbidity / RCL columns in the table.

const defaultRows = [
  // ===== Kandy District =====
  {type:"section", label:"Kandy District"},
  {no:1, region:"Central South", plant:"Kandy South", capacity:"32,000", connections:"48,304"},
  {no:2, region:"", plant:"Elpitiya", capacity:"7,000", connections:"4,739"},
  {no:3, region:"", plant:"Nillambe", capacity:"14,500", connections:"21,150"},
  {no:4, region:"", plant:"Hanthana", capacity:"480", connections:"823"},
  {no:5, region:"", plant:"Paradeka", capacity:"6,000", connections:"6,661"},
  {no:6, region:"", plant:"Ulapane", capacity:"8,500", connections:"11,000"},
  {no:7, region:"", plant:"Gampola Watta", capacity:"1,200", connections:"1,259"},
  {no:8, region:"", plant:"Doluwa", capacity:"250", connections:"483"},
  {no:9, region:"", plant:"Datrry", capacity:"500", connections:"149"},
  {no:10, region:"", plant:"Pussellawa", capacity:"750", connections:"1,838"},
  {no:11, region:"", plant:"Nawalapitiya", capacity:"4,500", connections:"6,706"},
  {no:12, region:"Central East", plant:"Araththana", capacity:"1,500", connections:"33,462"},
  {no:13, region:"", plant:"Balagolla", capacity:"1,300", connections:"9,663"},
  {no:14, region:"", plant:"Madadumbara", capacity:"3,000", connections:"7,392"},
  {no:15, region:"", plant:"Marassana", capacity:"3,000", connections:"6,293"},
  {no:16, region:"", plant:"Haragama", capacity:"2,400", connections:"5,829"},
  {no:17, region:"", plant:"Ampitiya", capacity:"4,700", connections:"7,500"},
  {no:18, region:"Central North", plant:"GKWTP", capacity:"55,000", connections:"60,446"},
  {no:19, region:"", plant:"Galagedara", capacity:"1,200", connections:"3,131"},
  {no:20, region:"", plant:"Polgolla", capacity:"9,000", connections:"21,766"},

  // ===== Nuwara Eliya District =====
  {type:"section", label:"Nuwara Eliya District"},
  {no:1, region:"Central South", plant:"Thalawakele", capacity:"2,000", connections:"2,446"},
  {no:2, region:"", plant:"Ginigathhena", capacity:"1,200", connections:"2,994"},
  {no:3, region:"", plant:"Pudaluoya", capacity:"800", connections:"885"},
  {no:4, region:"", plant:"Kotagala", capacity:"900", connections:"1,298"},
  {no:5, region:"", plant:"Maskeliya", capacity:"780", connections:"1,999"},
  {no:6, region:"", plant:"Hatton", capacity:"3,000", connections:"4,832"},
  {no:7, region:"", plant:"Nallathanniya", capacity:"30", connections:"133"},
  {no:8, region:"Central East", plant:"Ragala", capacity:"800", connections:"2,305"},
  {no:9, region:"", plant:"Walapane", capacity:"1,000", connections:"2,916"},
  {no:10, region:"", plant:"Rikillagaskada", capacity:"3,600", connections:"7,836"},

  // ===== Matale District =====
  {type:"section", label:"Matale District"},
  {no:1, region:"", plant:"Dambulla", capacity:"30,000", connections:"14,060"},
  {no:2, region:"", plant:"Matale", capacity:"30,000", connections:"27,154"},
  {no:3, region:"", plant:"Pussella", capacity:"300", connections:"1,072"},
  {no:4, region:"", plant:"Naula", capacity:"1,800", connections:"5,470"},
  {no:5, region:"", plant:"Wilgamuwa", capacity:"500", connections:"1,042"},
  {no:6, region:"", plant:"Ambanganga", capacity:"18,000", connections:"9,222"},
  {no:7, region:"", plant:"Rattota", capacity:"9,000", connections:"3,957"},
  {no:8, region:"", plant:"Ukuwela", capacity:"9,000", connections:"6,170"},
  {no:9, region:"", plant:"Udathanna", capacity:"9,000", connections:"6,887"},
];


// === Master overrides (Plant Capacity / No of Connections) ===
const MASTER_OVERRIDES_KEY = "wq_master_overrides_v1";
let masterEditMode = false;

function loadMasterOverrides(){
  try{
    const raw = localStorage.getItem(MASTER_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    console.warn("⚠️ Failed to parse master overrides:", e);
    return {};
  }
}

function saveMasterOverrides(map){
  try{
    localStorage.setItem(MASTER_OVERRIDES_KEY, JSON.stringify(map || {}));
  }catch(e){
    console.warn("⚠️ Failed to save master overrides:", e);
  }
}

function rowKey(row){
  // region+plant is stable in your template and across days
  return `${(row.region||"").trim()}|${(row.plant||"").trim()}`;
}

function cloneRows(rows){
  return JSON.parse(JSON.stringify(rows));
}

function applyMasterOverrides(rows){
  const overrides = loadMasterOverrides();
  return rows.map(r=>{
    if(r && r.type === "section") return r;
    const k = rowKey(r);
    if(overrides[k]){
      r.capacity = overrides[k].capacity ?? r.capacity;
      r.connections = overrides[k].connections ?? r.connections;
    }
    return r;
  });
}

function getBaseRows(){
  // Base template rows for the entry table (static list), with optional
  // capacity/connection overrides applied from localStorage.
  // NOTE: Do NOT call getBaseRows() recursively (would cause stack overflow).
  return applyMasterOverrides(cloneRows(defaultRows));
}



function formatDate(d){
  const day = String(d.getDate()).padStart(2,'0');
  const month = String(d.getMonth()+1).padStart(2,'0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function setDefaultDates(){
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  // Default time format like PDF sample
  const timeLabel = "8.00am";

  // Yellow header cells inside the table
  const h1 = document.getElementById("dtHead1");
  if(h1) h1.textContent = `${formatDate(today)} ${timeLabel}`;
}

function makeInputCell(value=""){
  const input = document.createElement('input');
  input.className = 'cell';
  input.type = 'text';
  input.value = value;
  return input;
}


// === Excel-like keyboard navigation for table inputs ===
// Lets you move between cells using Arrow keys (similar to Excel).
let __navGrid = []; // 2D array [row][col] => input
let __navListenerAttached = false;

function rebuildNavGrid(){
  const tbody = document.getElementById('tbody');
  if(!tbody) return;

  __navGrid = [];
  const rows = Array.from(tbody.querySelectorAll('tr'))
    .filter(tr => !tr.classList.contains('section-row'));

  rows.forEach((tr, rIdx) => {
    const inputs = Array.from(tr.querySelectorAll('input.cell'));
    __navGrid[rIdx] = inputs;
    inputs.forEach((inp, cIdx) => {
      inp.dataset.r = String(rIdx);
      inp.dataset.c = String(cIdx);
    });
  });
}

function setupExcelLikeNavigation(){
  if(__navListenerAttached) return;
  const tbody = document.getElementById('tbody');
  if(!tbody) return;

  __navListenerAttached = true;

  tbody.addEventListener('keydown', (e) => {
    const t = e.target;
    if(!(t instanceof HTMLInputElement)) return;
    if(!t.classList.contains('cell')) return;
    if(e.altKey || e.ctrlKey || e.metaKey) return;

    const key = e.key;
    const r = Number(t.dataset.r);
    const c = Number(t.dataset.c);
    if(!Number.isFinite(r) || !Number.isFinite(c)) return;

    // For Left/Right: allow normal cursor movement inside the input
    // (only jump cells when caret is at edge)
    if(key === 'ArrowLeft'){
      if(typeof t.selectionStart === 'number' && t.selectionStart > 0) return;
    }
    if(key === 'ArrowRight'){
      const len = (t.value ?? '').length;
      if(typeof t.selectionEnd === 'number' && t.selectionEnd < len) return;
    }

    let nr = r, nc = c;

    if(key === 'ArrowUp') nr = r - 1;
    else if(key === 'ArrowDown') nr = r + 1;
    else if(key === 'ArrowLeft') nc = c - 1;
    else if(key === 'ArrowRight') nc = c + 1;
    else if(key === 'Enter') nr = r + 1;
    else return;

    // Clamp / skip missing rows/cols
    if(nr < 0) nr = 0;
    if(nc < 0) nc = 0;

    // Find nearest existing input
    let target = null;
    if(__navGrid[nr] && __navGrid[nr][nc]){
      target = __navGrid[nr][nc];
    }else if(key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter'){
      // Try same column on next available row
      let step = (key === 'ArrowUp') ? -1 : 1;
      let rr = nr;
      while(rr >= 0 && rr < __navGrid.length){
        if(__navGrid[rr] && __navGrid[rr][nc]){ target = __navGrid[rr][nc]; break; }
        rr += step;
      }
    }else if(key === 'ArrowLeft' || key === 'ArrowRight'){
      // Try nearest col on the same row
      if(__navGrid[r]){
        let cc = nc;
        while(cc >= 0 && cc < __navGrid[r].length){
          if(__navGrid[r][cc]){ target = __navGrid[r][cc]; break; }
          cc += (key === 'ArrowLeft') ? -1 : 1;
        }
      }
    }

    if(target){
      e.preventDefault();
      target.focus();
      // optional: select existing value for quick overwrite
      try{ target.select(); }catch(_e){}
    }
  }, true);
}

function renderRows(rows){
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = "";

  rows.forEach((r) => {
    // Section header row (District)
    if(r.type === "section"){
      const tr = document.createElement('tr');
      tr.className = "section-row";

      const td = document.createElement('td');
      td.colSpan = 11;
      td.className = "section-cell";
      td.textContent = r.label;

      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    const tr = document.createElement('tr');

    // Fixed/prefilled columns
    const tdNo = document.createElement('td'); tdNo.textContent = r.no;
    const tdRegion = document.createElement('td'); tdRegion.textContent = r.region; tdRegion.classList.add('left');
    const tdPlant = document.createElement('td'); tdPlant.textContent = r.plant; tdPlant.classList.add('left');
    const tdCap = document.createElement('td');
    const tdConn = document.createElement('td');

    if(masterEditMode){
      const capInput = makeInputCell(r.capacity || "");
      capInput.classList.add("cap");
      capInput.classList.add("cap-input");
      tdCap.appendChild(capInput);

      const connInput = makeInputCell(r.connections || "");
      connInput.classList.add("conn");
      connInput.classList.add("conn-input");
      tdConn.appendChild(connInput);
    }else{
      tdCap.textContent = r.capacity || "";
      tdConn.textContent = r.connections || "";
    }

    tr.append(tdNo, tdRegion, tdPlant, tdCap, tdConn);

    // Editable columns (6 columns)
    for(let i=0;i<4;i++){
      const td = document.createElement('td');
      const inp = makeInputCell("");
      inp.classList.add("turb");
      td.appendChild(inp);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });

  // Build navigation map for Arrow-key movement
  rebuildNavGrid();
  setupExcelLikeNavigation();
}

function getTableData(){
  const tbody = document.getElementById('tbody');
  const trs = Array.from(tbody.querySelectorAll('tr'));
  const data = [];

  trs.forEach(tr => {
    if(tr.classList.contains('section-row')){
      data.push({type:"section", label: tr.textContent.trim()});
      return;
    }
    const tds = tr.querySelectorAll('td');
    const editable = Array.from(tr.querySelectorAll('input.turb')).map(i => i.value);

    data.push({
      no: tds[0].textContent.trim(),
      region: tds[1].textContent.trim(),
      plant: tds[2].textContent.trim(),
      capacity: ((tr.querySelector("input.cap")?.value) || tds[3].textContent || "").trim(),
      connections: ((tr.querySelector("input.conn")?.value) || tds[4].textContent || "").trim(),
      t1_raw: editable[0] || "",
      t1_treated: editable[1] || "",
      t1_rcl: editable[2] || "",
      t1_ph: editable[3] || "",
          });
  });

  return data;
}

function restoreEditableValues(data){
  const tbody = document.getElementById('tbody');
  const trs = Array.from(tbody.querySelectorAll('tr'));

  let di = 0;
  trs.forEach(tr => {
    if(tr.classList.contains('section-row')){
      di++;
      return;
    }
    const row = data[di];
    const conn = tr.querySelector("input.conn");
    if(conn) conn.value = row.connections || "";

    const inputs = tr.querySelectorAll('input.turb');
    if(!row || !inputs.length) { di++; return; }

    inputs[0].value = (row.t1_raw ?? row.raw ?? "");
    inputs[1].value = (row.t1_treated ?? row.treated ?? "");
    inputs[2].value = (row.t1_rcl ?? row.rcl ?? "");
    if(inputs[3]) inputs[3].value = (row.t1_ph ?? row.ph ?? "");
        di++;
  });
}

function addEmptyRow(){
  const data = getTableData();
  // Find last real row number
  let lastNo = 0;
  data.forEach(d => { if(d.no) lastNo = Math.max(lastNo, parseInt(d.no,10) || 0); });

  data.push({
    no: lastNo + 1,
    region:"",
    plant:"",
    capacity:"",
    connections:"",
    t1_raw:"",
    t1_treated:"",
    t1_rcl:"",
    t1_ph:"",
    t2_raw:"",
    t2_treated:"",
    t2_rcl:"",
    t2_ph:"",
  });

  // Re-render with structure
  const renderData = data.map(d => {
    if(d.type === "section") return d;
    return { no:d.no, region:d.region, plant:d.plant, capacity:d.capacity, connections:d.connections };
  });

  renderRows(renderData);
  restoreEditableValues(data);
}

function exportCSV(){
  const data = getTableData();

  const headers = [
    "No","Region","Plant","Capacity (Cum/Day)","No of Connections",
    "Turbidity Raw","Turbidity Treated","RCL","pH"
  ];

  const lines = [headers.join(",")];

  data.forEach(row=>{
    if(row.type === "section"){
      // keep district as a separator row in CSV
      lines.push(`"${row.label.replaceAll('"','""')}"`);
      return;
    }

    const vals = [
      row.no, row.region, row.plant, row.capacity, row.connections,
      row.t1_raw, row.t1_treated, row.t1_rcl, row.t1_ph,
      row.t2_raw, row.t2_treated, row.t2_rcl, row.t2_ph
    ].map(v => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replaceAll('"','""')}"` : s;
    });

    lines.push(vals.join(","));
  });

  const blob = new Blob([lines.join("\n")], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "flood_effect_wtp.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function resetAll(){
  if(!confirm("Reset all turbidity/RCL entries?")) return;
  renderRows(getBaseRows());
}

document.addEventListener('DOMContentLoaded', async ()=>{
  setDefaultDates();
  setNavDate();
  await seedHistoricalDataOnce();
  renderRows(getBaseRows());
  // Default view: Today (editable)
  loadCurrentIfExists();

  // Compare (last 3 days)
  setupCompareModal();
  // Compare all (all saved/submitted)
  setupCompareAllModal();
  setupPastEntryModal();

  // Nav
  document.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(btn.dataset.page) switchPage(btn.dataset.page);
    });
  });

  // Entry actions
  document.getElementById('saveBtn')?.addEventListener('click', ()=> saveCurrent("saved"));
  document.getElementById('submitBtn')?.addEventListener('click', ()=> saveCurrent("submitted"));
  document.getElementById('exportBtn')?.addEventListener('click', exportCSV);
  document.getElementById('resetBtn')?.addEventListener('click', resetAll);

  // Submissions actions
  document.getElementById("refreshSubmissions")?.addEventListener("click", renderSubmissionsList);
  document.getElementById("editSubmissionBtn")?.addEventListener("click", toggleEdit);
  document.getElementById("saveEditsBtn")?.addEventListener("click", saveEdits);

  // Quick edit for Plant Capacity / Connections (applies to today's table + future defaults)
  const masterBtn = document.getElementById("masterEditBtn");
  if(masterBtn){
    masterBtn.addEventListener("click", ()=>{
      // ensure entry page is visible
      try{ switchPage("entry"); }catch(e){}

      let rows;
      try{
        rows = getTableData();
      }catch(e){
        rows = getBaseRows();
      }

      // toggle mode
      masterEditMode = !masterEditMode;

      if(masterEditMode){
        masterBtn.textContent = "SAVE";
        masterBtn.classList.add("is-editing");
      }else{
        // persist overrides from current table
        const overrides = loadMasterOverrides();
        rows.forEach(r=>{
          if(!r || r.type === "section") return;
          overrides[rowKey(r)] = { capacity: r.capacity || "", connections: r.connections || "" };
        });
        saveMasterOverrides(overrides);

        masterBtn.textContent = "EDIT";
        masterBtn.classList.remove("is-editing");
      }

      // re-render without losing current turbidity values
      renderRows(rows);
    });
  }

});



// -------- Local Storage (Save / Submit) --------
const STORAGE_KEY = "wtp_submissions_v1";

function todayKey(){
  // YYYY-MM-DD
  const d = new Date();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function getStore(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }catch(e){
    return {};
  }
}

function setStore(obj){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function saveCurrent(status="saved") {
  const data = getTableData();
  const key = todayKey();

  const payload = {
    status,
    dateKey: key,
    dateLabel: formatDate(new Date()),
    timeLabel: "8.00am",
    updatedAt: new Date().toISOString(),
    rows: data
  };

  // ✅ Save to Firestore using the dateKey as the document ID
  setDoc(doc(db, FIRESTORE_COLLECTION, key), payload)
    .then(() => {
      alert(status === "submitted"
        ? "✅ Submitted! (Saved to Firestore)"
        : "✅ Saved! (Saved to Firestore)"
      );
    })
    .catch((err) => {
      console.error("❌ Firestore save failed:", err);
      alert("❌ Failed to save to Firestore. Check console for details.");
    });
}

function loadCurrentIfExists() {
  const key = todayKey();

  // ✅ Load today's data from Firestore
  getDoc(doc(db, FIRESTORE_COLLECTION, key))
    .then((snap) => {
      if (snap.exists()) {
        renderRows(getBaseRows());
        restoreEditableValues(snap.data().rows);
        console.log("✅ Loaded today's data from Firestore");
      } else {
        // No document for today → render empty default rows
        renderRows(getBaseRows());
      }
    })
    .catch((err) => {
      console.error("❌ Firestore load failed:", err);
      // Fallback to default rows so the app still works
      renderRows(getBaseRows());
    });
}

// -------- Nav / Page Switch --------
function switchPage(page){
  const entry = document.getElementById("page-entry");
  const subs = document.getElementById("page-submissions");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.nav-btn[data-page="${page}"]`)?.classList.add("active");
  if(page === "submissions"){
    entry.classList.add("hidden");
    subs.classList.remove("hidden");
    renderSubmissionsList();
  }else{
    subs.classList.add("hidden");
    entry.classList.remove("hidden");
  }
}

function setNavDate(){
  const el = document.getElementById("navDate");
  if(el) el.textContent = `Today: ${formatDate(new Date())} 8.00am`;
}

// -------- Compare (Modal: Today / Yesterday / Day before yesterday) --------
function dateKeyFromDate(d){
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function dotKeyFromDate(d){
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function dateKeyCandidates(d){
  // Prefer ISO key, but also support legacy/seeded dd.mm.yyyy keys
  return [dateKeyFromDate(d), dotKeyFromDate(d)];
}


function getDateFor(daysAgo){
  const d = new Date();
  d.setHours(12,0,0,0);
  d.setDate(d.getDate() - daysAgo);
  return d;
}

function buildRowMap(rows){
  // Builds lookup map for compare tables.
  // Some stored days include district "section" rows; some (e.g., seeded/imported) may not.
  // To avoid blanks, we index rows with multiple keys and allow fallbacks.
  const map = new Map();
  let district = "";

  (rows || []).forEach(r => {
    if(r?.type === 'section'){
      district = (r.label || "").trim();
      return;
    }
    const plant = (r.plant || '').trim();
    const region = (r.region || '').trim();

    // Primary key (when district is known)
    const key1 = `${district}|${plant}`;
    if(plant) map.set(key1, r);

    // Fallback keys (work even when district is missing in stored rows)
    const key2 = `*|${region}|${plant}`;
    const key3 = `*|*|${plant}`;
    if(plant) {
      map.set(key2, r);
      // Only set plant-only fallback if empty to reduce accidental overwrites
      if(!map.has(key3)) map.set(key3, r);
    }
  });

  return map;
}

function getCompareRow(map, district, region, plant){
  const p = (plant || '').trim();
  const d = (district || '').trim();
  const r = (region || '').trim();
  if(!p) return null;

  return (
    map.get(`${d}|${p}`) ||
    map.get(`*|${r}|${p}`) ||
    map.get(`*|*|${p}`) ||
    null
  );
}


function setCompareNote(msg){
  const el = document.getElementById('compareNote');
  if(el) el.textContent = msg || "";
}

function renderCompareTable(dates, docsArr){
  const head = document.getElementById('compareHead');
  const body = document.getElementById('compareBody');
  if(!head || !body) return;

  // Header
  const [d0, d1, d2] = dates;
  const timeLabel = '8.00am';

  head.innerHTML = `
    <tr class="datetime-head">
      <th colspan="5" class="blank-head"></th>
      <th colspan="4" class="datetime-cell">${formatDate(d2)} ${timeLabel}</th>
      <th colspan="4" class="datetime-cell">${formatDate(d1)} ${timeLabel}</th>
      <th colspan="4" class="datetime-cell">${formatDate(d0)} ${timeLabel}</th>
    </tr>
    <tr>
      <th rowspan="2" class="no">No</th>
      <th rowspan="2" class="region">Region</th>
      <th rowspan="2" class="plant">Plant</th>
      <th rowspan="2" class="capacity">Plant Capacity<br>(Cum/Day)</th>
      <th rowspan="2" class="connections">No of<br>Connections</th>
      <th colspan="4" class="group">Day before yesterday</th>
      <th colspan="4" class="group">Yesterday</th>
      <th colspan="4" class="group">Today</th>
    </tr>
    <tr>
      <th class="tcol">Raw</th><th class="tcol">Treated</th><th class="tcol">RCL</th><th class="tcol">pH</th>
      <th class="tcol">Raw</th><th class="tcol">Treated</th><th class="tcol">RCL</th><th class="tcol">pH</th>
      <th class="tcol">Raw</th><th class="tcol">Treated</th><th class="tcol">RCL</th><th class="tcol">pH</th>
    </tr>
  `;

  // Body
  body.innerHTML = '';
  const map0 = buildRowMap(docsArr?.[0]?.rows);
  const map1 = buildRowMap(docsArr?.[1]?.rows);
  const map2 = buildRowMap(docsArr?.[2]?.rows);

  let district = '';
  defaultRows.forEach(r => {
    if(r.type === 'section'){
      district = r.label;
      const tr = document.createElement('tr');
      tr.className = 'section-row';
      const td = document.createElement('td');
      td.colSpan = 17;
      td.className = 'section-cell';
      td.textContent = r.label;
      tr.appendChild(td);
      body.appendChild(tr);
      return;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.no}</td>
      <td class="left">${r.region || ''}</td>
      <td class="left">${r.plant || ''}</td>
      <td>${r.capacity || ''}</td>
      <td>${r.connections || ''}</td>
    `;

    const key = `${district}|${(r.plant || '').trim()}`;
    const rowsFor = [map2.get(key), map1.get(key), map0.get(key)];
    rowsFor.forEach(row => {
      const raw = row?.t1_raw ?? row?.raw ?? '';
      const treated = row?.t1_treated ?? row?.treated ?? '';
      const rcl = row?.t1_rcl ?? row?.rcl ?? '';
      const ph = row?.t1_ph ?? row?.ph ?? '';
      tr.innerHTML += `<td>${raw}</td><td>${treated}</td><td>${rcl}</td><td>${ph}</td>`;
    });
    body.appendChild(tr);
  });
}

function setupCompareModal(){
  const btn = document.getElementById('compareBtn');
  const modal = document.getElementById('compareModal');
  const closeBtn = document.getElementById('compareClose');
  if(!btn || !modal) return;

  // ---- Scroll lock helpers (prevents the page behind the modal from scrolling) ----
  let __scrollY = 0;
  const lockScroll = () => {
    __scrollY = window.scrollY || 0;
    document.body.classList.add('modal-open');
    // iOS/Safari-friendly scroll locking
    document.body.style.position = 'fixed';
    document.body.style.top = `-${__scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };
  const unlockScroll = () => {
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, __scrollY);
  };

  const open = async () => {
    lockScroll();
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    // Start the modal scroller at the top every time
    modal.scrollTop = 0;
    modal.querySelector('.table-wrap')?.scrollTo(0,0);
    setCompareNote('Loading last 3 days...');

    const d0 = getDateFor(0);
    const d1 = getDateFor(1);
    const d2 = getDateFor(2);
    const [k0Iso, k0Dot] = dateKeyCandidates(d0);
    const [k1Iso, k1Dot] = dateKeyCandidates(d1);
    const [k2Iso, k2Dot] = dateKeyCandidates(d2);

    try{
      const [[s0Iso, s0Dot], [s1Iso, s1Dot], [s2Iso, s2Dot]] = await Promise.all([
        Promise.all([getDoc(doc(db, FIRESTORE_COLLECTION, k0Iso)), getDoc(doc(db, FIRESTORE_COLLECTION, k0Dot))]),
        Promise.all([getDoc(doc(db, FIRESTORE_COLLECTION, k1Iso)), getDoc(doc(db, FIRESTORE_COLLECTION, k1Dot))]),
        Promise.all([getDoc(doc(db, FIRESTORE_COLLECTION, k2Iso)), getDoc(doc(db, FIRESTORE_COLLECTION, k2Dot))]),
      ]);

      const pick = (isoSnap, dotSnap) => {
        if(isoSnap.exists()) return { key: 'iso', data: isoSnap.data() };
        if(dotSnap.exists()) return { key: 'dot', data: dotSnap.data() };
        return { key: 'none', data: null };
      };

      const p0 = pick(s0Iso, s0Dot); // Today
      const p1 = pick(s1Iso, s1Dot); // Yesterday
      const p2 = pick(s2Iso, s2Dot); // Day before yesterday

      // docsArr order MUST match [d0,d1,d2] in renderCompareTable usage below
      const docsArr = [p0.data, p1.data, p2.data];

      renderCompareTable([d0,d1,d2], docsArr);

      const missing = [
        !p0.data ? `Today (${formatDate(d0)})` : null,
        !p1.data ? `Yesterday (${formatDate(d1)})` : null,
        !p2.data ? `Day before yesterday (${formatDate(d2)})` : null,
      ].filter(Boolean);
      setCompareNote(missing.length ? `No saved data found for: ${missing.join(', ')}` : '');
    }catch(err){
      console.error('❌ Compare load failed:', err);
      setCompareNote('Error loading compare data. Check console.');
    }
  };

  const close = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    unlockScroll();
  };

  btn.addEventListener('click', (e)=>{ e.preventDefault(); open(); });
  closeBtn?.addEventListener('click', close);
  // click outside the panel to close
  modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });
}

// -------- Compare All (Modal: show ALL saved/submitted entries) --------
function setCompareAllNote(msg){
  const el = document.getElementById('compareAllNote');
  if(el) el.textContent = msg || "";
}


function parseDateKeyToDate(dateKey){
  // Supports common keys used in this app:
  //  - "YYYY-MM-DD"
  //  - "DD.MM.YYYY" (optionally with " 8.00am" or other suffix)
  // Returns a Date (local) or null.
  if(!dateKey) return null;
  const s = String(dateKey).trim();

  // ISO: YYYY-MM-DD...
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(iso){
    const y = parseInt(iso[1],10);
    const m = parseInt(iso[2],10);
    const d = parseInt(iso[3],10);
    if(y && m && d){
      const dt = new Date(y, m-1, d);
      dt.setHours(12,0,0,0); // stable across TZ/DST
      return dt;
    }
  }

  // Dotted: DD.MM.YYYY...
  const dot = s.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if(dot){
    const d = parseInt(dot[1],10);
    const m = parseInt(dot[2],10);
    const y = parseInt(dot[3],10);
    if(y && m && d){
      const dt = new Date(y, m-1, d);
      dt.setHours(12,0,0,0);
      return dt;
    }
  }

  return null;
}

function dateKeyToLabel(dateKey){
  const dt = parseDateKeyToDate(dateKey);
  return dt ? formatDate(dt) : String(dateKey || '');
}

function dateKeyHasTime(dateKey){
  const s = String(dateKey || '').toLowerCase();
  return /\b(am|pm)\b/.test(s) || /\d{1,2}[:.]\d{2}/.test(s);
}

function renderCompareAllTable(dateKeys, docsByKey){
  const head = document.getElementById('compareAllHead');
  const body = document.getElementById('compareAllBody');
  if(!head || !body) return;

  const timeLabel = '8.00am';

  // IMPORTANT: headers MUST be generated from the SAME list used for the body.
  // Some older records may use keys like "07.01.2026" (not ISO). If we only
  // render headers for ISO dates, the body will have more columns than the header.
  const entries = (dateKeys || []).map(k => ({
    key: k,
    label: dateKeyToLabel(k),
    date: parseDateKeyToDate(k)
  }));

  // Header (dynamic dates)
  const dateHeadCells = entries.map(e => {
    const showTime = dateKeyHasTime(e.key) ? '' : ` ${timeLabel}`;
    return `<th colspan="4" class="datetime-cell">${e.label}${showTime}</th>`;
  }).join('');
  const groupCells = entries.map(e => `<th colspan="4" class="group">${e.label}</th>`).join('');
  const subHeadCells = entries.map(()=> `<th class="tcol">Raw</th><th class="tcol">Treated</th><th class="tcol">RCL</th><th class="tcol">pH</th>`).join('');

  head.innerHTML = `
    <tr class="datetime-head">
      <th colspan="5" class="blank-head"></th>
      ${dateHeadCells || `<th colspan="4" class="datetime-cell">No dates</th>`}
    </tr>
    <tr>
      <th rowspan="2" class="no">No</th>
      <th rowspan="2" class="region">Region</th>
      <th rowspan="2" class="plant">Plant</th>
      <th rowspan="2" class="capacity">Plant Capacity<br>(Cum/Day)</th>
      <th rowspan="2" class="connections">No of<br>Connections</th>
      ${groupCells || `<th colspan="4" class="group">No records</th>`}
    </tr>
    <tr>
      ${subHeadCells || `<th class="tcol">Raw</th><th class="tcol">Treated</th><th class="tcol">RCL</th><th class="tcol">pH</th>`}
    </tr>
  `;

  // Body (use defaultRows order + district sections)
  body.innerHTML = '';

  if(!entries.length){
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 9;
    td.className = 'section-cell';
    td.textContent = 'No submitted records found.';
    tr.appendChild(td);
    body.appendChild(tr);
    return;
  }

  // Build row maps for each dateKey
  const maps = entries.map(e => buildRowMap(docsByKey?.[e.key]?.rows));

  let district = '';
  const totalCols = 5 + (4 * entries.length);

  defaultRows.forEach(r => {
    if(r.type === 'section'){
      district = r.label;
      const tr = document.createElement('tr');
      tr.className = 'section-row';
      const td = document.createElement('td');
      td.colSpan = totalCols;
      td.className = 'section-cell';
      td.textContent = r.label;
      tr.appendChild(td);
      body.appendChild(tr);
      return;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.no ?? ''}</td>
      <td class="left">${r.region || ''}</td>
      <td class="left">${r.plant || ''}</td>
      <td>${r.capacity || ''}</td>
      <td>${r.connections || ''}</td>
    `;

        maps.forEach(map => {
      const row = getCompareRow(map, district, r.region, r.plant);
      const raw = row?.t1_raw ?? row?.raw ?? '';
      const treated = row?.t1_treated ?? row?.treated ?? '';
      const rcl = row?.t1_rcl ?? row?.rcl ?? '';
      const ph = row?.t1_ph ?? row?.ph ?? '';
      tr.innerHTML += `<td>${raw}</td><td>${treated}</td><td>${rcl}</td><td>${ph}</td>`;
    });

    body.appendChild(tr);
  });
}

function setupCompareAllModal(
){
  const btn = document.getElementById('compareAllBtn');
  const modal = document.getElementById('compareAllModal');
  const closeBtn = document.getElementById('compareAllClose');
  if(!btn || !modal) return;

  // ---- Scroll lock helpers (prevents the page behind the modal from scrolling) ----
  let __scrollY = 0;
  const lockScroll = () => {
    __scrollY = window.scrollY || 0;
    document.body.classList.add('modal-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${__scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };
  const unlockScroll = () => {
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, __scrollY);
  };

  const open = async () => {
    lockScroll();
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    modal.scrollTop = 0;
    modal.querySelector('.table-wrap')?.scrollTo(0,0);
    setCompareAllNote('Loading all entries...');

    try{
      const snapshot = await getDocs(collection(db, FIRESTORE_COLLECTION));

      // Only compare SUBMITTED days (as requested)
      const docsByKey = {};
      const dateKeys = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data() || {};
        const key = data.dateKey || docSnap.id; // doc id is the dateKey
        if(!key) return;

        docsByKey[key] = data;
        dateKeys.push(key);
      });

      // Sort ascending so older dates are on the left, newest on the right.
      // Handles both ISO (YYYY-MM-DD) and dotted (DD.MM.YYYY) keys.
      dateKeys.sort((a,b)=>{
        const da = parseDateKeyToDate(a);
        const db = parseDateKeyToDate(b);
        if(da && db) return da.getTime() - db.getTime();
        if(da && !db) return -1;
        if(!da && db) return 1;
        return (a || '').localeCompare(b || '');
      });

      renderCompareAllTable(dateKeys, docsByKey);
      setCompareAllNote(dateKeys.length ? '' : 'No submitted records yet.');
    }catch(err){
      console.error('❌ Compare All load failed:', err);
      setCompareAllNote('Error loading entries. Check console.');
    }
  };

  const close = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    unlockScroll();
  };

  btn.addEventListener('click', (e)=>{ e.preventDefault(); open(); });
  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });
}

// -------- Submissions Page --------
let selectedKey = null;
let selectedSubmission = null;
let editMode = false;

function renderSubmissionsList() {
  const container = document.getElementById("submissionsContainer");
  if (!container) return;

  container.innerHTML = "Loading...";

  // ✅ Fetch all submissions from Firestore
  getDocs(collection(db, FIRESTORE_COLLECTION))
    .then((snapshot) => {
      const docsArr = [];
      snapshot.forEach((docSnap) => docsArr.push(docSnap.data()));

      docsArr.sort((a,b)=>{
        const ka = (a && (a.dateKey || a.date || a.id)) || "";
        const kb = (b && (b.dateKey || b.date || b.id)) || "";
        const da = parseDateKeyToDate(ka);
        const db2 = parseDateKeyToDate(kb);
        // Newest on top (descending)
        if(da && db2) return db2.getTime() - da.getTime();
        if(da && !db2) return -1;
        if(!da && db2) return 1;
        return String(kb).localeCompare(String(ka));
      });

      if (!docsArr.length) {
        container.innerHTML = "<div class='note'>No submissions yet.</div>";
        return;
      }

      container.innerHTML = "";
      docsArr.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        const meta = document.createElement("div");
        meta.className = "meta";

        const date = document.createElement("div");
        date.className = "date";
        date.textContent = item.dateLabel || item.dateKey;

        const badge = document.createElement("div");
        badge.className = "badge " + (item.status === "submitted" ? "submitted" : "saved");
        badge.textContent = item.status === "submitted" ? "SUBMITTED" : "SAVED";

        meta.append(date, badge);

        const open = document.createElement("button");
        open.className = "open";
        open.textContent = "Open";
        open.addEventListener("click", () => openSubmission(item.dateKey));

        const actions = document.createElement("div");
        actions.className = "actions";

        const del = document.createElement("button");
        del.className = "delete";
        del.textContent = "Delete";
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteSubmission(item.dateKey);
        });

        actions.append(open, del);
        card.append(meta, actions);
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("❌ Firestore list failed:", err);
      container.innerHTML = "<div class='note'>Error loading submissions.</div>";
    });
}

function deleteSubmission(key) {
  if (!key) return;
  const ok = confirm("Delete this entry? This cannot be undone.");
  if (!ok) return;

  deleteDoc(doc(db, FIRESTORE_COLLECTION, key))
    .then(() => {
      // If the deleted item was open in the viewer, reset the viewer state
      if (selectedKey === key) {
        selectedKey = null;
        selectedSubmission = null;
        editMode = false;
        renderSubmissionViewer();
      }
      renderSubmissionsList();
    })
    .catch((err) => {
      console.error("❌ Firestore delete failed:", err);
      alert("Failed to delete. Please try again.");
    });
}


function openSubmission(key) {
  getDoc(doc(db, FIRESTORE_COLLECTION, key))
    .then((snap) => {
      if (!snap.exists()) {
        alert("No submission found for that date.");
        return;
      }

      const item = snap.data();
      selectedKey = key;
      selectedSubmission = item;

      document.getElementById("viewTitle").textContent =
        `${item.dateLabel || item.dateKey} ${item.timeLabel || ""} — ${(item.status || "saved").toUpperCase()}`;

      document.getElementById("editSubmissionBtn").disabled = false;
      document.getElementById("saveEditsBtn").disabled = true;

      renderHistoryTable(item.rows, false);
    })
    .catch((err) => {
      console.error("❌ Firestore open failed:", err);
      alert("❌ Failed to open submission. Check console.");
    });
}

function renderHistoryTable(rows, editable){
  const body = document.getElementById("historyBody");
  body.innerHTML = "";

  rows.forEach(r=>{
    if(r.type === "section"){
      const tr = document.createElement("tr");
      tr.className = "section-row";
      const td = document.createElement("td");
      td.colSpan = 9;
      td.className = "section-cell";
      td.textContent = r.label;
      tr.appendChild(td);
      body.appendChild(tr);
      return;
    }

    const tr = document.createElement("tr");
    const fields = ["no","region","plant","capacity","connections","raw","treated","rcl","ph"];
    fields.forEach((f, idx)=>{
      const td = document.createElement("td");
      if(editable && idx >= 4){ // allow edit from connections onwards
        const inp = document.createElement("input");
        inp.className = "cell";
        const fieldKey = (["raw","treated","rcl","ph"].includes(f) && (("t1_"+f) in r)) ? ("t1_"+f) : f;
        inp.value = r[fieldKey] || ""; 
        inp.dataset.field = fieldKey;
        td.appendChild(inp);
      }else{
        const showKey = (["raw","treated","rcl","ph"].includes(f) && (("t1_"+f) in r)) ? ("t1_"+f) : f;
        td.textContent = r[showKey] || "";
        if(idx===1 || idx===2) td.classList.add("left");
      }
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

function toggleEdit(){
  if(!selectedKey || !selectedSubmission) return;

  editMode = true;
  document.getElementById("editSubmissionBtn").disabled = true;
  document.getElementById("saveEditsBtn").disabled = false;

  renderHistoryTable((selectedSubmission.rows || []), true);
}

async function saveEdits(){
  if(!selectedKey || !selectedSubmission) return;

  // Read edited inputs from history table
  const originalRows = Array.isArray(selectedSubmission.rows) ? selectedSubmission.rows : [];
  const trs = Array.from(document.querySelectorAll("#historyBody tr"));
  const newRows = [];
  let rowIndex = 0;

  trs.forEach(tr=>{
    const original = originalRows[rowIndex];
    if(!original){
      rowIndex++;
      return;
    }

    if(tr.classList.contains("section-row")){
      // keep section rows untouched
      newRows.push(original);
      rowIndex++;
      return;
    }

    const updated = {...original};
    const inputs = tr.querySelectorAll("input.cell");
    inputs.forEach(inp=>{
      const field = inp.dataset.field;
      updated[field] = inp.value;
    });

    newRows.push(updated);
    rowIndex++;
  });

  // In case some rows weren't rendered (safety), keep them
  for(; rowIndex < originalRows.length; rowIndex++){
    newRows.push(originalRows[rowIndex]);
  }

  const updatedAt = new Date().toISOString();

  // Save back to Firestore
  try{
    await updateDoc(doc(db, FIRESTORE_COLLECTION, selectedKey), {
      rows: newRows,
      updatedAt
    });
  }catch(err){
    console.error("❌ Firestore update failed:", err);
    alert("❌ Failed to save edits to Firestore. Check console.");
    return;
  }

  selectedSubmission = {...selectedSubmission, rows: newRows, updatedAt};
  editMode = false;
  document.getElementById("editSubmissionBtn").disabled = false;
  document.getElementById("saveEditsBtn").disabled = true;

  renderHistoryTable(newRows, false);
  alert("Edits saved!");
}




function setupPastEntryModal(){
  const btn = document.getElementById('addPastEntryBtn');
  const modal = document.getElementById('pastEntryModal');
  const closeBtn = document.getElementById('pastEntryClose');
  const cancelBtn = document.getElementById('pastEntryCancel');
  const continueBtn = document.getElementById('pastEntryContinue');
  const dateInput = document.getElementById('pastEntryDate');
  if(!btn || !modal || !continueBtn || !dateInput) return;

  // ---- Scroll lock helpers (same behavior as other modals) ----
  let __scrollY = 0;
  const lockScroll = () => {
    __scrollY = window.scrollY || 0;
    document.body.classList.add('modal-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${__scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };
  const unlockScroll = () => {
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, __scrollY);
  };

  const open = () => {
    // default = yesterday (common case when someone missed a day)
    try{
      const d = new Date();
      d.setDate(d.getDate()-1);
      dateInput.value = d.toISOString().slice(0,10);
    }catch(e){}
    modal.classList.remove('hidden');
    lockScroll();
  };
  const close = () => {
    modal.classList.add('hidden');
    unlockScroll();
  };

  btn.addEventListener('click', open);
  if(closeBtn) closeBtn.addEventListener('click', close);
  if(cancelBtn) cancelBtn.addEventListener('click', close);
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) close();
  });

  continueBtn.addEventListener('click', async ()=>{
    const iso = (dateInput.value || "").trim();
    if(!iso){
      alert("Please select a date.");
      return;
    }
    // prevent future dates
    const sel = new Date(iso + "T00:00:00");
    const today = new Date();
    today.setHours(0,0,0,0);
    if(sel.getTime() > today.getTime()){
      alert("Future dates are not allowed.");
      return;
    }

    // Build both id formats; prefer dotted as canonical
    const dotted = formatDateKeyFromISO(iso); // DD.MM.YYYY
    const isoKey = iso; // YYYY-MM-DD

    try{
      // if exists (either format), open it
      const docRefDotted = doc(db, FIRESTORE_COLLECTION, dotted);
      const snapDotted = await getDoc(docRefDotted);
      if(snapDotted.exists()){
        close();
        // ensure user is on submissions page
        switchPage('submissions');
        openSubmission(dotted);
        return;
      }

      const docRefIso = doc(db, FIRESTORE_COLLECTION, isoKey);
      const snapIso = await getDoc(docRefIso);
      if(snapIso.exists()){
        close();
        switchPage('submissions');
        openSubmission(isoKey);
        return;
      }

      // create new empty entry for that day (saved)
      const payload = {
        dateKey: dotted,
        dateLabel: dotted,
        timeLabel: "8.00am",
        status: "saved",
        rows: getBaseRows(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        backdated: true
      };

      await setDoc(docRefDotted, payload);
      // refresh list + open the new entry
      renderSubmissionsList();
      close();
      switchPage('submissions');
      openSubmission(dotted);
      alert("Past entry created. You can edit and Save/Submit it now.");
    }catch(err){
      console.error("❌ Add Past Entry failed:", err);
      alert("❌ Failed to create/open past entry. Check console.");
    }
  });
}

// Convert YYYY-MM-DD -> DD.MM.YYYY (canonical key)
function formatDateKeyFromISO(iso){
  try{
    const [y,m,d] = iso.split("-");
    return `${d}.${m}.${y}`;
  }catch(e){
    return iso;
  }
}

