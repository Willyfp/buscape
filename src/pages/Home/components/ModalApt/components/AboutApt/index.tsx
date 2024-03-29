import React from 'react';
import { View } from 'react-native';
import { MaskService } from 'react-native-masked-text';
import { Text } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { themeStyledComponents } from '../../../../../../../App';
import { iconsName } from '../../../../../../utils/constants';
import { APType } from '../../../../../../utils/fakeApts';
import { ViewComodities, ViewPrice } from './styles';

type Props = {
  apartamento: APType;
};

const AboutApt = ({ apartamento }: Props) => {
  const { colors } = useTheme();

  return (
    <>
      <Text
        style={{
          color: themeStyledComponents.colors.text.primary,
          fontWeight: 'bold',
          marginTop: 10,
        }}
        variant="headlineSmall"
      >
        {apartamento.description}
      </Text>
      <Text
        style={{
          color: themeStyledComponents.colors.text.primary,
        }}
        variant="titleMedium"
      >
        {apartamento.address}
      </Text>

      <ViewComodities>
        {apartamento.comodities?.map(item => (
          <View style={{ alignItems: 'center' }} key={item}>
            <FontAwesome5Icon
              name={iconsName(item)}
              size={14}
              color={colors.primary}
            />
            <Text
              style={{
                color: themeStyledComponents.colors.text.primary,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </ViewComodities>

      {apartamento.price &&
        Object.entries(apartamento.price).map(([name, value]) => {
          if (name !== 'aluguel' && name !== 'total') {
            return (
              <ViewPrice key={name}>
                <Text
                  style={{
                    color: themeStyledComponents.colors.text.primary,
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    color: themeStyledComponents.colors.text.primary,
                  }}
                >
                  {MaskService.toMask(
                    'money',
                    (value + '00').replace(/\D/g, ''),
                    {
                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$',
                      suffixUnit: '',
                    },
                  )}
                  {name.toLowerCase() === 'venda' && '/m²'}
                </Text>
              </ViewPrice>
            );
          }

          return null;
        })}
    </>
  );
};

export default AboutApt;
