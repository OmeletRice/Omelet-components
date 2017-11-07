import OmRow from 'packages/layout/row'
import OmCol from 'packages/layout/col'
import { createTest, createVue, destroyVM } from '../util'

describe('OmCol', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(OmCol, true)
    expect(vm.$el.classList.contains('om-col')).to.be.true
  })

  it('props:span', () => {
    vm = createTest(OmCol, {
      span: 12
    })
    expect(vm.$el.classList.contains('om-col-12')).to.be.true
  })

  it('prop:offset', () => {
    vm =createTest(OmCol, {
      span: 12,
      offset: 6
    })
    expect(vm.$el.classList.contains('om-col-offset-6')).to.be.true
  })

  it('props:pull', () => {
    vm =createTest(OmCol, {
      span: 12,
      pull: 6
    })
    expect(vm.$el.classList.contains('om-col-pull-6')).to.be.true
  })

  it('props:push', () => {
    vm =createTest(OmCol, {
      span: 12,
      push: 6
    })
    expect(vm.$el.classList.contains('om-col-push-6')).to.be.true
  })

  it('gutter', () => {
    vm = createVue({
      template: `
        <om-row :gutter="20">
          <om-col ref="col" :span="12">
          </om-col>
        </om-row>
      `
    }, true)
    expect(vm.$refs.col.$el.style.paddingLeft).to.be.equal('10px')
    expect(vm.$refs.col.$el.style.paddingRight).to.be.equal('10px')
  })

  it('responsive', () => {
    vm = createVue({
      template: `
        <om-row>
          <om-col ref="col"
            :xs="{ span: 2, offset: 4 }"
            :sm="2"
            :md="{ span: 3 }"
            :lg="{ offset: 6 }"
            :xl="{ span: 6, offset: 2 }">
          </om-col>
        </om-row>
      `
    })
    const colEl = vm.$refs.col.$el
    expect(colEl.classList.contains('om-col-xs-2')).to.be.true
    expect(colEl.classList.contains('om-col-xs-offset-4')).to.be.true
    expect(colEl.classList.contains('om-col-sm-2')).to.be.true
    expect(colEl.classList.contains('om-col-md-3')).to.be.true
    expect(colEl.classList.contains('om-col-lg-offset-6')).to.be.true
    expect(colEl.classList.contains('om-col-xl-6')).to.be.true
    expect(colEl.classList.contains('om-col-xl-offset-2')).to.be.true
  })
})