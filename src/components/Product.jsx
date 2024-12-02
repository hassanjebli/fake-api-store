// Product.jsx
import { Rating } from "./Rating";

export const Product = ({ product, setSelectedCategory }) => {
  return (
    <tr className="fade-in">
      <td className="fw-bold text-muted">#{product.id}</td>
      <td>
        <div className="fw-semibold text-primary">{product.title}</div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <i className="bi bi-currency-dollar text-success me-1"></i>
          <span className="fw-bold text-success">{product.price.toFixed(2)}</span>
        </div>
      </td>
      <td>
        <div 
          className="description-cell" 
          style={{
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
          title={product.description}
        >
          {product.description}
        </div>
      </td>
      <td>
        <span
          className="badge bg-primary bg-opacity-10 text-primary text-uppercase px-3 py-2 rounded-pill"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedCategory(product.category)}
        >
          <i className="bi bi-tag-fill me-2"></i>
          {product.category}
        </span>
      </td>
      <td>
        <div className="position-relative">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow-sm product-image"
            style={{ 
              width: "60px",
              height: "60px",
              objectFit: "contain",
              backgroundColor: "#fff",
              padding: "5px"
            }}
          />
        </div>
      </td>
      <td>
        <Rating rate={product.rating.rate} count={product.rating.count} />
      </td>
    </tr>
  );
};