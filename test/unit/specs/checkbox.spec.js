import OmCheckbox from 'packages/checkbox'
import OmCheckboxGroup from 'packages/checkbox-group'
import { createTest, createVue, destroyVM } from '../util'

describe('Checkbox', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(OmCheckbox, true)
    expect(vm.$el.classList.contains('om-checkbox')).to.be.true
  })

  it('status:checked', (done) => {
    vm = createVue({
      template: `
        <om-checkbox v-model="value"></om-checkbox>
      `,
      data() {
        return {
          value: false
        }
      }
    }, true)
    vm.$el.click()
    vm.$nextTick(_ => {
      expect(vm.$el.classList.contains('is-checked')).to.be.true
      expect(vm.$el.querySelector('.is-checked')).to.be.ok
      done()
    })
  })

  it('props:disabled', () => {
    vm = createVue({
      template: `
        <om-checkbox v-model="value" disabled></om-checkbox>
      `,
      data() {
        return {
          value: false
        }
      }
    }, true)
    expect(vm.$el.classList.contains('is-disabled')).to.be.true    
    expect(vm.$el.querySelector('.is-disabled')).to.be.ok
  })

  it('props:customClass', () => {
    vm = createTest(OmCheckbox, {
      customClass: 'om-checkbox-custom'
    }, true)
    expect(vm.$el.classList.contains('om-checkbox-custom')).to.be.true
  })

  it('event:change', (done) => {
    vm = createVue({
      template: `
        <om-checkbox v-model="value"
          @change="handleChange"></om-checkbox>
      `,
      data() {
        return {
          value: false,
          data: ''
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
      expect(vm.data).to.equal(true)
      vm.value = false
      setTimeout(() => {
        expect(vm.data).to.equal(true)
        done()
      }, 10)
    }, 10)
  })
})

describe('Checkbox Group', () => {
  let vm;

  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(OmCheckboxGroup, true)
    expect(vm.$el.classList.contains('om-checkbox-group')).to.be.true
  })

  it('group', (done) => {
    vm = createVue({
      template: `
        <om-checkbox-group v-model="value">
         <om-checkbox :label="1" ref="c1">1</om-checkbox>
         <om-checkbox :label="2" ref="c2">2</om-checkbox>
        </om-checkbox-group>
      `,
      data() {
        return {
          value: []
        }
      }
    }, true)

    expect(vm.value.length).to.equal(0)
    vm.$refs.c1.$el.click()
    vm.$nextTick(() => {
      expect(vm.value.indexOf(1) !== -1).to.be.true
      done()
    })
  })

  it('event:change', (done) => {
    vm = createVue({
      template: `
        <om-checkbox-group v-model="value" @change="handleChange">
         <om-checkbox :label="1" ref="c1">1</om-checkbox>
         <om-checkbox :label="2" ref="c2">2</om-checkbox>
        </om-checkbox-group>
      `,
      data() {
        return {
          value: [],
          data: ''
        }
      },
      methods: {
        handleChange(val) {
          this.data = val
        }
      }
    }, true)

    vm.$refs.c1.$el.click()
    setTimeout(() => {
      expect(vm.data).to.deep.equal([1])
      vm.value = [1]
      done()
    }, 10)
  })

  it('props:min max', (done) => {
    vm = createVue({
      template: `
        <om-checkbox-group v-model="value"
          :min="2"
          :max="3">
         <om-checkbox :label="1" ref="c1">1</om-checkbox>
         <om-checkbox :label="2" ref="c2">2</om-checkbox>
         <om-checkbox :label="3" ref="c3">3</om-checkbox>
         <om-checkbox :label="4" ref="c4">4</om-checkbox>
        </om-checkbox-group>
      `,
      data() {
        return {
          value: [1, 2]
        }
      }
    }, true)
    
    expect(vm.value.length).to.equal(2)
    vm.$refs.c2.$el.click()
    setTimeout(() => {
      vm.$nextTick(() => {
        expect(vm.value.indexOf(2) !== -1).to.be.true
        vm.$refs.c3.$el.click()
        vm.$nextTick(() => {
          expect(vm.value.indexOf(2) !== -1).to.be.true
          expect(vm.value.indexOf(3) !== -1).to.be.true
          vm.$refs.c4.$el.click()
          vm.$nextTick(() => {
            expect(vm.value.indexOf(4) !== -1).to.be.false
            done()
          })
        })
      })
    }, 10)
  })

  it('props:disabled', () => {
    vm = createVue({
      template: `
        <om-checkbox-group v-model="value" disabled>
         <om-checkbox :label="1" ref="c1">1</om-checkbox>
         <om-checkbox :label="2" ref="c2">2</om-checkbox>
        </om-checkbox-group>
      `,
      data() {
        return {
          value: [1, 2]
        }
      }
    }, true)
    expect(vm.$refs.c1.$el.classList.contains('is-disabled')).to.be.true
    expect(vm.$refs.c2.$el.classList.contains('is-disabled')).to.be.true
  })
})