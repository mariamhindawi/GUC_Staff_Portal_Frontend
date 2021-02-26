import { useEffect, useLayoutEffect } from "react";

function useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
  currentPage, items) {
  const setLayout = () => {
    if (window.innerWidth >= 768) {
      setPaginationSize("");
    }
    else {
      setPaginationSize("sm");
    }

    let newItemsPerPage = Math.floor((window.innerHeight - 245) / 45);
    newItemsPerPage = newItemsPerPage > 0 ? newItemsPerPage : 1;
    setItemsPerPage(newItemsPerPage);

    const lastPage = Math.ceil(items.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);
    if (items.length === 0
      || (newCurrentPage === lastPage && items.length % newItemsPerPage !== 0)) {
      setListStyle("list-last-page");
    }
    else {
      setListStyle("");
    }
  };
  const setupEventListeners = () => {
    window.addEventListener("resize", setLayout);
    return () => { window.removeEventListener("resize", setLayout); };
  };
  useLayoutEffect(setLayout, [currentPage, items]);
  useEffect(setupEventListeners, [currentPage, items]);
}

export default useListLayout;
