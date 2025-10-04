// src/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const FALLBACK_IMG = "https://via.placeholder.com/300x200?text=No+Image";

const ProductCard = ({ product, putProduct, deleteProduct }) => {
  // imageUrl이 우선, 없으면 image/thumbnail 순서로 폴백
  const {
    id,
    name,
    price,
    amount,
    imageUrl,
    image,
    thumbnail,
  } = product;

  const navigate = useNavigate();

  // 숫자 안전 처리 (price/amount가 문자열이어도 동작하게)
  const amt = Number(amount ?? 0);
  const prc = Number(price ?? 0);

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

  const imgSrc = imageUrl || image || thumbnail || FALLBACK_IMG;

  return (
    <div className={styles.cardContainer}>
      <img
        onClick={() => navigate("/UpdateProduct", { state: product })}
        src={imgSrc}
        alt={name || "product"}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
        style={{ display: "block", width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }}
      />
      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p className={styles.price}>
          {Number.isFinite(prc) ? prc.toLocaleString() : price}
        </p>

        <div className={styles.amountContainer}>
          <button onClick={handleMinus}>-</button>
          <p>{amt}</p>
          <button onClick={handlePlus}>+</button>
        </div>

        <button className={styles.remove} onClick={() => deleteProduct(id)}>
          REMOVE
        </button>

        <p className={styles.total}>
          Product Total: {Number.isFinite(prc * amt) ? (prc * amt).toLocaleString() : prc * amt}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
