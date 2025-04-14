import {AlertDialog, Button, XStack, YStack} from 'tamagui'
import NiceModal, {useModal} from "@ebay/nice-modal-react";

export default NiceModal.create(() => {
    // Use a hook to manage the modal state
    const modal = useModal();

    return (
        <AlertDialog
            open={modal.visible}
            onOpenChange={(open: boolean) => {
                if (!open) {
                    modal.remove();
                }
            }}
            native>
            <AlertDialog.Trigger/>

            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                />
                <AlertDialog.Content
                    bordered
                    elevate
                    key="content"
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
                    exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
                    x={0}
                    scale={1}
                    opacity={1}
                    y={0}
                >
                    <YStack gap="$4">
                        <AlertDialog.Title>Accept</AlertDialog.Title>
                        <AlertDialog.Description>
                            By pressing yes, you accept our terms and conditions.
                        </AlertDialog.Description>

                        <XStack gap="$3" justifyContent="flex-end">
                            <AlertDialog.Cancel asChild>
                                <Button onPress={() => {
                                    modal.reject();
                                    modal.remove();
                                }}>Cancel</Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <Button onPress={() => {
                                    modal.resolve();
                                    modal.remove();
                                }} theme="accent">Accept</Button>
                            </AlertDialog.Action>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    )
})