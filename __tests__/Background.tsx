/**
 * @format
 */

import 'react-native'
import React from 'react'
import {Text} from 'react-native'
import GradientBackground from '../src/components/GradientBackground'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('if it renders correctly', () => {
  const tree = renderer
    .create(
      <GradientBackground>
        <Text>Test</Text>
      </GradientBackground>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
