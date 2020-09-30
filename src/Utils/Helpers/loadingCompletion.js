
const LoadingList = () => {

    const componentsState = {};

    const init = (components) => {
        components.map(component => componentsState[component] = false);
        console.log(componentsState);
    }

    const loaded = (component) => {
        componentsState[component] = true;
    }

    const complete = (componentsState) => {
        console.log(componentsState);
        for (const val in componentsState) {
            if (!val) return false;
        }
        return true;
    }

    return {
        init,
        loaded,
        complete
    }
}

export default LoadingList;