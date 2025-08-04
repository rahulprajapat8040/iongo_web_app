export interface VideoDetailInterface {
    id: string
    title: string
    description: string
    uploadedById: string
    videoUrl: string
    thumbnailUrl: string
    duration: number
    status: string
    views: number
    channelId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    tags: Tag[]
    videoOriginal: string
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