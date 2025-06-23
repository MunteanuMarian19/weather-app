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

// ==============================================================
// export const getCoords = () =>
//   new Promise((resolve, reject) => {
//     // Fallback: IP-based lookup
//     const fallbackToIp = async () => {
//       try {
//         const response = await fetch("https://ipapi.co/json/");
//         const data = await response.json();
//         resolve({
//           latitude: data.latitude,
//           longitude: data.longitude,
//           source: "ip",
//           accuracy: "city",
//         });
//       } catch (err) {
//         reject(new Error("Could not determine location via IP"));
//       }
//     };

//     if (!navigator.geolocation) {
//       // No GPS support, go straight to IP fallback
//       return fallbackToIp();
//     }

//     // Try GPS first
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           source: "gps",
//           accuracy: position.coords.accuracy, // in meters
//         });
//       },
//       (error) => {
//         console.warn("GPS failed:", error.message);
//         fallbackToIp();
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 60_000,
//       }
//     );
//   });

// // Expose for quick DevTools testing:
// window.getCoords = getCoords;
