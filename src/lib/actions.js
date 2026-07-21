"use server";

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

// Create Order
export async function createOrderAction(formData) {
  const paymentMethod = formData.get("paymentMethod");
  const cartData = formData.get("cartData");
  const shippingData = formData.get("shippingData");

  // Parse JSON strings
  const cart = JSON.parse(cartData);
  const shippingAddress = JSON.parse(shippingData);

  // Validation
  if (!paymentMethod) {
    throw new Error("Please select a payment method");
  }

  if (!cart || cart.length === 0) {
    throw new Error("Your cart is empty");
  }

  if (
    !shippingAddress.name ||
    !shippingAddress.email ||
    !shippingAddress.phone
  ) {
    throw new Error("Please fill in all required shipping information");
  }

  try {
    // Prepare order data — guest checkout only
    const orderData = {
      products: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity || 1,
      })),
      shippingAddress: {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        addressLine1: shippingAddress.streetAddress,
        addressLine2: shippingAddress.addressLine2 || "",
        city: shippingAddress.city,
        zipCode: shippingAddress.zipCode || "00000",
        country: shippingAddress.country || "USA",
      },
      paymentMethod: "cash_on_delivery",
      guestInfo: {
        name: shippingAddress.name,
        email: shippingAddress.email,
      },
    };

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    return {
      success: true,
      orderNumber: data.data.orderNumber,
    };
  } catch (error) {
    throw new Error(
      error.message || "Failed to create order. Please try again.",
    );
  }
}
