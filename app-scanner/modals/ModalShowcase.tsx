import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, Modal, StyleSheet, View} from "react-native";
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {Button} from "tamagui";

import {ThemedText} from "@/components/ThemedText";

export default NiceModal.create(() => {
    // Use a hook to manage the modal state
    const modal = useModal();

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
                        <ThemedText>Hello World!</ThemedText>
                        <Button
                            onPress={() => {
                                modal.resolve();
                                modal.remove();
                            }}>
                            <ThemedText>Hide Modal</ThemedText>
                        </Button>
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