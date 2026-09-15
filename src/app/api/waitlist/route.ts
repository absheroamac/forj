import { NextResponse } from "next/server";

const DEFAULT_GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxYewmMmvA34GcWhtm76zkPGIRbh691tu6vjmc5Imv0BGJzH-7YUhnhWz5ef5hvtL7V/exec";

function getDubaiFormattedTimestamp(): string {
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);
  return `${dateStr} (GST)`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const trimmedPhone = phone.trim();
    // Prefix phone with a single quote so Google Sheets treats it as plain text instead of a formula error on leading '+'
    const safePhone = trimmedPhone.startsWith("'") ? trimmedPhone : `'${trimmedPhone}`;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: safePhone,
      submittedAt: getDubaiFormattedTimestamp(),
      source: "FORJ Fitness Landing Page",
    };

    const googleSheetUrl =
      process.env.GOOGLE_SHEET_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ||
      DEFAULT_GOOGLE_SHEET_URL;

    if (googleSheetUrl) {
      try {
        const response = await fetch(googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        });

        if (!response.ok) {
          console.error("Google Sheet webhook error status:", response.status);
        }
      } catch (sheetError) {
        console.error("Failed to push to Google Sheet:", sheetError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Successfully added to waitlist." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
