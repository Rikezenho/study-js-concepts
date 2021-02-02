// const EntityBase = require('./EntityBase')

const assert = require('assert')
const Employee = require('./employee')
const Manager = require('./manager')
const Util = require('./util')

const GENDER = {
    male: 'male',
    female: 'female',
}

{
    const employee = new Employee({
        name: 'XuxaDaSilva',
        gender: GENDER.female
    })

    assert.throws(() => employee.birthYear, { message: 'you must define age first!' })
}

{
    const employee = new Employee({
        name: 'Joaozinho',
        gender: GENDER.male,
        age: 20
    })

    assert.deepStrictEqual(employee.name, 'Mr. Joaozinho')
    assert.deepStrictEqual(employee.age, undefined)
    assert.deepStrictEqual(employee.gender, undefined)
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40))
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))

    const expectedBirthYear = 2001
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear)

    // não tem setter, não deve mudar!
    employee.birthYear = new Date().getFullYear() - 80
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear)

    employee.age = 80
    assert.deepStrictEqual(employee.birthYear, new Date().getFullYear() - 80)

    console.log('\n --- employee ---')
    console.log('employee.name', employee.name)
    console.log('employee.age', employee.age)
    console.log('employee.gender', employee.gender)
    console.log('employee.grossPay', employee.grossPay)
    console.log('employee.netPay', employee.netPay)
}

{
    const manager = new Manager({
        name: 'Mariazinha',
        gender: GENDER.female,
        age: 18
    })

    assert.deepStrictEqual(manager.name, 'Ms. Mariazinha')
    assert.deepStrictEqual(manager.age, undefined)
    assert.deepStrictEqual(manager.gender, undefined)
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40))
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000))
    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32))

    const expectedBirthYear = 2003
    assert.deepStrictEqual(manager.birthYear, expectedBirthYear)

    // não tem setter, não deve mudar!
    manager.birthYear = new Date().getFullYear() - 80
    assert.deepStrictEqual(manager.birthYear, expectedBirthYear)

    manager.age = 80
    assert.deepStrictEqual(manager.birthYear, new Date().getFullYear() - 80)

    console.log('\n --- manager ---')
    console.log('manager.name', manager.name)
    console.log('manager.age', manager.age)
    console.log('manager.gender', manager.gender)
    console.log('manager.grossPay', manager.grossPay)
    console.log('manager.bonuses', manager.bonuses)
    console.log('manager.netPay', manager.netPay)
}