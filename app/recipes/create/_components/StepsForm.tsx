import React, { FormEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Label } from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { Step } from "@/lib/types";
import DeleteTrashIcon from "@/components/DeleteTrashIcon";
import { Textarea } from "@/components/ui/Textarea";

type StepsFormProps = {
  steps: Step[];
  onAddStep: (step: Step) => void;
  onRemoveStep: (step: Step) => void;
  disabled: boolean;
  error?: string;
};

const StepsForm = ({
  steps,
  onAddStep,
  onRemoveStep,
  disabled,
  error,
}: StepsFormProps) => {
  const stepForm = useRef<HTMLFormElement>(null);
  const stepNameTextarea = useRef<HTMLTextAreaElement>(null);
  const [stepError, setStepError] = useState("");

  const addStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStepError("");

    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as Step;

    if (!formData.description) {
      setStepError("Step cannot be empty");
      return;
    }

    stepForm.current?.reset();
    stepNameTextarea.current?.focus();
    onAddStep({
      ...formData,
      id: Date.now().toString(),
      order: steps.length + 1,
    });
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label className="flex items-baseline justify-between">
        Steps
        {(stepError || error) && (
          <label className="text-xs text-red-800">{error || stepError}</label>
        )}
      </Label>
      <form
        ref={stepForm}
        className="flex items-center gap-x-2"
        onSubmit={addStep}
      >
        <Textarea
          ref={stepNameTextarea}
          name="description"
          placeholder="What to do ?"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </form>
      <div className="flex flex-col gap-y-2">
        {steps.map((step) => (
          <div key={step.id} className="flex gap-x-2">
            <DeleteTrashIcon
              className="text-xs"
              handleClick={() => onRemoveStep(step)}
              disabled={disabled}
            />
            <label className="text-xs">{step.order}.</label>
            <p className="flex-grow italic text-xs whitespace-pre-wrap">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsForm;
