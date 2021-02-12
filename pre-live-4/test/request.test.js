const { describe, it, before, afterEach } = require('mocha');
const { createSandbox } = require('sinon');
const assert = require('assert');
const Events = require('events');

const Request = require('../src/request');

describe('Request helpers', () => {
    const timeout = 15;

    let sandbox;
    let request;
    before(() => {
        sandbox = createSandbox();
        request = new Request();
    });
    afterEach(() => {
        sandbox.restore();
    });
    
    it(`should throw a timeout error when the function has spent more than ${timeout}ms`, async () => {
        const exceededTimeout = timeout + 10;
        const url = 'https://www.google.com';

        sandbox.stub(request, 'get')
            .callsFake(() => new Promise((reject) => setTimeout(reject, exceededTimeout)))

        const call = request.makeRequest({
            url,
            method: 'get',
            timeout,
        });

        await assert.rejects(call, { message: `timeout at [${url}]` });
    });
    it('shoud return ok when promise time is ok', async () => {
        const expected = { ok: 'ok' };
        const url = 'https://www.google.com';

        sandbox.stub(request, 'get')
            .callsFake(async () => {
                await new Promise((reject) => setTimeout(reject));
                return expected;
            })

        const call = () => request.makeRequest({
            url,
            method: 'get',
            timeout,
        });

        await assert.doesNotReject(call());
        assert.deepStrictEqual(await call(), expected);
    });
    it('shoud return a JSON object after a request', async () => {
        const data = [
            Buffer.from('{"ok": '),
            Buffer.from('"ok"'),
            Buffer.from('}'),
        ];

        // inicializa Events nativos do NodeJS para poder manipular
        const responseEvent = new Events();
        const httpEvent = new Events();

        const https = require('https');
        sandbox
            .stub(https, 'get')
            .yields(responseEvent) // para sobrescrever callbacks
            .returns(httpEvent);

        const expected = { ok: 'ok' };
        const pendingPromise = request.get('https://www.google.com');
        
        // manipula e finge que está retornando os chunks via eventos
        responseEvent.emit('data', data[0]);
        responseEvent.emit('data', data[1]);
        responseEvent.emit('data', data[2]);
        responseEvent.emit('end');

        const result = await pendingPromise;
        assert.deepStrictEqual(result, expected);
    });
});