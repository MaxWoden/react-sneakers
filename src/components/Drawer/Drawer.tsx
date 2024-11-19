import { useState } from 'react'
import { useAppContext } from '../../App'
import axios from 'axios'

import styles from './drawer.module.scss'

import { ISneaker } from '../../Interfaces'
import { Info } from '../Info'


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const Drawer = ({ opened }: { opened: boolean }) => {
	const { total }: any = useAppContext()
	const { cartItems }: any = useAppContext()
	const { onRemoveFromCart }: any = useAppContext()
	const { setCartOpened }: any = useAppContext()

	const [isOrderComplete, setIsOrderComplete] = useState(false)
	const [orderId, setOrderId] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				'https://673899eb4eb22e24fca8695a.mockapi.io/orders',
				{ date: new Date().toLocaleString(), items: cartItems }
			)
			setOrderId(data.id)
			setIsOrderComplete(true)
			cartItems.forEach((item: ISneaker) => {
				onRemoveFromCart(item)
			})
			await delay(1000)
		} catch (error) {
			alert('Ошибка при создании заказа :(')
			console.log(error)
		}
		setIsLoading(false)
	}

	return (
		<div className={`${styles.overlay} ${opened && styles.overlayVisible}`}>
			<div className={styles.drawer}>
				<h3>
					Корзина
					<img
						onClick={() => setCartOpened(false)}
						src='img/btn-cross.svg'
						alt='close'
					/>
				</h3>
				{cartItems.length > 0 ? (
					<>
						<div className='cart'>
							{cartItems.map((item: ISneaker) => {
								return (
									<div key={item.parentId} className='cart_item'>
										<div
											style={{ backgroundImage: `url(${item.imgUrl})` }}
											className='cart_item__img'
										></div>
										<div className='cart_item__info'>
											<p>{item.name}</p>
											<b>{item.price} руб.</b>
										</div>
										<img
											onClick={() => onRemoveFromCart(item)}
											className='cart_item__btn-remove'
											src='img/btn-cross.svg'
											alt='close'
										/>
									</div>
								)
							})}
						</div>

						<div className='total-block'>
							<ul>
								<li>
									<span>Итого: </span>
									<div></div>
									<b>{total} руб.</b>
								</li>
								<li>
									<span>Налог 5%: </span>
									<div></div>
									<b>{Math.floor(total * 0.05)} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className='btn-green'
							>
								Оформить заказ<img src='img/arrow.svg' alt='arrow'></img>
							</button>
						</div>
					</>
				) : (
					<Info
						titleColor={isOrderComplete ? '#87C20A' : 'null'}
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской службе`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						imgUrl={
							isOrderComplete
								? 'img/order-complete.png'
								: 'img/cart-empty.png'
						}
					/>
				)}
			</div>
		</div>
	)
}
