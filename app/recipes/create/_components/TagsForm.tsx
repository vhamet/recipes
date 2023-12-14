import React, { FormEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Tag } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn, normalizeString } from "@/lib/utils";

type TagsFormProps = {
  tags: Tag[];
  onAddTag: (tag: Tag) => void;
  onRemoveTag: (tag: Tag) => void;
  disabled: boolean;
};

const TagsForm = ({ tags, onAddTag, onRemoveTag, disabled }: TagsFormProps) => {
  const tagForm = useRef<HTMLFormElement>(null);
  const tagNameInput = useRef<HTMLInputElement>(null);
  const [tagError, setTagError] = useState("");

  const addTag = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTagError("");

    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as Tag;

    formData.name = normalizeString(formData.name);
    if (!formData.name) {
      setTagError("Tag must have a name");
      return;
    }
    if (tags.some(({ name }) => name === formData.name)) {
      setTagError("Tag already exists");
      return;
    }

    tagForm.current?.reset();
    tagNameInput.current?.focus();
    onAddTag({ ...formData, id: Date.now().toString() });
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label className="flex items-baseline justify-between">
        Tags
        {tagError && <label className="text-xs text-red-800">{tagError}</label>}
      </Label>
      <form
        ref={tagForm}
        className="flex items-center gap-x-2"
        onSubmit={addTag}
      >
        <Input
          ref={tagNameInput}
          name="name"
          placeholder="Healthy, cheesy, ... ?"
          className="max-w-[10rem]"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </form>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            className={cn(
              "flex items-center gap-x-2",
              disabled && "opacity-70"
            )}
          >
            {tag.name}
            <FontAwesomeIcon
              icon={faXmark}
              className={cn(disabled ? "cursor-not-allowed" : "cursor-pointer")}
              onClick={() => !disabled && onRemoveTag(tag)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagsForm;
