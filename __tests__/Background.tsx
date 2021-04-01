/**
 * @format
 */

import 'react-native'
import React from 'react'
import {Text} from 'react-native'
import Background from '../src/components/Background'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('if it renders correctly', () => {
  const tree = renderer
    .create(
      <Background>
        <Text>Test</Text>
      </Background>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
