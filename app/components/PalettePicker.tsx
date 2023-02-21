import { Button, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import CustomButton from '../common/CustomButton';
import PopupPicker from './PopupPicker';

type PalettePickerProps = {
    item: string
};

export default function PalettePicker(props: PalettePickerProps) {
    const [showPalette, setShowPalette] = useState(false);
    const { item } = props;
    const { config, setConfig } = useContext((ConfigContext))

    const handleColorClick = (hex: string): void => {
        setConfig({ ...config, [`${item}_hex`]: hex })
    }

    const handleVisibility = () => {
        setConfig({ ...config, [`${item}_show`]: !config[`${item}_show`] })
    }
    return (
        <Grid item md={12} xs={11} lg={4} justifyContent={'center'}>
            {showPalette ? (
                <PopupPicker hex={config[`${item}_hex`].toString()} 
                    onClickOutside={() => setShowPalette(false)} 
                    onColorChange={handleColorClick} 
                />
            ) : (
                <Grid item>
                    <CustomButton 
                        hex={config[`${item}_hex`].toString()} 
                        onClick={() => setShowPalette((p) => !p)}
                    >
                        Change Value
                    </CustomButton>
                    <Button onClick={handleVisibility}>
                        Toggle {item} Visibility
                    </Button>
                </Grid>
            )
            }

        </Grid>

    );
}
