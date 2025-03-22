import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 },
    );
  }

  try {
    // Use OpenStreetMap Nominatim API for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Mazdur Setu Worker Platform",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Format the location data
    const locationData = {
      display_name: data.display_name,
      city:
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet,
      state: data.address.state,
      country: data.address.country,
      postcode: data.address.postcode,
      formatted: `${data.address.city || data.address.town || data.address.village || data.address.hamlet || ""}, ${data.address.state || ""}`,
    };

    console.log("Location data:", locationData);

    return NextResponse.json(locationData);
  } catch (error) {
    console.error("Error fetching location data:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 },
    );
  }
}
