import { Rating } from "./Rating";

export const Product = ({ product, setsSlectedCategory }) => {
  const handleSelectedSpanCategory = (e) => {
    setsSlectedCategory(e.target.innerHTML);
  };
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>
        <span
          className="badge badge-pill bg-dark"
          style={{ cursor: "pointer" }}
          onClick={handleSelectedSpanCategory}
        >
          {product.category}
        </span>
      </td>
      <td>
        <img src={product.image} alt={product.title} width={"50px"} />
      </td>
      <td width={"170px"}>
        <Rating rate={product.rating.rate} count={product.rating.count} />
      </td>
    </tr>
  );
};
