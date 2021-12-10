import { toast as reactToast } from 'react-toastify';
export const toast = (message, type = "success", duration = 6000) => {
    const msg = message ? message: message
    switch (type) {
        case "success":
            reactToast.success(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        case "warning":
            reactToast.warn(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        case "error":
            reactToast.error(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        case "dark":
            reactToast.dark(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        default:
            reactToast(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
    }

}