import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const FALLBACK_IMG = "https://via.placeholder.com/300x200?text=No+Image";

const ProductCard = ({ product, putProduct, deleteProduct }) => {
  const { id, name, price, amount, imageUrl, image, thumbnail } = product;
  const navigate = useNavigate();

  const amt = Number(amount ?? 0);
  const prc = Number(price ?? 0);
  const imgSrc = imageUrl || image || thumbnail || FALLBACK_IMG;

  const handleMinus = async () => {
    if (amt > 1) {
      await putProduct({ ...product, amount: amt - 1 });
    } else {
      const ok = window.confirm("Are you sure you want to delete this item?");
      if (ok) deleteProduct(id);
    }
  };

  const handlePlus = async () => {
    await putProduct({ ...product, amount: amt + 1 });
  };

  const handleRemove = () => {
    if (window.confirm("remove?")) deleteProduct(id);
  };

  return (
    <div className={styles.cardContainer}>
      <button className={styles.removeBtn} onClick={handleRemove} aria-label="remove"></button>

      <img
        onClick={() => navigate("/UpdateProduct", { state: product })}
        src={imgSrc}
        alt={name || "product"}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
      />

      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p className={styles.price}>
          {Number.isFinite(prc) ? prc.toLocaleString() : price}
        </p>

        <div className={styles.amountContainer}>
          <button onClick={handleMinus}>−</button>
          <p>{amt}</p>
          <button onClick={handlePlus}>＋</button>
        </div>

        <p className={styles.total}>
          Product Total:{" "}
          {Number.isFinite(prc * amt)
            ? (prc * amt).toLocaleString()
            : prc * amt}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
