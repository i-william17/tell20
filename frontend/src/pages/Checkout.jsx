import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutEmptyState from "../components/checkout/CheckoutEmptyState";
import CheckoutLayout from "../components/checkout/CheckoutLayout";
import CheckoutSuccess from "../components/checkout/CheckoutSuccess";
import { useShop } from "../context/ShopContext";

const initialCheckoutDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  addressLine2: "",
  city: "",
  county: "",
  country: "Kenya",
  postalCode: "",
  deliveryNotes: "",
  paymentMethod: "mpesa",
  promoCode: ""
};

const getPromoDiscount = (code, subtotal) => {
  const normalizedCode = code.trim().toUpperCase();

  if (!normalizedCode) {
    return {
      isValid: true,
      code: "",
      discount: 0
    };
  }

  if (normalizedCode === "TELL20") {
    return {
      isValid: true,
      code: normalizedCode,
      discount: Math.round(subtotal * 0.1)
    };
  }

  if (normalizedCode === "WELCOME20") {
    return {
      isValid: true,
      code: normalizedCode,
      discount: Math.min(1200, subtotal)
    };
  }

  return {
    isValid: false,
    code: normalizedCode,
    discount: 0
  };
};

const getInitialDetails = (auth, currentCustomer) => ({
  ...initialCheckoutDetails,
  name: currentCustomer
    ? `${currentCustomer.firstName || ""} ${currentCustomer.lastName || ""}`.trim()
    : "",
  email: auth.email || currentCustomer?.email || "",
  phone: currentCustomer?.phone || ""
});

export default function Checkout() {
  const {
    auth,
    cartItems,
    currentCustomer,
    subtotal,
    shipping,
    placeOrder,
    lastOrder
  } = useShop();

  const [details, setDetails] = useState(() =>
    getInitialDetails(auth, currentCustomer)
  );

  const [order, setOrder] = useState(lastOrder);

  useEffect(() => {
    setDetails((current) => ({
      ...current,
      name:
        current.name ||
        (currentCustomer
          ? `${currentCustomer.firstName || ""} ${
              currentCustomer.lastName || ""
            }`.trim()
          : ""),
      email: current.email || auth.email || currentCustomer?.email || "",
      phone: current.phone || currentCustomer?.phone || ""
    }));
  }, [auth.email, currentCustomer]);

  const promo = getPromoDiscount(details.promoCode, subtotal);
  const checkoutTotal = Math.max(
    0,
    subtotal + shipping - promo.discount
  );

  const updateDetail = (key, value) => {
    setDetails((current) => ({
      ...current,
      [key]: value
    }));
  };

  const validateCheckout = () => {
    const requiredFields = [
      ["name", "Please enter your full name."],
      ["email", "Please enter your email address."],
      ["phone", "Please enter your phone number."],
      ["address", "Please enter your delivery address."],
      ["city", "Please enter your city."],
      ["county", "Please enter your county."]
    ];

    for (const [key, message] of requiredFields) {
      if (!String(details[key] || "").trim()) {
        toast.error(message);
        return false;
      }
    }

    if (!promo.isValid) {
      toast.error(
        "Promo code invalid. Use TELL20 or WELCOME20, or leave the promo field blank."
      );
      return false;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add an item before checkout.");
      return false;
    }

    return true;
  };

  const submitOrder = (event) => {
    event.preventDefault();

    if (!validateCheckout()) return;

    const cleanDetails = {
      ...details,
      name: details.name.trim(),
      email: details.email.trim().toLowerCase(),
      phone: details.phone.trim(),
      address: details.address.trim(),
      addressLine2: details.addressLine2.trim(),
      city: details.city.trim(),
      county: details.county.trim(),
      country: details.country.trim() || "Kenya",
      postalCode: details.postalCode.trim(),
      deliveryNotes: details.deliveryNotes.trim(),
      promoCode: promo.code
    };

    const nextOrder = placeOrder(cleanDetails, {
      subtotal,
      shipping,
      discount: promo.discount,
      promoCode: promo.code,
      total: checkoutTotal
    });

    setOrder(nextOrder);
    toast.success(`Order ${nextOrder.id} is confirmed.`);
  };

  if (cartItems.length === 0 && !order) {
    return <CheckoutEmptyState />;
  }

  if (order) {
    return <CheckoutSuccess order={order} />;
  }

  return (
    <CheckoutLayout
      cartItems={cartItems}
      details={details}
      discount={promo.discount}
      onDetailsChange={updateDetail}
      onSubmit={submitOrder}
      promoCode={promo.code}
      shipping={shipping}
      subtotal={subtotal}
      total={checkoutTotal}
    />
  );
}