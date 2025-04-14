import {Text, View} from "react-native";
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {PortalProvider, TamaguiProvider} from 'tamagui';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';

import {useColorScheme} from '@/hooks/useColorScheme';
import {config} from "@/tamagui.config";
import migrations from '@/drizzle/migrations';
import {db} from "@/services/sqlite/createClient";
import NiceModal from "@ebay/nice-modal-react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const {success, error} = useMigrations(db, migrations);
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    if (error) {
        return (
            <View>
                <Text>Migration error: {error.message}</Text>
            </View>
        );
    }
    if (!success) {
        return (
            <View>
                <Text>Migration is in progress...</Text>
            </View>
        );
    }

    return (
        <TamaguiProvider config={config}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <PortalProvider shouldAddRootHost>
                    <NiceModal.Provider>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                            <Stack.Screen name="+not-found"/>
                        </Stack>
                        <StatusBar style="auto"/>
                    </NiceModal.Provider>
                </PortalProvider>
            </ThemeProvider>
        </TamaguiProvider>
    );
}
