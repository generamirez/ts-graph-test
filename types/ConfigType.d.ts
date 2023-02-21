export type ConfigTypes = {
    [key: string]: string | boolean
}

export type ConfigStateTypes = {
    config: ConfigTypes,
    setConfig: React.Dispatch<React.SetStateAction<ConfigTypes>>,
    graphables: string[]
}