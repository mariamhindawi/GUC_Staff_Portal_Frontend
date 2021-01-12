import React from "react";
import { Pagination } from "reactstrap";

class pagination extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        currentPage: 1,
        itemsPerPage: 3
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
  
    render() {
      const { items, currentPage, itemsPerPage } = this.state;
  
      // Logic for displaying items
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
      const renderItems = currentItems.map((item, index) => {
        return <li key={index}>{item}</li>;
      });
  
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }
  
      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });
  
      return (
        <div>
          <ul>
          {renderItems}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}
export default pagination;