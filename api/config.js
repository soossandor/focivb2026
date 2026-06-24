module.exports = (req, res) => {
  // CORS engedélyezése az egyszerű lekérdezésekhez
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const firebaseConfigRaw = process.env.FIREBASE_CONFIG;
  let firebaseConfig = null;
  let error = null;
  
  if (firebaseConfigRaw) {
    try {
      // Megpróbáljuk JSON objektummá alakítani a szöveget
      firebaseConfig = JSON.parse(firebaseConfigRaw);
    } catch (e) {
      // Ha nem szabályos JSON, jelezzük a hibát a kliensnek
      firebaseConfig = firebaseConfigRaw;
      error = "A Vercel-en megadott FIREBASE_CONFIG környezeti változó nem szabályos JSON formátumú! Kérlek, ellenőrizd a dupla idézőjeleket a JSON-ben a beállítási útmutató szerint.";
    }
  } else {
    error = "A FIREBASE_CONFIG környezeti változó nincs beállítva a Vercel projektben!";
  }

  // Visszaadjuk a konfigurációt a kliensnek
  res.status(200).json({
    firebaseConfig: firebaseConfig,
    appId: process.env.APP_ID || 'foci-vb-2026',
    error: error
  });
};