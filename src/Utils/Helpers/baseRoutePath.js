import {stateLessOrNot} from "./StatelessOrNot";

export const baseRoutePath = () => stateLessOrNot() ? `` :`/${process.env.REACT_APP_INSTALL_NAME}/openemr/client-app/dev-mode/build`;
