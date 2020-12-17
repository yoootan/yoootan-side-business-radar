import { shallowMount } from '@vue/test-utils'
import App from './App'

describe('App.vue', () => {
  it('テストケース１', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
  })
  expect(wrapper.text()).toMatch(msg)
})

})
