import React from "react";
import AppContext from "../context";

const Info = ({ image ,title, description }) => {
    const { setCardOpened }  = React.useContext(AppContext)
	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img
				className="mb-20"
				width={120}
				height={120}
				src="/img/empty-cart.png"
				alt=""
			/>
			<h2>{title}</h2>
			<p className="opacity-6">
				{description}
			</p>
			<button onClick={()=> setCardOpened(false)} className="greenButton">
				<img src="/img/arrow.svg" alt="arrow" />
				Повернутися до покупок
			</button>
		</div>
	);
};

export default Info;
