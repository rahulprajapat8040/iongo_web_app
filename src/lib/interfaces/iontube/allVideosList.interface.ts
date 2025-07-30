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
    duration: any
    status: string
    views: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    tags: Tag[]
}

export interface Tag {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    VideoTag: VideoTag
}

export interface VideoTag {
    videoId: string
    tagId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface PageInfo {
    total: number
    currentPage: number
    totalPage: number
}
