import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    pages.push(
        <Pagination.First />,
        <Pagination.Prev />
    )
    const pageNeighbours = 2; // Number of pages to show before and after the current page      

    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);

    // Adding first page and dots if needed
    if (startPage > 1) {
        pages.push(
            <Pagination.Item key={1} onClick={() => onPageChange(1)}>
                {1}
            </Pagination.Item>
        );
        if (startPage > 2) {
            pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
    }

    // Adding page numbers
    for (let number = startPage; number <= endPage; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    // Adding last page and dots if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
        pages.push(
            <Pagination.Item key={totalPages} onClick={() => onPageChange(totalPages)}>
                {totalPages}
            </Pagination.Item>
        );
    }
    pages.push(<Pagination.Next />,
        <Pagination.Last />)

    return (
        <div className="d-flex justify-content-center">
            <Pagination size="lg">{pages}</Pagination>
        </div>
    );
}

export default PaginationComponent;