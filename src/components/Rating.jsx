export const Rating = ({ rate, count }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }

    return stars;
  };

  return (
    <div className="d-flex flex-column align-items-start gap-1">
      <div className="d-flex align-items-center gap-1">
        {renderStars()}
        <span className="ms-2 badge bg-warning text-dark">
          {rate.toFixed(1)}
        </span>
      </div>
      <small className="text-muted">
        <i className="bi bi-people-fill me-1"></i>
        {count} reviews
      </small>
    </div>
  );
};