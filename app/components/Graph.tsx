import useData from '@/hooks/useData';
import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { ConfigContext } from '../contexts/ConfigContext'

function Graph() {
    const { config, graphables } = useContext(ConfigContext);
    const { data } = useData();

    const renderGraphBars = () => {
        return graphables.map((g, index) => {
            if(config[`${g}_show`]){
                return <Bar key={`${index}-${g}`} stackId="a" minPointSize={0} label={{ fill: 'white', fontSize: '1em' }} dataKey={g} fill={config[`${g}_hex`].toString()} />
            }
        })
    }

    return (
        <Grid item xs={10}>
            <Box sx={{ width: '100%', height: '50vh' }}>
                <ResponsiveContainer>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            bottom: 5
                        }}
                    >
                        <Legend verticalAlign="top" align='left' height={36} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="keyIndex" />
                        <YAxis type='number' label={{ value: 'provisioned accounts', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        {renderGraphBars()}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Grid>
    )
}

export default Graph
