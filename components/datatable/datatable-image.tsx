import { useEffect, useState } from "react";
import defaultAvatar from "@/public/default-avatar.webp";
import Image from "next/image";

export default function DataTableImage({ imageUrl }: { imageUrl: string }) {
  const hostUrl = process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl;
  const [imgSrc, setImgSrc] = useState(hostUrl || defaultAvatar.src);
  useEffect(() => {
    if (hostUrl) {
      setImgSrc(hostUrl);
    }
  }, [hostUrl]);
  return (
    <div className="flex">
      <Image
        src={imgSrc}
        alt="Data Table Image"
        width={80}
        height={80}
        onError={() => setImgSrc(defaultAvatar.src)}
      />
    </div>
  );
}
