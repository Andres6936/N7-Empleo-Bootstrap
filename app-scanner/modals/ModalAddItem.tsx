import React from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, Modal, StyleSheet, View} from "react-native";
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {Button, Form, H6, Input, Label, Spinner, XStack, YStack} from "tamagui";

export default NiceModal.create(() => {
    // Use a hook to manage the modal state
    const modal = useModal();

    const [status, setStatus] = React.useState<'off' | 'submitting' | 'submitted'>('off')

    return (
        <SafeAreaView style={[styles.centeredView, StyleSheet.absoluteFill]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    modal.remove();
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Form
                            alignItems="center"
                            gap="$2"
                            onSubmit={() => {
                                modal.resolve();
                                modal.remove();
                            }}
                            padding="$4"
                            minWidth="90%"
                        >
                            <H6>Añadir nuevo item</H6>

                            <YStack minWidth="100%" padding="$2" gap="$2">
                                <YStack>
                                    <Label htmlFor="name" lineHeight="$2">
                                        Nombre
                                    </Label>
                                    <Input width="100%" id="name" defaultValue="Nate Wienert"/>
                                </YStack>

                                <XStack gap="$2">
                                    <YStack flex={1}>
                                        <Label htmlFor="value" lineHeight="$2">
                                            Valor
                                        </Label>
                                        <Input width="100%" id="value" defaultValue="Nate Wienert"/>
                                    </YStack>

                                    <YStack flex={1}>
                                        <Label htmlFor="amount" lineHeight="$2">
                                            Cantidad
                                        </Label>
                                        <Input width="100%" id="amount" defaultValue="Nate Wienert"/>
                                    </YStack>
                                </XStack>
                            </YStack>

                            <Form.Trigger asChild disabled={status !== 'off'}>
                                <Button minWidth="100%" mt="$4"
                                        icon={status === 'submitting' ? () => <Spinner/> : undefined}>
                                    Confirmar
                                </Button>
                            </Form.Trigger>
                        </Form>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 18,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});