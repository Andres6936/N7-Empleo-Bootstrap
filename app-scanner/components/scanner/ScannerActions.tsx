import {XStack} from "tamagui";

import {ScannerButton} from "@/components/buttons/ScannerButton";
import {AddItemButton} from "@/components/buttons/AddItemButton";

export function ScannerActions() {
    return (
        <XStack position="absolute" bottom={10} left={10} right={10} gap="$2">
            <ScannerButton/>
            <AddItemButton/>
        </XStack>
    )
}