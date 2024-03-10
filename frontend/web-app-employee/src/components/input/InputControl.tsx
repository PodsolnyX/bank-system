import { FieldValues, useController, UseControllerProps} from "react-hook-form";
import {Input, InputProps, Typography} from "antd";
import React from "react";

export type InputControlProps<T extends FieldValues> =
    UseControllerProps<T> & Omit<InputProps, "value" | "defaultValue"> & InputType;

interface InputType {
    type?: "default" | "password"
}

function InputControl<T extends FieldValues>({
         name,
         control,
         defaultValue,
         rules,
         shouldUnregister,
         onChange,
         type = "default",
         ...props
     }: InputControlProps<T>) {
    const {
        field: { value, onChange: fieldOnChange, onBlur, ...field },
        fieldState,
    } = useController<T>({
        name,
        control,
        defaultValue,
        rules,
        shouldUnregister,
    });

    return (
        <span className={"flex flex-col w-full"}>
            {
                type === "default"
                    ? <Input
                        value={value}
                        onChange={(value) => fieldOnChange(value)}
                        status={fieldState.error?.message ? "error" : undefined}
                        onBlur={onBlur}
                        {...field}
                        {...props}
                    />
                    : <Input.Password
                        value={value}
                        onChange={(value) => fieldOnChange(value)}
                        status={fieldState.error?.message ? "error" : undefined}
                        onBlur={onBlur}
                        {...field}
                        {...props}
                    />
            }
            <Typography.Text type="danger" style={{whiteSpace: "normal"}}>{fieldState.error?.message}</Typography.Text>
        </span>
    );
}

export default InputControl