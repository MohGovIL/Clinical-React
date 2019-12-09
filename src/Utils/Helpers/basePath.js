export const basePath = () => {
    //for dev mode
    if (process.env.REACT_APP_API_MODE !== 'stateless') {
        return '../../../';
    } else {
        return `http://localhost/${process.env.REACT_APP_INSTALL_NAME}/openemr/`
    }

};
