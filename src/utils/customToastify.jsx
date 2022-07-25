import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const notify = (msg) => {

    toast(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        });
}
