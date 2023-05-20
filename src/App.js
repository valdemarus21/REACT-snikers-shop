import "./App.scss";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
	let [items, setItems] = React.useState([]);
	let [cartItems, setCartItems] = React.useState([]);
	const [cardOpened, setCardOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");
	const [favorites, setFavorites] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const [cartResponse, favoritesResponse, itemsResponse] =
					await Promise.all([
						axios.get(
							"https://641ed4fcad55ae01ccb0a48f.mockapi.io/cart"
						),
						axios.get(
							"https://642092ed82bea25f6d03c135.mockapi.io/favorites"
						),
						axios.get(
							"https://641ed4fcad55ae01ccb0a48f.mockapi.io/items"
						),
					]);
				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				console.log(
					"ОЙ-ОЙ ! ОШИБКА ПРИ ПОЛУЧЕНИИ ДАННЫХ. КОД ОШИБКИ :",
					error
				);
			}
		}
		fetchData();
	}, []);
	const onAddToCart = async (obj) => {
		const findItem = cartItems.find(
			(item) => Number(item.parentId) === Number(obj.id)
		);
		try {
			if (findItem) {
				setCartItems((prev) =>
					prev.filter(
						(item) => Number(item.parentId) !== Number(obj.id)
					)
				);
				await axios.delete(
					`https://641ed4fcad55ae01ccb0a48f.mockapi.io/cart${findItem.id}`
				);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post(
					"https://641ed4fcad55ae01ccb0a48f.mockapi.io/cart",
					obj
				);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.parentId,
							};
						} else {
							return item;
						}
					})
				);
			}
		} catch (error) {
			console.error(
				"ОШИБКА ПРИ ДОБАВЛЕНИИ В КОРИЗНУ. КОД ОШИБКИ: ",
				error
			);
		}
	};
	const onRemoveItem = (id) => {
		axios.delete(`https://641ed4fcad55ae01ccb0a48f.mockapi.io/cart/${id}`);
		setCartItems((prev) =>
			prev.filter((item) => Number(item.id) !== Number(id))
		);
	};
	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};
	// ============================

	const onAddToFavorite = async (obj) => {
		try {
			if (
				favorites.find((favObj) => Number(favObj.id) === Number(obj.id))
			) {
				axios.delete(
					`https://642092ed82bea25f6d03c135.mockapi.io/favorites/${obj.id}`
				);
				setFavorites((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
			} else {
				const { data } = await axios.post(
					"https://642092ed82bea25f6d03c135.mockapi.io/favorites",
					obj
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			console.log(
				"ОШИБКА ПРИ ДОБАВЛЕНИИ В ЗАКЛАДКИ, КОД ОШИБКИ : ",
				error
			);
		}
	};
	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};
	return (
		<AppContext.Provider
			value={{
				cartItems,
				favorites,
				items,
				isItemAdded,
				onAddToFavorite,
				setCardOpened,
				setCartItems,
				onAddToCart,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCardOpened(false)}
					onRemove={onRemoveItem}
					opened={cardOpened}
				/>
				<Header onClickCart={() => setCardOpened(true)} />

				<Routes>
					<Route
						path="/"
						exact
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					></Route>
					<Route
						path="/favorites"
						exact
						element={<Favorites />}
					></Route>
					<Route path="/orders" exact element={<Orders />}></Route>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
