import "./index.css";

const PaginationItem = (props) => {
  const { currentPage, pageNo, setCurrentPage } = props;
  const pageClassName =
    currentPage === pageNo ? "pagination-item-active" : "pagination-item";
  const changeCurrentPage = () => {
    setCurrentPage(pageNo);
  };
  return (
    <span className={`${pageClassName}`} onClick={changeCurrentPage}>
      {pageNo}
    </span>
  );
};

export default PaginationItem;
