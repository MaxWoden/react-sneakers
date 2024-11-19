export interface ISneaker {
	name: string
	price: number
	imgUrl: string
	id: number
	parentId: number
}

export type ISneakers = Array<ISneaker>