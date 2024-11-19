import { useEffect, useState, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import { Header } from './components/Header'
import { Drawer } from './components/Drawer/Drawer'
import { ISneaker } from './Interfaces'
import { Favorites } from './pages/Favorites'
import { Orders } from './pages/Orders'
import { Home } from './pages/Home'

const AppContext = createContext({})
export function useAppContext() {
	return useContext(AppContext)
}

function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState(Array<ISneaker>)
	const [favorites, setFavorites] = useState(Array<ISneaker>)
	const [cartOpened, setCartOpened] = useState(false)
	const [total, setTotal] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, itemsResponse] =
					await Promise.all([
						axios.get('https://673515085995834c8a91d684.mockapi.io/cart'),
						axios.get('https://673899eb4eb22e24fca8695a.mockapi.io/favorites'),
						axios.get('https://673515085995834c8a91d684.mockapi.io/items'),
					])
				setIsLoading(false)
				setCartItems(cartResponse.data)
				setFavorites(favoritesResponse.data)
				setItems(itemsResponse.data)
			} catch (error) {
				alert('Не удалось получить данные')
				console.log(error)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		setTotal(cartItems.reduce((accum, item) => accum + item.price, 0))
	}, [cartItems])

	const onAddToCart = (card: ISneaker) => {
		try {
			if (cartItems.find(item => item.parentId === card.parentId)) {
				onRemoveFromCart(card)
			} else {
				setCartItems(prev => [...prev, card])
				axios.post('https://673515085995834c8a91d684.mockapi.io/cart', card)
			}
		} catch (error) {
			alert('Не удалось добавить в корзину')
			console.log(error)
		}
	}

	const onRemoveFromCart = (card: ISneaker) => {
		try {
			setCartItems(prev => prev.filter(item => item.parentId !== card.parentId))
			cartItems.forEach(obj => {
				if (obj.parentId === card.parentId) {
					axios.delete(
						`https://673515085995834c8a91d684.mockapi.io/cart/${obj.id}`
					)
				}
			})
		} catch (error) {
			alert('Не удалось удалить из корзины')
			console.log(error)
		}
	}

	const onAddFavorite = (card: ISneaker) => {
		try {
			if (favorites.find(item => item.parentId === card.parentId)) {
				setFavorites(prev =>
					prev.filter(item => item.parentId !== card.parentId)
				)
				favorites.forEach(obj => {
					if (obj.parentId === card.parentId) {
						axios.delete(
							`https://673899eb4eb22e24fca8695a.mockapi.io/favorites/${obj.id}`
						)
					}
				})
			} else {
				setFavorites(prev => [...prev, card])
				axios.post(
					'https://673899eb4eb22e24fca8695a.mockapi.io/favorites',
					card
				)
			}
		} catch (error) {
			alert('Не удалось добавить в корзину')
			console.log(error)
		}
	}

	const isItemAdded = (card: ISneaker) => {
		return cartItems.some(obj => obj.parentId === card.parentId)
	}

	const isItemFavorite = (card: ISneaker) => {
		return favorites.some(obj => obj.parentId === card.parentId)
	}

	return (
		<AppContext.Provider
			value={{
				setCartOpened,
				items,
				favorites,
				cartItems,
				total,
				isItemAdded,
				isItemFavorite,
				onAddToCart,
				onAddFavorite,
				isLoading,
				onRemoveFromCart,
				setCartItems,
			}}
		>
			<div className='wrapper'>
				<Drawer opened={cartOpened} />
				<Header />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/favorites' element={<Favorites />}></Route>
					<Route path='/orders' element={<Orders />}></Route>
				</Routes>
			</div>
		</AppContext.Provider>
	)
}

export default App
