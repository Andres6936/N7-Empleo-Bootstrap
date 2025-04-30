import {Button, ButtonProps} from "tamagui";
import {Plus} from "@tamagui/lucide-icons";

type Props = ButtonProps;

export function AddItemButton(props: Props) {
    return (
        <Button theme='accent' {...props}>
            <Plus/>
        </Button>
    )
}