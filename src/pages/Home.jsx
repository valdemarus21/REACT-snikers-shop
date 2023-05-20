import React from "react";
import Card from "../components/Card";
import AppContext from "../context";
function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCart,
	cartItems,
	isLoading,
}) {
	const { isItemAdded } = React.useContext(AppContext)
	const renderItems = () => {
		const filtredItems = items.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
			<Card
				key={index}
				onFavorite={(obj) => onAddToFavorite(obj)}
				onPlus={(obj) => onAddToCart(obj)}

				loading={isLoading}
				{...item}
			/>
		));
	};
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>
					{searchValue
						? `Пошук по запросу "${searchValue}"`
						: "Всі кросівки"}
				</h1>
				<div className="search-block d-flex">
					<img src="/img/lupa.svg" alt="search" />
					{searchValue && (
						<img
							onClick={() => setSearchValue("")}
							className="clear cu-p"
							src="/img/btn-remove.svg"
							alt="clear"
						/>
					)}
					<input
						value={searchValue}
						onChange={onChangeSearchInput}
						placeholder="Search"
					/>
				</div>
			</div>
			<div className="d-flex flex-wrap">{renderItems()}</div>
		</div>
	);
}
export default Home;
