export const basePath = () => {
    //for dev mode
    console.log(process.env);
        return `http://localhost/${process.env.REACT_APP_INSTALL_NAME}/openemr/`;
};
