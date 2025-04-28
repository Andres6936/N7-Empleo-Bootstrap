import React from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, Modal, StyleSheet} from "react-native";
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {Button, Form, H6, Input, Label, Spinner, View, XStack, YStack} from "tamagui";
import {useForm} from "@tanstack/react-form";

const getIntegerValueOf = (value: string) => {
    const parsed = value.replace(/[^0-9]/g, '');
    const numeric = parseInt(parsed, 10);
    return isNaN(numeric) ? 0 : numeric;
}

const defaultValues = {
    Name: "",
    Value: 0,
    Amount: 0,
}

export type Props = {
    onConfirm: (event: { values: typeof defaultValues }) => Promise<void> | void,
}

export default NiceModal.create((props: Props) => {
    // Use a hook to manage the modal state
    const modal = useModal();
    const form = useForm(({
        defaultValues: defaultValues,
        onSubmit: async ({value}) => {
            const cleanUp = async () => {
                modal.resolve();
                modal.remove();
            }
            return await Promise.all([
                cleanUp(),
                props.onConfirm({values: value}),
            ])
        }
    }))

    return (
        <SafeAreaView style={[styles.centeredView, StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    modal.remove();
                }}>
                <View style={styles.centeredView}>
                    <View bg="$background" style={styles.modalView}>
                        <Form
                            alignItems="center"
                            gap="$2"
                            onSubmit={() => void form.handleSubmit()}
                            padding="$4"
                            minWidth="90%"
                        >
                            <H6>Añadir nuevo item</H6>

                            <YStack minWidth="100%" padding="$2" gap="$2">
                                <form.Field
                                    name="Name"
                                    children={(field) => (
                                        <YStack>
                                            <Label htmlFor={field.name} lineHeight="$2">
                                                Nombre
                                            </Label>
                                            <Input
                                                width="100%"
                                                id={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChangeText={(value) => field.handleChange(value)}
                                            />
                                        </YStack>
                                    )}
                                />


                                <XStack gap="$2">
                                    <form.Field
                                        name="Value"
                                        children={(field) => (
                                            <YStack flex={1}>
                                                <Label htmlFor={field.name} lineHeight="$2">
                                                    Valor
                                                </Label>
                                                <Input
                                                    width="100%"
                                                    id={field.name}
                                                    inputMode='numeric'
                                                    keyboardType='numeric'
                                                    value={field.state.value.toString()}
                                                    onBlur={field.handleBlur}
                                                    onChangeText={(value) => field.handleChange(getIntegerValueOf(value))}
                                                />
                                            </YStack>
                                        )}
                                    />

                                    <form.Field
                                        name="Amount"
                                        children={(field) => (
                                            <YStack flex={1}>
                                                <Label htmlFor={field.name} lineHeight="$2">
                                                    Cantidad
                                                </Label>
                                                <Input
                                                    width="100%"
                                                    id={field.name}
                                                    inputMode='numeric'
                                                    keyboardType='numeric'
                                                    value={field.state.value.toString()}
                                                    onBlur={field.handleBlur}
                                                    onChangeText={(value) => field.handleChange(getIntegerValueOf(value))}
                                                />
                                            </YStack>
                                        )}
                                    />
                                </XStack>
                            </YStack>

                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitted]}
                                children={([canSubmit, isSubmitted]) => (
                                    <Form.Trigger asChild disabled={!canSubmit || isSubmitted}>
                                        <Button
                                            minWidth="100%"
                                            mt="$4"
                                            icon={isSubmitted ? () => <Spinner/> : undefined}>
                                            Confirmar
                                        </Button>
                                    </Form.Trigger>
                                )}
                            />

                            <Button
                                minWidth="100%"
                                onPress={() => {
                                    modal.reject();
                                    modal.remove();
                                }}>
                                Cancelar
                            </Button>
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