export default function handler(req, res) {
  // CORS engedélyezése az egyszerű lekérdezésekhez
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const firebaseConfigRaw = process.env.FIREBASE_CONFIG;
  let firebaseConfig = null;
  
  if (firebaseConfigRaw) {
    try {
      // Megpróbáljuk JSON objektummá alakítani a szöveget
      firebaseConfig = JSON.parse(firebaseConfigRaw);
    } catch (e) {
      // Ha nem szabályos JSON, stringként adjuk vissza
      firebaseConfig = firebaseConfigRaw;
    }
  }

  // Visszaadjuk a konfigurációt a kliensnek
  res.status(200).json({
    firebaseConfig: firebaseConfig,
    appId: process.env.APP_ID || 'foci-vb-2026'
  });
}