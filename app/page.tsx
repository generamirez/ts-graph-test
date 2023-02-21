
'use client';
import { Card, Grid } from '@mui/material';
import Loading from './common/Loading';
import PalettePicker from './components/PalettePicker';
import { ConfigContext } from './contexts/ConfigContext';
import { useCallback, useEffect, useState } from 'react';
import { ConfigTypes } from '@/types/ConfigType';
import Graph from './components/Graph';
import ErrorScreen from './common/ErrorScreen';
import useData from '@/hooks/useData';
import { colors, defaultColors } from '@/constants/colors';
import GraphDataSchema from '@/schemas/GraphDataSchema';

export default function Home() {
    const { data = [], isLoading, error } = useData();
    const [building, setBuilding] = useState(true);
    const [config, setConfig] = useState<ConfigTypes>({});
    const [graphables, setGraphables] = useState<string[]>([]);
    const [hasValidationError, setHasValidationError] = useState(false);
    
    const buildConfig = useCallback(() => {
        let configBuilding = {};
        let graphValues: string[] = [];
        data.forEach((d: ConfigTypes) => {
            let addConfig: ConfigTypes = {};
            Object.keys(d).forEach((k) => {
                if (k !== 'keyIndex' && (!graphValues.includes(k))) {
                    addConfig[`${k}_hex`] = defaultColors[k] ?? colors[Math.floor(Math.random() * colors.length)];
                    addConfig[`${k}_show`] = true;
                    graphValues.push(k);
                }
            });
            configBuilding = { ...configBuilding, ...addConfig };

        })
        setGraphables(graphValues);
        setConfig(configBuilding);
        setBuilding(false);
    }, [data, setGraphables, setConfig, setBuilding])

    useEffect(() => {
        const { success } = GraphDataSchema.safeParse([...data]);
        setHasValidationError(!success);
        if (!isLoading) {
            buildConfig();
        }
    }, [buildConfig, data, hasValidationError, isLoading])

    const renderPickers = () => {
        return graphables.map((g) => (<PalettePicker key={`palette-picker-${g}`} item={g} />))
    }

    if (isLoading || building) {
        return <Loading />
    }
    if (error || hasValidationError) {
        return <ErrorScreen />
    }

    return (
        <ConfigContext.Provider value={{ config, setConfig, graphables }}>
            <Card style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Grid container justifyContent={'center'}>
                    <Graph />
                    <Grid container justifyContent={'center'} style={{ padding: '3px 3vw 0 3vw' }}>
                        {renderPickers()}
                    </Grid>
                </Grid >
            </Card>
        </ConfigContext.Provider>
    )
}