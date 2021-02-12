const { describe, it, before, afterEach, } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');

const TodoRepository = require('../src/todoRepository');

describe('todoRepository', () => {
    let todoRepository;
    let sandbox;
    before(() => {
        todoRepository = new TodoRepository();
        sandbox = createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('methods signature', () => {
        it('should call find fron lokijs', () => {
            const mockDatabase = [
                {
                  name: 'Teste',
                  age: 90,
                  meta: { revision: 0, created: 1613101223788, version: 0 },
                  '$loki': 1
                }
            ];

            const functionName = "find";
            const expectedReturn = mockDatabase;

            sandbox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn);

            const result = todoRepository.list();

            expect(result).to.be.deep.equal(expectedReturn);
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
        });
        it('should call insertOne fron lokijs', () => {
            const functionName = "insertOne";
            const expectedReturn = true;

            sandbox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn);

            const data = { name: 'Kuwaizera' };
            const result = todoRepository.create(data);

            expect(result).to.be.deep.equal(expectedReturn);
            expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;
        });
    });
});