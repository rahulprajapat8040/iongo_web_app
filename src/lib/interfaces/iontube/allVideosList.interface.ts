export interface AllVideosListInterface {
    data: VideoListInterface[]
    pageInfo: PageInfo
}

export interface VideoListInterface {
    id: string
    title: string
    description: string
    uploadedById: string
    videoUrl: string
    thumbnailUrl: string
    duration: string
    status: string
    views: number
    channelId: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    channel: Channel
}

export interface Channel {
    id: string
    channelName: string
    channelTitle: string
    description: string
    image: string
    bannerImage: string
    ownerId: string
    createdAt: string
    updatedAt: string
    deletedAt: string
}

export interface PageInfo {
    total: number
    currentPage: number
    totalPage: number
}
