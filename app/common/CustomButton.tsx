import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 6px',
  border: '1px solid',
  lineHeight: 1.5
});

type CustomButtonTypes = {
    hex: string,
    onClick: React.MouseEventHandler,
    children: string
}
export default function CustomButton(props: CustomButtonTypes) {
  return (
      <BootstrapButton onClick={props.onClick} style={{ backgroundColor: props.hex }} variant="contained" disableRipple />
  );
}