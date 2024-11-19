import { useAppContext } from '../App'
import { Loader } from 'rsuite'

import { Card } from '../components/Card'
import { ISneaker } from '../Interfaces'
import { Info } from '../components/Info'

export const Favorites = () => {
	const { favorites }: any = useAppContext()
	const { isLoading }: any = useAppContext()

	const renderItems = () => {
		return favorites.length > 0 ? (
			<>
				<div className='content_top'>
					<h1>Мои закладки</h1>
				</div>
				<div className='sneakers'>
					{favorites.map((item: ISneaker) => (
						<Card key={item.parentId} card={item} />
					))}
				</div>
			</>
		) : (
			<Info
				title='Закладок нет :('
				description={'Вы ничего не добавляли в закладки'}
				imgUrl='/img/regret-smile.png'
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
