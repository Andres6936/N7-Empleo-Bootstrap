import {useState} from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import NiceModal from "@ebay/nice-modal-react";

import ModalAddItem, {Props as ModalAddItemProps} from "@/modals/ModalAddItem";
import {db} from "@/services/sqlite/createClient";
import {ProductsTable} from "@/services/sqlite/schema";

export default function HomeScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={async (scanningResult) => {
                    console.log({scanningResult})

                    await NiceModal.show(ModalAddItem, {
                        onConfirm: async ({values}) => {
                            await db.insert(ProductsTable).values({
                                SKU: scanningResult.data,
                                TypeBarCode: scanningResult.type,
                                Name: values.Name,
                                Amount: values.Amount,
                                Value: values.Value,
                            })
                        },
                    } satisfies ModalAddItemProps)
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
