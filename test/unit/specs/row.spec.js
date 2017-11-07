import OmRow from 'packages/layout/row'
import { createTest, destroyVM } from '../util'

describe('OmRow', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(OmRow, true)
    expect(vm.$el.classList.contains('om-row')).to.be.true
  })

  it('gutter', () => {
    vm = createTest(OmRow, {
      gutter: 10
    }, true)
    expect(vm.$el.style.marginLeft).to.be.equal('-5px')
    expect(vm.$el.style.marginRight).to.be.equal('-5px')
  })
})
