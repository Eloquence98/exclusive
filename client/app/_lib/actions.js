"use server";
import { signIn, signOut } from "@/app/_lib/auth";

export async function contactGeneralInquiry(formData) {
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phoneNumber = formData.get("phone");
  const contactMessage = formData.get("contactMessage");

  if (!/^[a-zA-Z0-9]+$/.test(lastName)) {
    throw new Error(
      "Please enter only letters and numbers for the last name (e.g., 'Doe123'). Special characters and spaces are not allowed.",
    );
  }

  if (!/^[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email)) {
    throw new Error(
      "Please enter a valid email address (e.g., 'example@domain.com'). The email should follow the format 'user@domain.com', only contain valid characters, and must not exceed 320 characters.",
    );
  }

  if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phoneNumber)) {
    throw new Error(
      "Please enter a phone number in the format XXX-XXX-XXXX (e.g., '123-456-7890').",
    );
  }

  if (!/^.{1,300}$/.test(contactMessage)) {
    throw new Error(
      "Your message should be no more than 300 characters long. Please shorten your message.",
    );
  }

  const contactData = { lastName, email, phoneNumber, contactMessage };
  console.log(contactData);

  // Proceed with processing the data (e.g., save to the database)
  // e.g., await saveToDatabase({ lastName, email, phoneNumber, contactMessage });
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  //   await signOut({ redirectTo: "/" });
  await signOut();
}

export async function couponAction(formData) {
  const coupon = formData.get("coupon");

  if (!/^[A-Z0-9]{6,12}$/.test(coupon)) {
    return {
      error:
        "Invalid coupon. Use 6-12 uppercase letters or numbers (e.g., SAVE20).",
    };
  }

  // Proceed with processing the data (e.g., save to the database)
  // e.g., await saveToDatabase({ coupon });
  return { success: "Coupon code applied!" };
}
