import { useEffect } from "react";

function useAxiosCancel(axiosCancelSource, dependancies = []) {
  useEffect(() => (
    () => { axiosCancelSource.cancel("Request cancelled"); }
  ), dependancies);
}

export default useAxiosCancel;
