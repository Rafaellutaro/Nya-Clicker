import { Bounce, ToastContainer, toast } from 'react-toastify';

const toastService = {
    container: () => {
        return(
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    )
    },

    successMessage: (message: string) => {
        toast.success("O " + message + " Apareceu", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });
    },

    errorMessage: (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });
    }
}

export default { toastService };