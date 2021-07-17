import { Component } from 'react'
import './index.css'
class Pagianation extends Component {
    render() {
        const { detailsPerPage, totalDetails, paginate } = this.props;
        const PageNumbers = [];
        for (let index = 1; index <= Math.ceil(totalDetails / detailsPerPage); index++) {
            PageNumbers.push(index)
        }
        return (
            <>
                <div>
                    <nav aria-label="Page navigation text-center" >
                        <ul className="pagination pagination-md" style={{ position: 'absolute', left: '40%', paddingBottom: '20px' }}>
                            {/* <li className="page-item" key={PageNumbers + "a"}>
                                <a className="page-link" href="#" aria-label="Previous" onClick={() => prevPage()}>
                                    Previous
                                </a>
                            </li> */}
                            {PageNumbers.map((num, index) => (
                                <li className="page-item" key={index}>
                                    <button className="page-link" onClick={() => paginate(num)}>{num}</button>
                                </li>
                            ))}
                            {/* <li className="page-item" key={PageNumbers + 'b'}>
                                <a className="page-link" href="#" aria-label="Next" onClick={() => nextPage()}>
                                    Next
                                </a>
                            </li> */}
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}

export default Pagianation