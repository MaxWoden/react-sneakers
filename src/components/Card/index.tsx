import { useEffect, useState } from 'react'
import { useAppContext } from '../../App'

import styles from './Card.module.scss'

import { ISneaker } from '../../Interfaces'


interface Props {
	card: ISneaker
	buttons?: boolean
}

export const Card = ({ card, buttons = true }: Props) => {
	const { isItemAdded }: any = useAppContext()
	const { isItemFavorite }: any = useAppContext()
	const { cartItems }: any = useAppContext()
	const { favorites }: any = useAppContext()
	const { onAddToCart }: any = useAppContext()
	const { onAddFavorite }: any = useAppContext()

	const [inCart, setInCart] = useState(isItemAdded(card))
	const [inFavorite, setInFavorite] = useState(isItemFavorite(card))

	useEffect(() => {
		setInCart(isItemAdded(card))
	}, [cartItems])

	useEffect(() => {
		setInFavorite(isItemFavorite(card))
	}, [favorites])

	return (
		<div className={styles.card}>
			{buttons && (
				<img
					className={styles.favorite}
					src={inFavorite ? 'img/liked.svg' : 'img/unliked.svg'}
					alt='favorite'
					onClick={() => onAddFavorite(card)}
				/>
			)}

			<img width={155} height={120} src={card.imgUrl} alt='' />
			<h3>{card.name}</h3>
			<div className={styles.cardBottom}>
				<div>
					<p>Цена:</p>
					<b>{card.price} руб.</b>
				</div>
				{buttons && (
					<img
						onClick={() => onAddToCart(card)}
						src={inCart ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
						alt='plus'
					/>
				)}
			</div>
		</div>
	)
}
