import { Link } from 'react-router-dom'
import { useAppContext } from '../App'

interface Props {
	title: string
	description: string
	imgUrl: string
	titleColor?: string
	link?: boolean
}

export const Info = ({
	title,
	description,
	imgUrl,
	titleColor,
	link,
}: Props) => {
	const { setCartOpened }: any = useAppContext()

	return (
		<div className='info'>
			<div>
				<img src={imgUrl} alt={title} />
				<h2 style={{ color: titleColor }}>{title}</h2>
				<p>{description}</p>
				{link ? (
					<Link to={'..'}>
						<button className='btn-green' onClick={() => setCartOpened(false)}>
							<img src='img/arrow-left.svg' alt='arrow'></img> Вернуться назад
						</button>
					</Link>
				) : (
					<button className='btn-green' onClick={() => setCartOpened(false)}>
						<img src='img/arrow-left.svg' alt='arrow'></img> Вернуться назад
					</button>
				)}
			</div>
		</div>
	)
}
