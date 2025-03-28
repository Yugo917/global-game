import { AnyObjectSchema } from "yup";
import { GenericDialog } from "./GenericDialog";
import { DynamicForm } from "../form/DynamicForm";

interface IProps<T extends Record<string, any>> {
  title: string,
  formId: string;
  schema: AnyObjectSchema;
  searchCriteria: T;
  open: boolean;
  onSearchClick: (searchCriteria: T) => void;
  onCancelClick: () => void;
}

export function FormSearchDialog<T extends Record<string, any>>(props: IProps<T>) {
  const {
    title, formId, schema, searchCriteria, open, onSearchClick, onCancelClick
  } = props;

  const handleSubmit = (data: T) => {
    onSearchClick(data);
  };

  return (
    <GenericDialog
      title={title}
      content={(

        <DynamicForm<T>
          formId={formId}
          schema={schema}
          defaultValues={searchCriteria}
          onSubmit={handleSubmit}
          submitLabelButton="submit"
          strict
        />

      )}
      actionButtons={
        [
          {
            text: "Search",
            onClick: () => { },
            variant: "outlined",
            type: "submit",
            form: formId
          },
          {
            text: "Cancel",
            onClick: onCancelClick
          }
        ]
      }
      open={open}
      onClose={onCancelClick}
    />
  );
}
