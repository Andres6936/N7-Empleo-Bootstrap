import {XStack} from "tamagui";

import {ScannerButton} from "@/components/buttons/ScannerButton";
import {AddItemButton} from "@/components/buttons/AddItemButton";

type Props = {
    onScan: () => Promise<void> | void,
    onAdd: () => Promise<void> | void,
}

export function ScannerActions(props: Props) {
    return (
        <XStack position="absolute" bottom={10} left={10} right={10} gap="$2">
            <ScannerButton onPress={props.onScan}/>
            <AddItemButton onPress={props.onAdd}/>
        </XStack>
    )
}