import { useState } from "react";
import { cpfMask } from "~/utils/mask";
import { isValidCPF } from "~/utils/validators";
import TextField, { TextFieldProps } from "../TextField";

type Props = {
    $handleChange?: (value: string) => void;
} & TextFieldProps

const TextFieldCpf = (props: Props) => {

    const [value, setValue] = useState("");
    const [error, setError] = useState(props.error);

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = cpfMask(event.target.value);
        const isValidCPFTerm = isValidCPF(maskedValue);

        setValue(maskedValue);

        if( !isValidCPFTerm && event.target.value !== "" ) {
            setError("CPF inválido");
            return;
        }
        
        props.$handleChange?.(maskedValue);
        setError("");
    };

    return (
        <TextField {...props} error={error || props.error} onChange={handleChangeValue} value={value} />
    );
};

export default TextFieldCpf;