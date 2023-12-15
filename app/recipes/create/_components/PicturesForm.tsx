"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

import DeleteTrashIcon from "@/components/DeleteTrashIcon";
import { cn } from "@/lib/utils";
import { PictureUpload } from "@/lib/types";
import PicturePreview from "@/app/recipes/create/_components/PicturePreview";
import { MAX_PICTURE_UPLOAD, PICTURE_SIZE_MAX } from "@/lib/const";

type PicturesFormProps = {
  pictures: PictureUpload[];
  onAddPictures: (picture: PictureUpload[]) => void;
  onRemovePicture: (picture: PictureUpload) => void;
  disabled: boolean;
};

const getPictures = (
  files: FileList | null,
  existingPictures: PictureUpload[]
) => {
  const pictures: PictureUpload[] = [];
  if (files && files[0]) {
    for (let i = 0; i < files["length"]; i++) {
      if (existingPictures.length + i >= MAX_PICTURE_UPLOAD) {
        alert("You cannot upload more than 10 pictures");
        break;
      }
      if (files[i].size > PICTURE_SIZE_MAX) {
        alert(`Picture '${files[i].name}' exceeds 2MB`);
        continue;
      }
      if (
        !existingPictures.some((picture) => picture.file.name === files[i].name)
      ) {
        pictures.push({
          id: `${i}${Date.now()}`,
          file: files[i],
        });
      }
    }
  }

  return pictures;
};

const PicturesForm = ({
  pictures,
  onAddPictures,
  onRemovePicture,
  disabled,
}: PicturesFormProps) => {
  const inputRef = useRef<any>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pics = getPictures(event.target.files, pictures);
    console.log({ pics });
    onAddPictures(getPictures(event.target.files, pictures));
  };

  const handleDrop = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    onAddPictures(getPictures(event.dataTransfer.files, pictures));
  };

  const handleDragLeave = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <h2 className="flex items-baseline justify-between">Pictures</h2>
      <form
        className={cn(
          "w-full p-4 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer",
          dragActive ? "bg-secondary-dark" : "bg-background-light"
        )}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={openFileExplorer}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept="image/png, image/gif, image/jpeg"
        />

        <p className="text-sm">
          Drag & Drop files or select files to upload pictures (max 2MB)
        </p>
      </form>

      <div className="p-3 flex flex-col gap-y-2">
        {pictures.map((picture) => (
          <div key={picture.id} className="flex items-center gap-x-2">
            <PicturePreview picture={picture} />
            <DeleteTrashIcon
              className="text-xs"
              handleClick={() => onRemovePicture(picture)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicturesForm;
