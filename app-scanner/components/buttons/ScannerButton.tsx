import {Button, ButtonProps} from "tamagui";

type Props = ButtonProps;

export function ScannerButton(props: Props) {
    return (
        <Button flex={1} theme='accent' {...props}>
            Escanear
        </Button>
    )
}