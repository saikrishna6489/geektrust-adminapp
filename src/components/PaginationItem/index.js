import "./index.css";

const PaginationItem = (props) => {
  const { currentPage, pageNo, setCurrentPage } = props;
  const pageClassName =
    currentPage === pageNo ? "pagination-item-active" : "pagination-item";
  const changeCurrentPage = () => {
    setCurrentPage(pageNo);
  };
  return (
    <>
      {! isNaN(pageNo) ? (
        <span className={`${pageClassName}`} onClick={changeCurrentPage}>{pageNo}</span>
      ) : (
        <span className={`${pageClassName}`} >
          {pageNo}
        </span>
      )}
    </>
  );
};

export default PaginationItem;
