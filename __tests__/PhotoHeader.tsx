/**
 * @format
 */

import 'react-native'
import React from 'react'
import {Text} from 'react-native'
import PhotoHeader from '../src/components/PhotoHeader'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('if it renders correctly', () => {
  const tree = renderer.create(<PhotoHeader />).toJSON()
  expect(tree).toMatchSnapshot()
})
