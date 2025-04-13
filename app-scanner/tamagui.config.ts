import {createTamagui} from "tamagui";
import {defaultConfig} from "@tamagui/config/v4";

export const config = createTamagui(defaultConfig)

type Conf = typeof config

// make imports typed
declare module '@tamagui/core' {
    interface TamaguiCustomConfig extends Conf {
    }
}