import { useState } from 'react'
import { useAppContext } from '../App'

import { Card } from '../components/Card'
import { EmptyCard } from '../components/Card/EmptyCard'
import { ISneaker } from '../Interfaces'

export const Home = () => {
	const [searchValue, setSearchValue] = useState('')

	const { items }: any = useAppContext()
	const { isLoading }: any = useAppContext()

	const renderItems = () => {
		const filtredItems = items.filter((item: ISneaker) =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		)

		return isLoading
			? [...Array(9)].map(index => <EmptyCard key={index} />)
			: filtredItems.map((item: ISneaker) => (
					<Card key={item.parentId} card={item} />
			  ))
	}

	return (
		<div className='content'>
			<div className='content_top'>
				<h1>
					{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
				</h1>
				<label htmlFor='search' className='content_top__search'>
					<img width={14} src='/img/search.svg' alt='search' />
					<input
						id='search'
						onChange={event => setSearchValue(event.target.value)}
						placeholder='Поиск...'
					/>
				</label>
			</div>
			<div className='sneakers'>{renderItems()}</div>
		</div>
	)
}
