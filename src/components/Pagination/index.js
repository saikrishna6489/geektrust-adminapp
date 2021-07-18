import { Component } from "react";
import { ImForward3, ImBackward2 } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaginationItem from "../PaginationItem";
import "./index.css";

class Pagination extends Component {
  state = {
    totalPages: [],
    startIndex: 1,
    lastIndex: 1,
  };

  componentDidMount(prev) {
    this.setPaginationValues();
  }

  componentDidUpdate(prevProp, prevState) {
    const { currentPage } = this.state;
    if (
      prevState.currentPage !== currentPage ||
      prevProp.totalItems !== this.props.totalItems
    ) {
      this.setPaginationValues();
    }
  }

  setPaginationValues = () => {
    const { totalItems, itemsPerPage } = this.props;
    const noOfPages = Math.ceil(totalItems / itemsPerPage);
    const lastIndex = noOfPages;
    const totalPages = Array.from(Array(noOfPages));
    this.setState({ totalPages, lastIndex });
  };

  onClickForward = () => {
    const { totalPages } = this.state;
    const { currentPage, changeCurrentPage } = this.props;
    if (currentPage + 1 <= totalPages.length) {
      changeCurrentPage(currentPage + 1);
    }
  };

  onClickBackward = () => {
    const { currentPage, changeCurrentPage } = this.props;
    if (currentPage > 1) {
      changeCurrentPage(currentPage - 1);
    }
  };

  onClickFastForward = () => {
    const { totalPages } = this.state;
    const { changeCurrentPage } = this.props;
    changeCurrentPage(totalPages.length);
  };

  onClickFastBackward = () => {
    const { changeCurrentPage } = this.props;
    changeCurrentPage(1);
  };

  setCurrentPage = (currentPage) => {
    const { changeCurrentPage } = this.props;
    changeCurrentPage(currentPage);
  };

  render() {
    const { totalPages } = this.state;
    const { currentPage } = this.props;
    return (
      <div className="pagination-container d-flex flex-row justify-content-center">
        <div className="pagination-section">
          <ImBackward2 size="1.6em" onClick={this.onClickFastBackward} className="page-icon"/>
          <FaChevronLeft size="1.3em" onClick={this.onClickBackward} className="page-icon"/>
          {totalPages.map((eachPage, index) => (
            <PaginationItem
              currentPage={currentPage}
              pageNo={index + 1}
              setCurrentPage={this.setCurrentPage}
              key={`page${index + 1}`}
            />
          ))}
          <FaChevronRight size="1.3em" onClick={this.onClickForward} className="page-icon"/>
          <ImForward3 size="1.6em" onClick={this.onClickFastForward} className="page-icon"/>
        </div>
      </div>
    );
  }
}

export default Pagination;
