import ContentLoader from 'react-content-loader'
import styles from './Card.module.scss'

export const EmptyCard = () => {
	return (
		<div className={styles.card}>
				<ContentLoader
					speed={2}
					width={165}
					height={260}
					viewBox='0 0 155 260'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='155' height='120' />
					<rect x='0' y='130' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='150' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='180' rx='8' ry='8' width='80' height='25' />
					<rect x='122' y='175' rx='8' ry='8' width='32' height='32' />
				</ContentLoader>
			</div>
	)
}
