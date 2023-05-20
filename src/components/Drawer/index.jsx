import React from "react";
import Info from "../Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./drawer.module.scss";
const delayFn = (ms) => {
	new Promise((resolve, reject) => setTimeout(resolve, ms));
};
function Drawer({ onClose, onRemove, items = [], opened }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [orderId, setOrderId] = React.useState(null);
	const [isOrderComplate, setIsOrderComplete] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				"https://642092ed82bea25f6d03c135.mockapi.io/orders",
				{
					items: cartItems,
				}
			);
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete(
					"https://641ed4fcad55ae01ccb0a48f.mockapi.io/cart" + item.id
				);
				await delayFn(1000);
			}
		} catch (error) {
			console.log("Произошла ошибка :", error);
		}
		setIsLoading(false);
	};
	return (
		<div
			className={`${styles.overlay} ${
				opened ? styles.overlayVisible : ""
			}`}
		>
			<div className={styles.drawer}>
				<h2 className="mb-30 d-flex justify-between">
					Кошик
					<img
						onClick={onClose}
						className="removeBtn cu-p"
						src="/img/btn-remove.svg"
						alt="remove"
					/>
				</h2>
				{items.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items">
							{items.map((obj) => (
								<div
									key={obj.id}
									className="cartItem d-flex align-center mb-20"
								>
									<div
										style={{
											backgroundImage: `url(${obj.imageUrl})`,
										}}
										className="cartItemImg"
									></div>
									<div className="mr-20 flex">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price}</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="/img/btn-remove.svg"
										alt="remove"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li className="d-flex">
									<span>Ціна</span>
									<div></div>
									<b>{totalPrice} грн.</b>
								</li>
								<li className="d-flex">
									<span>Податок 5%</span>
									<div></div>
									<b>
										{((totalPrice / 100) * 5).toFixed()} грн.
									</b>
								</li>
							</ul>
							<button
								onClick={onClickOrder}
								disabled={isLoading}
								className="greenButton"
							>
								Оформить заказ
								<img src="/img/arrow-right.svg" alt="arrow" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={
							isOrderComplate
								? "Заказ оформлений"
								: "Кошик пустий"
						}
						description={
							isOrderComplate
								? `Ваше замовлення №${orderId} скоро буде передано кур'єру`
								: "Додайте хоча б одну пару кросівок"
						}
						image={
							isOrderComplate
								? "/img/order.jpg"
								: "/img/empty-cart.jpg"
						}
					/>
				)}
			</div>
		</div>
	);
}
export default Drawer;
