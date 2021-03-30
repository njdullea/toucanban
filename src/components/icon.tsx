import { ReactComponent as Toucan } from '../toucanIcon.svg';
import { Box } from 'theme-ui';

function ToucanIcon(props: any) {
  const { stroke, size, fill, background} = props;
  return (
    <Box bg={background} p={1} sx={{height: size || '48px', width: size || '48px', borderRadius: '8px'}}>
      <Toucan fill={fill || 'white'} stroke={stroke || 'black'}  />
    </Box>
  )
}

export default ToucanIcon;