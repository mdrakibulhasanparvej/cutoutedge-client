import Swal from "sweetalert2";

const isDarkMode = () => {
  if (typeof window !== "undefined") {
    return (
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
  return false;
};

const MyConfirmAlert = async ({ title, text, icon, confirmText }) => {
  const darkMode = isDarkMode();

  return await Swal.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon: icon || "warning",

    background: darkMode ? "oklch(20% 0.02 85)" : "oklch(95% 0.03 85)",
    color: darkMode ? "oklch(92% 0.02 85)" : "oklch(25% 0.03 85)",

    showCancelButton: true,
    confirmButtonText: confirmText || "Yes",
    cancelButtonText: "Cancel",

    customClass: {
      popup: "swift-popup",
      title: "swift-title",
      htmlContainer: "swift-text",
      confirmButton: "swift-btn swift-btn-confirm", // FIXED
      cancelButton: "swift-btn swift-btn-cancel", // also add base class
    },

    buttonsStyling: false,
  });
};

export default MyConfirmAlert;
