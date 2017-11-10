import Radio from 'packages/radio'
import RadioGroup from 'packages/radio-group'
import RadioButton from 'packages/radio-button'
import { createTest, createVue, destroyVM } from '../util'

describe('Radio', () => {
  let vm

  afterEach(() => {
    destroyVM(vm)
  })

  it('create', (done) => {
    vm = createTest(Radio, true)
    expect(vm.$el.classList.contains('om-radio')).to.be.true

    vm.$el.click()
    setTimeout(() => {
      expect(vm.$el.classList.contains('is-checked')).to.be.true
      done()
    }, 20)
  })

  it('props:disabled', (done) => {
    vm = createVue({
      template: `
        <om-radio
          v-model="radio"
          label="2"
          :disabled="true"
        ></om-radio>
      `,
      data() {
        return {
          radio: 1
        }
      }
    }, true)

    vm.$el.click()
    setTimeout(() => {
      expect(vm.radio === 1).to.be.true
      expect(vm.$el.classList.contains('is-checked')).to.be.false
      expect(vm.$el.classList.contains('is-disabled')).to.be.true
      done()
    }, 20)
  })

  it('event:change', (done) => {
    vm = createVue({
      template: `
        <om-radio
          v-model="radio"
          :label="2"
          @change="handleChange"
        ></om-radio>
      `,
      data() {
        return {
          radio: 1,
          data: 0
        }
      },
      methods: {
        handleChange(val) {
          this.data = val
        }
      }
    }, true)
    vm.$el.click()
    setTimeout(() => {
      expect(vm.data).to.equal(2)
      done()
    }, 20)

  })
})

describe('RadioGroup', () => {
  let vm
  
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', (done) => {
    vm = createVue({
      template: `
        <om-radio-group v-model="radio">
          <om-radio :label="1" ref="ra1"></om-radio>
          <om-radio :label="2" ref="ra2"></om-radio>
        </om-radio-group>
      `,
      data() {
        return {
          radio: 1
        }
      }
    }, true)
    expect(vm.$el.classList.contains('om-radio-group')).to.be.true
    expect(vm.$refs.ra1.$el.classList.contains('is-checked')).to.be.true

    vm.$refs.ra2.$el.click()
    setTimeout(() => {
      expect(vm.$refs.ra2.$el.classList.contains('is-checked')).to.be.true
      expect(vm.radio).to.equal(2)
      done()
    }, 20)
  })

  it('props:disabled', (done) => {
    vm = createVue({
      template: `
        <om-radio-group v-model="radio" disabled>
          <om-radio :label="1" ref="ra1"></om-radio>
          <om-radio :label="2" ref="ra2"></om-radio>
        </om-radio-group>
      `,
      data() {
        return {
          radio: 1
        }
      }
    }, true)

    expect(vm.$refs.ra1.$el.classList.contains('is-checked')).to.be.true
    expect(vm.$refs.ra2.$el.classList.contains('is-disabled')).to.be.true
    
    vm.$refs.ra2.$el.click()
    setTimeout(() => {
      expect(vm.radio === 1).to.be.true
      expect(vm.$refs.ra1.$el.querySelector('.is-checked')).to.be.exist
      done()
    }, 20)
  })

  it('props:vertical', () => {
    vm = createVue({
      template: `
        <om-radio-group v-model="radio" vertical>
          <om-radio :label="1" ref="ra1"></om-radio>
          <om-radio :label="2" ref="ra2"></om-radio>
        </om-radio-group>
      `,
      data() {
        return {
          radio: 1
        }
      }
    }, true)
    expect(vm.$refs.ra1.$el.classList.contains('is-vertical')).to.be.true
    expect(vm.$refs.ra2.$el.classList.contains('is-vertical')).to.be.true
  })

  it('event:change', () => {
    vm = createVue({
      template: `
        <om-radio-group v-model="radio"
          @change="handleChange">
          <om-radio :label="1" ref="ra1"></om-radio>
          <om-radio :label="2" ref="ra2"></om-radio>
        </om-radio-group>
      `,
      data() {
        return {
          radio: 1,
          data: 0
        }
      },
      methods: {
        handleChange(val) {
          this.data = val
        }
      }
    }, true)
    expect(vm.$refs.ra1.$el.classList.contains('is-checked')).to.be.true
    vm.$refs.ra2.$el.click()
    setTimeout(() => {
      expect(vm.data).to.equal(2)
      done() 
    }, 20)
  })
})

// describe('RadioButton', () => {
//   let vm;

//   afterEach(() => {
//     destroyVM(vm)
//   })

//   it('create', (done) => {
//     vm = createVue({
//       template: `
//         <om-radio-group v-model="radio">
//           <om-radio-button :label="1" ref="ra1"></om-radio-button>
//           <om-radio-button :label="2" ref="ra2"></om-radio-button>
//         </om-radio-group>
//       `,
//       data() {
//         return {
//           radio: 1
//         }
//       }
//     }, true)

//     expect(vm.$refs.ra1.$el.classList.contains('is-checked')).to.be.true
//     vm.$refs.ra2.$el.click()
//     setTimeout(() => {
//       expect(vm.$refs.ra2.$el.classList.contains('is-checked')).to.be.true
//       expect(vm.radio === 2).to.be.true
//       done()
//     }, 10)
//   })

// })