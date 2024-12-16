// utils/getLayout.js
import AdminLayout from "@/components/layouts/adminLayouts";
import UserLayout from "@/components/layouts/UserLayout";
import GuestLayout from "@/components/layouts/GuestLayout";

export const getLayoutByRole = (role) => {
  switch (role) {
    case "admin":
      return AdminLayout;
    case "user":
      return UserLayout;
    default:
      return GuestLayout;
  }
};
