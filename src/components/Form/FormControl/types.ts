import { TextareaProps, SwitchProps } from "@chakra-ui/react";
import { TWrapperRadioGroup, TWrapperTextInput } from "../Wrappers";

export type TCommonFormControlProps = {
  label?: JSX.Element;
  helperText?: JSX.Element;
  errorMessage?: JSX.Element;
  styleProps: any;
};

export type TTextInput = {
  type: "text";
  properties: TWrapperTextInput & TCommonFormControlProps;
};

export type TTextarea = {
  type: "textarea";
  properties: TextareaProps & TCommonFormControlProps;
};

export type TSwitch = {
  type: "switch";
  properties: SwitchProps & TCommonFormControlProps;
};

export type TRadioGroup = {
  type: "radiogroup";
  properties: TWrapperRadioGroup & TCommonFormControlProps;
};

export type TFormControl = TTextInput | TTextarea | TSwitch | TRadioGroup;
