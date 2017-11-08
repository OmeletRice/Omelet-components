import OmButton from 'packages/button'
import { createTest, createVue, destroyVM } from '../util'

describe('OmButton', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(OmButton, true)
    expect(vm.$el.classList.contains('om-button')).to.be.true
  })

  it('props:type', () => {
    vm = createTest(OmButton, {
      type: 'primary'
    }, true)
    expect(vm.$el.classList.contains('om-button--primary')).to.be.true
  })

  it('props:size', () => {
    vm = createTest(OmButton, {
      size: 'medium'
    }, true)
    expect(vm.$el.classList.contains('om-button--medium')).to.be.true
  })

  it('props:icon', () => {
    vm = createTest(OmButton, {
      icon: 'om-icon-button'
    }, true)
    expect(vm.$el.querySelector('.om-icon-button')).to.be.ok
  })

  it('props:nativeType', () => {
    vm = createTest(OmButton, {
      nativeType: 'submit'
    }, true)
    expect(vm.$el.getAttribute('type')).to.be.equal('submit')
  })

  it('props:loading', () => {
    vm = createTest(OmButton, {
      loading: true
    }, true)
    expect(vm.$el.querySelector('.om-icon-loading')).to.be.ok
    expect(vm.$el.classList.contains('is-loading')).to.be.true
  })

  it('props:disabled', () => {
    vm = createTest(OmButton, {
      disabled: true
    }, true)
    expect(vm.$el.getAttribute('disabled')).to.be.equal('disabled')
    expect(vm.$el.classList.contains('is-disabled')).to.be.true
  })

  it('props:plain', () => {
    vm = createTest(OmButton, {
      plain: true
    }, true)
    expect(vm.$el.classList.contains('is-plain')).to.be.true
  })

  it('props:customClass', () => {
    vm = createTest(OmButton, {
      customClass: 'custom-class'
    }, true)
    expect(vm.$el.classList.contains('custom-class')).to.be.true
  })

  it('methods:click', (done) => {
    let res
    vm = createVue({
      template: `
        <om-button
          @click="handleClick"
        ></om-button>
      `,
      methods: {
        handleClick(e) {
          res = e
        }
      }
    }, true)
    vm.$el.click()
    setTimeout(_ => {
      expect(res).to.exist
      done()
    }, 50)
  })
})
