import { useEffect, useState } from "react";
import { Product } from "./Product";

export const ProducstList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setsSlectedCategory] = useState("");
  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => setProducts(data));
  };
  const displayProducts = () => {
    const filtredProducts = products.filter((product) => {
      const matchesSearch =
        product.title.includes(searchInput) ||
        product.description.includes(searchInput) ||
        product.category.includes(searchInput) ||
        product.price.toString().includes(searchInput) ||
        product.id.toString().includes(searchInput);

      const matchesSelectedCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearch && matchesSelectedCategory;
    });

    if (filtredProducts.length > 0) {
      return filtredProducts.map((product, key) => {
        return <Product product={product} key={key} setsSlectedCategory={setsSlectedCategory}/>;
      });
    }

    return (
      <tr>
        <td colSpan={7}>No Items</td>
      </tr>
    );
  };

  const getGategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => {
        return response.json();
      })
      .then((data) => setCategories(data));
  };

  const handleSelectedCategory = (e) => {
    e.preventDefault();
    setsSlectedCategory(e.target.innerHTML);
  };

  const displayCategories = () => {
    return (
      <>
        <button className={`btn btn-secondary ${selectedCategory===""?"active":""}`} onClick={()=>{setsSlectedCategory("")}}>All Categories</button>
        {categories.map((category, key) => {
          return (
            <button
              key={key}
              className={`btn btn-secondary ${selectedCategory===category?"active":""}`}
              onClick={handleSelectedCategory}
            >
              {category}
            </button>
          );
        })}
      </>
    );
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(document.getElementById("search").value);
  };

  useEffect(() => {
    getProducts();
    getGategories();
  }, []);

  return (
    <div className="container-fluid w-75 mx-auto my-3">
      <form>
        <div className="row">
          <div className="col-9 ">
            <input
              type="text"
              id="search"
              className=" form-control"
              onChange={handleSearchInput}
            />
          </div>
          <div className="col-1">
            <input
              type="submit"
              onClick={handleSearchInput}
              value="Search"
              className="btn btn-success"
            />
          </div>
          <div className="col-1">
            <input
              type="reset"
              value="Reset"
              className="btn btn-danger"
              onClick={() => {
                setSearchInput("");
                setsSlectedCategory("")
              }}
            />
          </div>
        </div>
      </form>
      <h3 className="my-2">Products List:</h3>
      <div className="btn-group w-100 mb-3">{displayCategories()}</div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{displayProducts()}</tbody>
        </table>
      </div>
    </div>
  );
};
