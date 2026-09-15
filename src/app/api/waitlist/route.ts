import { NextResponse } from "next/server";

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

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      submittedAt: new Date().toISOString(),
      source: "FORJ Fitness Landing Page",
    };

    const googleSheetUrl =
      process.env.GOOGLE_SHEET_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (googleSheetUrl) {
      try {
        const response = await fetch(googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Google Sheet webhook error:", await response.text());
        }
      } catch (sheetError) {
        console.error("Failed to push to Google Sheet:", sheetError);
        // Continue and return success to the user so lead is not blocked
      }
    } else {
      console.log(
        "[Waitlist Lead Received]:",
        payload,
        "(Tip: Set GOOGLE_SHEET_URL in .env.local to automatically forward leads to Google Sheets)"
      );
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
