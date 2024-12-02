import { useEffect, useState } from "react";
import { Product } from "./Product";

export const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayProducts = () => {
    const filteredProducts = products.filter((product) => {
      const searchTerm = searchInput.toLowerCase();
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.price.toString().includes(searchTerm) ||
        product.id.toString().includes(searchTerm);

      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });

    if (loading) {
      return (
        <tr>
          <td colSpan={7} className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (filteredProducts.length > 0) {
      return filteredProducts.map((product) => (
        <Product
          product={product}
          key={product.id}
          setSelectedCategory={setSelectedCategory}
        />
      ));
    }

    return (
      <tr>
        <td colSpan={7} className="text-center p-4">
          <div className="alert alert-info mb-0">
            <i className="bi bi-search me-2"></i>
            No products found matching your criteria
          </div>
        </td>
      </tr>
    );
  };

  const getCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const displayCategories = () => {
    return (
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className={`btn ${
            selectedCategory === ""
              ? "btn-primary"
              : "btn-outline-primary"
          } text-capitalize shadow-sm`}
          onClick={() => setSelectedCategory("")}
        >
          <i className="bi bi-grid-3x3-gap me-2"></i>
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category
                ? "btn-primary"
                : "btn-outline-primary"
            } text-capitalize shadow-sm`}
            onClick={() => setSelectedCategory(category)}
          >
            <i className="bi bi-tag me-2"></i>
            {category}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="row justify-content-center">
        <div className="col-12 col-xxl-10">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h1 className="display-5 text-center mb-4">
                <i className="bi bi-shop me-3"></i>
                Products
              </h1>

              <form className="mb-4">
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        id="search"
                        className="form-control shadow-none"
                        placeholder="Search products by name, description, or category..."
                        value={searchInput}
                        onChange={handleSearchInput}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 col-6">
                    <button
                      type="button"
                      className="btn btn-primary w-100 shadow-sm"
                      disabled={!searchInput}
                    >
                      <i className="bi bi-search me-2"></i>
                      Search
                    </button>
                  </div>
                  <div className="col-md-2 col-6">
                    <button
                      type="reset"
                      className="btn btn-outline-danger w-100 shadow-sm"
                      onClick={() => {
                        setSearchInput("");
                        setSelectedCategory("");
                      }}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Reset
                    </button>
                  </div>
                </div>
              </form>

              <h3 className="h4 mb-3">
                <i className="bi bi-funnel me-2"></i>
                Filter by Category
              </h3>
              {displayCategories()}

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 border">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3">ID</th>
                      <th className="py-3">Title</th>
                      <th className="py-3">Price</th>
                      <th className="py-3">Description</th>
                      <th className="py-3">Category</th>
                      <th className="py-3">Image</th>
                      <th className="py-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody>{displayProducts()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};