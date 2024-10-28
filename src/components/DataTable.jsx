import React, { useEffect, useState } from 'react';
import '../assets/css/Style.css';

function DataTable() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = () => {
        fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    };

    // Filtering based on search term
    const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentItems = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Sorting the filtered products
    currentItems.sort((a, b) => {
        if (sortOrder === 'Low to high') {
            return a.price - b.price;
        } else if (sortOrder === 'High to low') {
            return b.price - a.price;
        }
        else {
            return
        }
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
        setSortOrder('')
    };

    const changeSortOrder = () => {
        setSortOrder(sortOrder === 'Low to high' ? 'High to low' : 'Low to high');
    };

    const changePage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            setSortOrder('')
        }
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand">JEWELERY</a>
                    <div className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1 className="text-center my-3">JEWELERY STORE</h1>
                <button onClick={changeSortOrder} className="btn btn-primary mb-3">
                    Price: {sortOrder === '' ? '' : sortOrder}
                </button>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td><img src={item.image} alt={item.title} height="100" className="img-thumbnail" width={100}/></td>
                                        <td className="text-truncate" style={{ maxWidth: '150px' }}>{item.title}</td>
                                        <td className="text-truncate" style={{ maxWidth: '300px' }}>{item.description}</td>
                                        <td>${Math.round(item.price)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-outline-primary mx-1" onClick={() => changePage(currentPage - 1)} hidden={currentPage === 1}>
                        Previous
                    </button>
                    {[...Array(3)].map((_, index) => {
                        const pageNumber = currentPage - 1 + index;
                        if (pageNumber >= 1 && pageNumber <= totalPages) {
                            return (
                                <button
                                    className="btn btn-outline-primary mx-1"
                                    key={index + 1}
                                    onClick={() => changePage(pageNumber)}
                                    disabled={currentPage === pageNumber}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                        return null;
                    })}
                    <button className="btn btn-outline-primary mx-1" onClick={() => changePage(currentPage + 1)} hidden={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>

        </>
    );
}

export default DataTable;