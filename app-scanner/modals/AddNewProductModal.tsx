import {X} from '@tamagui/lucide-icons'
import {Button, Dialog, Paragraph, Unspaced,} from 'tamagui'
import NiceModal, {useModal} from "@ebay/nice-modal-react";

export default NiceModal.create(() => {
    // Use a hook to manage the modal state
    const modal = useModal();

    return (
        <Dialog
            modal
            open={modal.visible}
            onOpenChange={open => open ? modal.show() : modal.remove()}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="slow"
                    opacity={0.5}
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                />

                <Dialog.Content
                    bordered
                    elevate
                    key="content"
                    animateOnly={['transform', 'opacity']}
                    animation={[
                        'quicker',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
                    exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
                    gap="$4"
                    marginHorizontal="$4"
                >
                    <Dialog.Title size="$6" fontWeight="bold">Cambio de contraseña</Dialog.Title>
                    <Dialog.Description>
                        Por favor, ingresa tu contraseña actual y la nueva contraseña que deseas establecer.
                    </Dialog.Description>

                    <Paragraph>
                        Hello
                    </Paragraph>

                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position="absolute"
                                top="$3"
                                right="$3"
                                size="$2"
                                circular
                                icon={X}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
})