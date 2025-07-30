import { BASE_URL } from "@/lib/utils";
import Image from "next/image";

interface ImagePreviewProps {
    src: string;
    width: number;
    height: number;
    className?: string;
    alt: string;
    path?: string
}

// ✅ Add BASE_URL only if src is a relative path like 'uploads/...'
const needsBaseUrl = (src: string) =>
    !src.startsWith("http") && !src.startsWith("blob:");

const ImagePreview = ({
    src,
    width,
    height,
    className,
    alt,
    path = 'auth'
}: ImagePreviewProps) => {
    const finalSrc = needsBaseUrl(src) ? `${BASE_URL}/${path}/${src}` : src;

    return (
        <Image
            src={finalSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
        />
    );
};

export default ImagePreview;
