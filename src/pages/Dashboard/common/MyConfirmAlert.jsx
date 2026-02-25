import Swal from "sweetalert2";

const MyConfirmAlert = async ({ title, text, icon, confirmText }) => {
    return await Swal.fire({
        title: title || "Are you sure?",
        text: text || "You won't be able to revert this!",
        icon: icon || "warning",

        background: "oklch(95% 0.03 85)",
        color: "oklch(25% 0.03 85)",

        showCancelButton: true,
        confirmButtonText: confirmText || "Yes",
        cancelButtonText: "Cancel",

        customClass: {
            popup: "swift-popup",
            title: "swift-title",
            htmlContainer: "swift-text",
            confirmButton: "swift-btn swift-btn-confirm", // FIXED
            cancelButton: "swift-btn swift-btn-cancel",   // also add base class
        },

        buttonsStyling: false,
    });
};

export default MyConfirmAlert;