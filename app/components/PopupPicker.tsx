import React, { useCallback, useEffect, useRef } from 'react'
import { SketchPicker } from 'react-color'

type PopupPickerProps = {
    onColorChange: Function,
    onClickOutside: Function,
    hex: string
}

function PopupPicker(props: PopupPickerProps) {
    const { onColorChange, onClickOutside } = props;

    const divRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: MouseEvent) => {
        if (divRef.current && e.target) {
            if (!divRef.current.contains(e.target as Node)) {
                onClickOutside();
            }
        }
    }, [onClickOutside, divRef]);

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [handleClick])

    return (
        <div ref={divRef} style={{ position: 'absolute', zIndex: 2 }}>
            <SketchPicker
                color={props.hex}
                onChangeComplete={(color) => onColorChange(color.hex)}
            />
        </div>
    )
}

export default PopupPicker
