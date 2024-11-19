import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader } from 'rsuite'

import { Info } from '../components/Info'
import { Card } from '../components/Card'
import { ISneaker } from '../Interfaces'

type Order = {
	id: string
	date: string
	items: Array<ISneaker>
}

export const Orders = () => {
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					'https://673899eb4eb22e24fca8695a.mockapi.io/orders'
				)
				setIsLoading(false)
				setOrders(data)
			} catch (error) {
				alert('Не удалось получить данные о ваших покупках')
				console.log(error)
			}
		})()
	}, [])

	const renderItems = () => {
		return orders.length > 0 ? (
			<>
				<div className='content_top'>
					<h1>Мои покупки</h1>
				</div>
				{orders.map((order: Order) => {
					return (
						<div className='order'>
							<div className='order_top'>
								<h2>Заказ №{order.id}</h2>
								<h2>{order.date}</h2>
							</div>
							<div className='sneakers'>
								{order.items.map((card: ISneaker) => {
									return <Card card={card} buttons={false} />
								})}
							</div>
						</div>
					)
				})}
			</>
		) : (
			<Info
				title='У вас нет заказов'
				description={`Вы нищеброд? Оформите хотя бы один заказ.`}
				imgUrl='/img/pity-smile.png'
				link
			/>
		)
	}

	return (
		<div className='content'>
			{isLoading ? (
				<Loader size='lg' content='Loading' className='loader' />
			) : (
				renderItems()
			)}
		</div>
	)
}
