export interface ChannelListInterface {
    data: ChannelInterface[]
    pageInfo: PageInfo
}

export interface ChannelInterface {
    id: string
    channelName: string
    channelTitle: string
    description: string
    image: string
    bannerImage: string
    ownerId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface PageInfo {
    total: number
    currentPage: number
    totalPage: number
}
