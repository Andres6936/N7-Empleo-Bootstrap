import {ChevronDown, ChevronUp} from '@tamagui/lucide-icons'
import {Button, H2, Input, Paragraph, Sheet, SheetProps, YStack} from 'tamagui'
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import React, {memo} from "react";


const spModes = ['percent', 'constant', 'fit', 'mixed'] as const

export default NiceModal.create(() => {
    // Use a hook to manage the modal state
    const modal = useModal();

    const [position, setPosition] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [innerOpen, setInnerOpen] = React.useState(false)
    const [snapPointsMode, setSnapPointsMode] =
        React.useState<(typeof spModes)[number]>('percent')
    const [mixedFitDemo, setMixedFitDemo] = React.useState(false)

    const isPercent = snapPointsMode === 'percent'
    const isConstant = snapPointsMode === 'constant'
    const isFit = snapPointsMode === 'fit'
    const isMixed = snapPointsMode === 'mixed'
    const snapPoints = isPercent
        ? [85, 50, 25]
        : isConstant
            ? [256, 190]
            : isFit
                ? undefined
                : mixedFitDemo
                    ? ['fit', 110]
                    : ['80%', 256, 190]

    return (
        <Sheet
            forceRemoveScrollEnabled={modal.visible}
            modal={modal.visible}
            open={modal.visible}
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="medium"
        >
            <Sheet.Overlay
                animation="lazy"
                backgroundColor="$shadow6"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
            />

            <Sheet.Handle/>
            <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
                <SheetContents {...{modal, isPercent, innerOpen, setInnerOpen, setOpen}} />
            </Sheet.Frame>
        </Sheet>
    )
})

// in general good to memoize the contents to avoid expensive renders during animations
const SheetContents = memo(
    ({modal, isPercent, innerOpen, setInnerOpen, setOpen}: any) => {
        return (
            <>
                <Button size="$6" circular icon={ChevronDown} onPress={() => setOpen(false)}/>
                <Input width={200}/>
                {modal && isPercent && (
                    <>
                        <InnerSheet open={innerOpen} onOpenChange={setInnerOpen}/>
                        <Button
                            size="$6"
                            circular
                            icon={ChevronUp}
                            onPress={() => setInnerOpen(true)}
                        />
                    </>
                )}
            </>
        )
    }
)

function InnerSheet(props: SheetProps) {
    return (
        <Sheet animation="medium" modal snapPoints={[90]} dismissOnSnapToBottom {...props}>
            <Sheet.Overlay
                animation="medium"
                bg="$shadow2"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
            />

            <Sheet.Handle/>
            <Sheet.Frame flex={1} justifyContent="center" alignItems="center" gap="$5">
                <Sheet.ScrollView>
                    <YStack padding="$5" gap="$8">
                        <Button
                            size="$6"
                            circular
                            alignSelf="center"
                            icon={ChevronDown}
                            onPress={() => props.onOpenChange?.(false)}
                        />

                        <H2>Hello world</H2>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Paragraph key={i} size="$8">
                                Eu officia sunt ipsum nisi dolore labore est laborum laborum in esse ad
                                pariatur. Dolor excepteur esse deserunt voluptate labore ea. Exercitation
                                ipsum deserunt occaecat cupidatat consequat est adipisicing velit
                                cupidatat ullamco veniam aliquip reprehenderit officia. Officia labore
                                culpa ullamco velit. In sit occaecat velit ipsum fugiat esse aliqua dolor
                                sint.
                            </Paragraph>
                        ))}
                    </YStack>
                </Sheet.ScrollView>
            </Sheet.Frame>
        </Sheet>
    )
}