import moment from 'moment'

export class Helper {

    static getDateTimeDiff = (date: string | Date) => {
        return moment(date).fromNow(); // e.g., "10 minutes ago"
    }

    static getVideoDurationInSeconds = (file: File): Promise<number> => {
        return new Promise((resolve, reject) => {
            try {
                const video = document.createElement("video");
                video.preload = "metadata";

                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src);
                    const duration = video.duration;
                    resolve(Math.floor(duration)); // in seconds
                };

                video.onerror = () => {
                    reject("Failed to load video metadata");
                };

                video.src = URL.createObjectURL(file);
            } catch (error) {
                reject("Error extracting video duration");
            }
        });
    };

}
