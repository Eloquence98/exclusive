"use server";
import { signIn, signOut } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


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
  await signOut();
}

// Login with credentials
export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Server-side validation
  if (!/^[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    throw new Error("Invalid email or password");
  }
}

// Sign up new user
export async function signUpAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  // Server-side validation
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    throw new Error("Name should contain only letters and numbers.");
  }

  if (!/^[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  if (password !== passwordConfirm) {
    throw new Error("Passwords do not match.");
  }

  try {
    // Call backend signup API
    const res = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    // After successful signup, sign them in
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    throw new Error(error.message || "Failed to create account");
  }
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
