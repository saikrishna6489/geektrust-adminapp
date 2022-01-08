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
    displayedPages: [],
  };

  componentDidMount(prev) {
    this.setPaginationValues();
  }

  componentDidUpdate(prevProp) {
    const isTotalItemsChanged = prevProp.totalItems !== this.props.totalItems
    const isCurrentPageChanged = prevProp.currentPage !== this.props.currentPage
    const isItemsPerPageChanged = prevProp.itemsPerPage !== this.props.itemsPerPage
    if (isItemsPerPageChanged || isCurrentPageChanged || isTotalItemsChanged) {
      this.setPaginationValues();
    }
  }

  setPaginationValues = () => {
    const { totalItems, itemsPerPage, currentPage, siblingCount, changeCurrentPage } = this.props;
    console.log(currentPage);
    let currentDisplayPage = currentPage
    const noOfPages = Math.ceil(totalItems / itemsPerPage);
    if(currentDisplayPage > noOfPages){
      changeCurrentPage(noOfPages)
      return
    }
    const lastIndex = noOfPages;
    let totalPages = Array.from(Array(noOfPages).keys());
    console.log(totalPages.length);
    let displayedPages = [];

    if(noOfPages <= siblingCount*2+4+1){
      displayedPages = totalPages
    } else if(currentPage <= siblingCount+3){
      displayedPages = totalPages.slice(0, siblingCount*2+3)
      displayedPages = displayedPages.concat(['...', noOfPages-1])
    } else if(currentPage >= noOfPages-(siblingCount+2)){
      displayedPages = totalPages.slice(noOfPages-(siblingCount*2+3) )
      displayedPages = [0, '...'].concat(displayedPages)
    } else{
      displayedPages = totalPages.slice(currentPage-siblingCount-1, currentPage+siblingCount)
      displayedPages = [0, '...'].concat(displayedPages)
      displayedPages = displayedPages.concat(['...', noOfPages-1])
    }

    this.setState({ totalPages, lastIndex, displayedPages });
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
    const { displayedPages } = this.state;
    const { currentPage } = this.props;
    return (
      <div className="pagination-container d-flex flex-row justify-content-center">
        <div className="pagination-section">
          <ImBackward2
            size="1.6em"
            onClick={this.onClickFastBackward}
            className="page-icon"
          />
          <FaChevronLeft
            size="1.3em"
            onClick={this.onClickBackward}
            className="page-icon"
          />
          {displayedPages.map((eachPage, index) => { const pageNum = isNaN(eachPage) ? eachPage : eachPage+1; return(
            <PaginationItem
              currentPage={currentPage}
              pageNo={pageNum}
              setCurrentPage={this.setCurrentPage}
              key={`page${index + 1}`}
            />
          )})}
          <FaChevronRight
            size="1.3em"
            onClick={this.onClickForward}
            className="page-icon"
          />
          <ImForward3
            size="1.6em"
            onClick={this.onClickFastForward}
            className="page-icon"
          />
        </div>
      </div>
    );
  }
}

export default Pagination;
