import {baseRoutePath} from "Utils/Helpers/baseRoutePath";

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param vertical - name of the vertical
 * @returns {string} - url for the first component to load from the router
 */
const firstRouteMapper = vertical => {
    switch (vertical) {
        case 'imaging':
            return `${baseRoutePath()}/${vertical}/patientTracking`;
        default:
            return `${baseRoutePath()}/`;
    }
};

export default firstRouteMapper;
