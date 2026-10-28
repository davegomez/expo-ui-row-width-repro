import { Button, Column, Host, Row, Spacer, Text } from '@expo/ui';
import { frame } from '@expo/ui/swift-ui/modifiers';
import { Platform } from 'react-native';

// A button whose label Row asks for the full width it is offered (iOS only).
function WideButton({ label }) {
  return (
    <Button variant="outlined" onPress={() => {}}>
      <Row modifiers={Platform.OS === 'ios' ? [frame({ maxWidth: Infinity })] : undefined}>
        <Spacer flexible />
        <Text>{label}</Text>
        <Spacer flexible />
      </Row>
    </Button>
  );
}

function Buttons() {
  return (
    <Column spacing={12}>
      <WideButton label="Short" />
      <WideButton label="A much longer label" />
    </Column>
  );
}

export default function App() {
  return (
    <Host style={{ flex: 1 }}>
      {/* width 100% only keeps this outer Column from the separate expo/expo#52410 */}
      <Column style={{ width: '100%' }} alignment="center" spacing={24}>
        <Text>A: Column between 2 flexible Spacers in a Row</Text>
        <Row>
          <Spacer flexible />
          <Buttons />
          <Spacer flexible />
        </Row>
        <Text>B: the same Column, no Row</Text>
        <Buttons />
      </Column>
    </Host>
  );
}
