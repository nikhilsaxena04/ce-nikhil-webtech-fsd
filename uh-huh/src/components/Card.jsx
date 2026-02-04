function Card({ image }) {
  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        border: "1px solid purple",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {image && (
        <img
          src={image}
          alt="Card"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      )}
    </div>
  );
}

export default Card;
