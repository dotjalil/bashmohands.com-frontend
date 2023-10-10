import compose from "compose-function";
import { withRouter } from "./with-route";

export const withProviders = compose(withRouter);
