import React from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, Modal, StyleSheet, View} from "react-native";
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {Button, Form, H6, Input, Label, Spinner, Switch, XStack, YStack} from "tamagui";

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

                            <YStack minWidth="100%" padding="$3" space="$4">
                                <XStack alignItems="center" space="$4">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input flex={1} id="name" defaultValue="Nate Wienert"/>
                                </XStack>

                                <XStack alignItems="center" space="$4">
                                    <Label htmlFor="notify">
                                        Notifications
                                    </Label>
                                    <Switch id="notify">
                                        <Switch.Thumb animation="quick"/>
                                    </Switch>
                                </XStack>
                            </YStack>

                            <Form.Trigger asChild disabled={status !== 'off'}>
                                <Button icon={status === 'submitting' ? () => <Spinner/> : undefined}>
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