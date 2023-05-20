import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
function Header(props) {
	const { totalPrice } = useCart();
	const { onClickCart } = props;
	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width={40} height={40} src="/img/logo.png" alt="" />
					<div className="">
						<h3 className="text-uppercase">Сайт кросівок</h3>
						<p className="opacity-5">Найкращі кросівки</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex">
				<li onClick={onClickCart} className="mr-30 cu-p">
					<img width={18} height={18} src="/img/cart.svg" alt="" />
					<span>{totalPrice}</span>
				</li>
				<li className="mr-20 cu-p">
					<Link to="/favorites">
						<img
							width={18}
							height={18}
							src="/img/heart.svg"
							alt=""
						/>
					</Link>
				</li>
				<Link to="/orders">
					<li>
						<img
							width={18}
							height={18}
							src="/img/user.svg"
							alt=""
						/>
					</li>
				</Link>
			</ul>
		</header>
	);
}
export default Header;
