import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import AccountActions from "../components/account/AccountActions";
import AccountHeader from "../components/account/AccountHeader";
import AccountStats from "../components/account/AccountStats";
import LogoutConfirmModal from "../components/modals/LogoutConfirmModal";
import { useShop } from "../context/ShopContext";

export default function Account() {
  const { auth, logout, cartCount, wishlistItems } = useShop();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  return (
    <>
      <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-report">
          <AccountHeader />
          <AccountStats cartCount={cartCount} email={auth.email} wishlistCount={wishlistItems.length} />
          <AccountActions onLogout={() => setIsLogoutConfirmOpen(true)} />
        </div>
      </AnimatedSection>

      <LogoutConfirmModal
        isOpen={isLogoutConfirmOpen}
        onCancel={() => setIsLogoutConfirmOpen(false)}
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          logout();
        }}
      />
    </>
  );
}
