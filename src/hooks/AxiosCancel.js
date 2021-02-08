import { useEffect } from "react";

function useAxiosCancel(axiosCancelSource) {
  useEffect(() => (
    () => { axiosCancelSource.cancel("User navigated to a different page"); }
  ), []);
}

export default useAxiosCancel;
