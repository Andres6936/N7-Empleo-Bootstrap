import {H2, Paragraph, Sheet, YStack} from 'tamagui'
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import React from "react";

export default NiceModal.create(() => {
    // Use a hook to manage the modal state
    const modal = useModal();

    return (
        <Sheet
            forceRemoveScrollEnabled={modal.visible}
            modal={modal.visible}
            open={modal.visible}
            onOpenChange={(open: boolean) => {
                if (!open) {
                    modal.remove();
                }
            }}
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
                <Sheet.ScrollView>
                    <YStack padding="$5" gap="$8">
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
})
