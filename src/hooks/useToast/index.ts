import { toast } from "react-toastify";

const useToast = () => {

    const successToast = (message: string) => toast.success(message, {position: "bottom-left"});
    const errorToast = (message: string) => toast.error(message, {position: "bottom-left"});

    return {
        successToast,
        errorToast,
    };
};

export default useToast;