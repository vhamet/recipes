"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Picture, Recipe } from "@/lib/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useDisableScroll from "@/hooks/useDisableScroll";

type RecipePicturesViewerProps = {
  recipe: Recipe;
};

const PICTURE_CLASSES =
  "w-44 aspect-video object-cover object-center rounded-xl cursor-pointer border-2 border-transparent hover:border-primary ";

const RecipePicturesViewer = ({ recipe }: RecipePicturesViewerProps) => {
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  useDisableScroll(!!selectedPicture);

  if (!recipe.pictures.length) return null;

  let pictures = recipe.pictures,
    placeholder;
  if (recipe.pictures.length > 4) {
    pictures = pictures.slice(0, 3);
    placeholder = `+${recipe.pictures.length - 3}`;
  }

  return (
    <div className="w-full py-4 flex justify-between gap-x-2">
      {pictures.map((picture) => (
        <Image
          key={picture.id}
          src={picture.url}
          alt={`A picture of ${recipe.name}`}
          width="0"
          height="0"
          sizes="100vw"
          className={PICTURE_CLASSES}
          onClick={() => setSelectedPicture(picture)}
        />
      ))}
      {placeholder && (
        <div
          className={cn(
            PICTURE_CLASSES,
            "flex items-center justify-center bg-primary-dark text-2xl"
          )}
          onClick={() => setSelectedPicture(recipe.pictures[3])}
        >
          {placeholder}
        </div>
      )}

      {selectedPicture && (
        <div className="w-full h-full p-8 fixed top-0 left-0 z-30 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90">
          <div
            className="w-full h-full top-0 left-0 z-[1] absolute bg-transparent"
            onClick={() => setSelectedPicture(null)}
          ></div>
          <FontAwesomeIcon
            icon={faXmark}
            className={"absolute top-8 right-8 z-[2] text-3xl cursor-pointer"}
            onClick={() => setSelectedPicture(null)}
          />
          <div className="h-4/5 z-[2] flex items-center justify-center">
            <Image
              src={selectedPicture.url}
              alt={`A picture of ${recipe.name}`}
              width="0"
              height="0"
              sizes="100vw"
              className="max-h-full h-auto max-w-[75%] w-auto border-4 border-cream rounded-sm"
            />
          </div>
          <div className="h-1/5 py-4 z-[2] flex justify-between gap-x-2 overflow-x-auto">
            {recipe.pictures.map((picture) => (
              <Image
                key={picture.id}
                src={picture.url}
                alt={`A picture of ${recipe.name}`}
                width="0"
                height="0"
                sizes="100vw"
                className={cn(
                  PICTURE_CLASSES,
                  selectedPicture.id === picture.id && "border-primary"
                )}
                onClick={() => setSelectedPicture(picture)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePicturesViewer;
