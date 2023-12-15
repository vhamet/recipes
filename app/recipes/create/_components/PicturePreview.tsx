import { useEffect, useState } from "react";
import Image from "next/image";

import { PictureUpload } from "@/lib/types";

type PictureUploadPreviewProps = {
  picture: PictureUpload;
};

const PictureUploadPreview = ({ picture }: PictureUploadPreviewProps) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(picture.file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [picture]);

  return (
    preview && (
      <div className="flex items-center gap-x-2">
        <Image
          src={preview}
          alt={picture.file.name}
          width="42"
          height="42"
          className="rounded-md"
        />
        <label className="text-xs">{picture.file.name}</label>
      </div>
    )
  );
};

export default PictureUploadPreview;
