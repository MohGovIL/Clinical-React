export const basePath = () => {
    //for dev mode
    console.log(process.env);
        return `${window.location.protocol}//${window.location.host}/${process.env.REACT_APP_INSTALL_NAME}/openemr/`;
};
