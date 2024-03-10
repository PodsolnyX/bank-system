import { FieldValues, useController, UseControllerProps} from "react-hook-form";
import {InputNumber, InputNumberProps, Typography} from "antd";
import React from "react";

export type InputNumberControlProps<T extends FieldValues> =
    UseControllerProps<T> & Omit<InputNumberProps, "value" | "defaultValue">;

function InputNumberControl<T extends FieldValues>({
           name,
           control,
           defaultValue,
           rules,
           shouldUnregister,
           onChange,
           ...props
       }: InputNumberControlProps<T>) {
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
            <InputNumber
                value={value}
                onChange={(value) => fieldOnChange(value)}
                status={fieldState.error?.message ? "error" : undefined}
                onBlur={onBlur}
                {...field}
                {...props}
            />
            <Typography.Text type="danger" style={{whiteSpace: "normal"}}>{fieldState.error?.message}</Typography.Text>
        </span>
    );
}

export default InputNumberControl