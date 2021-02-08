import React from "react";
import PropTypes from "prop-types";
import { Pagination as BootstrapPagination } from "react-bootstrap";

function Pagination(props) {
  const numberOfPages = Math.ceil(props.numberOfItems / props.itemsPerPage) || 1;
  const previusPage = props.currentPage === 1 ? 1 : props.currentPage - 1;
  const nextPage = props.currentPage === numberOfPages ? numberOfPages : props.currentPage + 1;

  const items = [];
  if (numberOfPages < 6) {
    for (let i = 1; i <= numberOfPages; i++) {
      const item = (
        <BootstrapPagination.Item
          key={i}
          active={props.currentPage === i}
          onClick={() => { props.setCurrentPage(i); }}
          as="button"
        >
          {i}
        </BootstrapPagination.Item>
      );
      items.push(item);
    }
  }
  else if (props.currentPage < 4) {
    for (let i = 1; i <= 5; i++) {
      const item = (
        <BootstrapPagination.Item
          key={i}
          active={props.currentPage === i}
          onClick={() => { props.setCurrentPage(i); }}
          as="button"
        >
          {i}
        </BootstrapPagination.Item>
      );
      items.push(item);
    }
    items.push(<BootstrapPagination.Ellipsis key={numberOfPages + 1} disabled />);
  }
  else if (props.currentPage > numberOfPages - 3) {
    items.push(<BootstrapPagination.Ellipsis key={0} disabled />);
    for (let i = 4; i >= 0; i--) {
      const page = numberOfPages - i;
      const item = (
        <BootstrapPagination.Item
          key={page}
          active={props.currentPage === page}
          onClick={() => { props.setCurrentPage(page); }}
          as="button"
        >
          {page}
        </BootstrapPagination.Item>
      );
      items.push(item);
    }
  }
  else {
    items.push(<BootstrapPagination.Ellipsis key={0} disabled />);
    for (let i = -2; i <= 2; i++) {
      const page = props.currentPage + i;
      const item = (
        <BootstrapPagination.Item
          key={page}
          active={props.currentPage === page}
          onClick={() => { props.setCurrentPage(page); }}
          as="button"
        >
          {page}
        </BootstrapPagination.Item>
      );
      items.push(item);
    }
    items.push(<BootstrapPagination.Ellipsis key={numberOfPages + 1} disabled />);
  }

  const first = (
    <BootstrapPagination.First
      key={-2}
      disabled={props.currentPage === 1}
      onClick={() => { props.setCurrentPage(1); }}
      as="button"
    />
  );
  const prev = (
    <BootstrapPagination.Prev
      key={-1}
      disabled={props.currentPage === 1}
      onClick={() => { props.setCurrentPage(previusPage); }}
      as="button"
    />
  );
  const next = (
    <BootstrapPagination.Next
      key={numberOfPages + 2}
      disabled={props.currentPage === numberOfPages}
      onClick={() => { props.setCurrentPage(nextPage); }}
      as="button"
    />
  );
  const last = (
    <BootstrapPagination.Last
      key={numberOfPages + 3}
      disabled={props.currentPage === numberOfPages}
      onClick={() => { props.setCurrentPage(numberOfPages); }}
      as="button"
    />
  );
  items.unshift(prev);
  items.unshift(first);
  items.push(next);
  items.push(last);

  return (
    <BootstrapPagination className={props.className} size={props.size}>
      {items}
    </BootstrapPagination>
  );
}

Pagination.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["", "sm", "lg"]),
};

Pagination.defaultProps = {
  className: "",
  size: "",
};

export default Pagination;
