export const Rating = ({ rate, count }) => {
  return (
    <>
      <span className="badge badge-pill bg-primary">{rate}/5 </span>({count}{" "}
      reviews)
    </>
  );
};
