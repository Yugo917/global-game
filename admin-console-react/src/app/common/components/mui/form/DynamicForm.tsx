import React, { useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  DefaultValues,
  Path,
  Controller
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { AnyObjectSchema, date as yupDate } from "yup";

type DynamicFormProps<T> = {
  formId: string;
  schema: AnyObjectSchema;
  defaultValues: T;
  onSubmit: (data: T) => void;
  submitLabelButton: string;
  strict?: boolean;
};

export function DynamicForm<T extends Record<string, any>>({
  formId,
  schema,
  defaultValues,
  onSubmit,
  submitLabelButton,
  strict = false
}: DynamicFormProps<T>) {
  useEffect(() => {
    if (strict) {
      const schemaFields = (schema as any).fields;
      const missingKeys = Object.keys(defaultValues).filter(
        key => !(key in schemaFields)
      );

      if (missingKeys.length > 0) {
        throw new Error(
          `The schema Yup is not complete. Missing Keys: ${missingKeys.join(", ")}`
        );
      }
    }
  }, [schema, defaultValues, strict]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  });

  const renderFields = () => {
    const schemaFields = (schema as any).fields;

    return Object.keys(defaultValues).map(key => {
      const fieldSchema = schemaFields[key];
      const isDate = fieldSchema?.type === "date";

      return (
        <Box key={key} mb={2}>
          <Controller
            name={key as Path<T>}
            control={control}
            render={({ field }) => {
              if (isDate) {
                return (
                  <MobileDateTimePicker
                    label={key}
                    value={field.value || null}
                    onChange={(date: Date | null) => field.onChange(date)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors[key]}
                        helperText={errors[key]?.message?.toString() || ""}
                      />
                    )}
                  />
                );
              }

              return (
                <TextField
                  fullWidth
                  label={key}
                  value={field.value ?? ""}
                  onChange={e => {
                    const { value } = e.target;
                    field.onChange(value === "" ? null : value);
                  }}
                  error={!!errors[key]}
                  helperText={errors[key]?.message?.toString() || ""}
                />
              );
            }}
          />
        </Box>
      );
    });
  };

  const onSubmitHandler: SubmitHandler<T> = data => {
    onSubmit(data);
  };

  return (
    <Box
      id={formId}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
    >
      {renderFields()}
    </Box>
  );
}
