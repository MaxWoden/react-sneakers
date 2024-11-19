import { useAppContext } from '../../App'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

export const Header = () => {
	const { total }: any = useAppContext()
	const { setCartOpened }: any = useAppContext()
	return (
		<header className={styles.header}>
			<Link to='/'>
				<div className={styles.company}>
					<img width={40} height={40} src='img/logo.svg' alt='logo' />
					<div>
						<h3>REACT SNEAKERS</h3>
						<p>Лучший магазин кроссовок</p>
					</div>
				</div>
			</Link>
			<ul>
				<li onClick={() => setCartOpened(true)}>
					<img width={18} height={18} src='img/cart.svg' alt='logo' />
					<span>{total} руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
						<img width={18} height={18} src='img/heart.svg' alt='logo' />
						<span>Закладки</span>
					</Link>
				</li>
				<li>
					<Link to='/orders'>
						<img width={18} height={18} src='img/profile.svg' alt='logo' />
						<span>Профиль</span>
					</Link>
				</li>
			</ul>
		</header>
	)
}
