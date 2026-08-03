import { toast } from "@/components/ui/toast";

export const addToast = ({ description, type, options = {} }) => {
    return toast.add({ description, type, ...options });
};
