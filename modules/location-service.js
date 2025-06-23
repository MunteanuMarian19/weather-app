export const getCoords = () =>
  new Promise((resolve, reject) => {
    const fallbackToIp = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        resolve({
          latitude: data.latitude,
          longitude: data.longitude,
          source: "ip",
          accuracy: "city",
        });
      } catch {
        reject(new Error("Could not determine location via IP"));
      }
    };

    if (!navigator.geolocation) {
      return fallbackToIp();
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          source: "gps",
          accuracy: pos.coords.accuracy,
        }),
      () => fallbackToIp(),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
    );
  });
