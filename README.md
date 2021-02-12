# Estudos de conceitos JS

## symbol (vídeo: https://www.youtube.com/watch?v=xMyL5HokeyM)
- Como usar o tipo `Symbol` para:
  - Criar métodos/propriedades "inacessíveis"
  - Sobrescrever métodos internos como `toString`, `Symbol.toPrimitive`, `Symbol.iterator` e `Symbol.asyncIterator` (esses dois últimos, generators)
- Lib `assert` nativa do Node.js - métodos `deepStrictEqual` e `throws`

## async-iterator (artigo: https://blog.risingstack.com/async-iterators-in-node-js/)
- Sobrescrever o comportamento de iterator de um array, aplicando generator retornando promises
- Utilizar esse array em um `for await`

## pre-live-1 (vídeo: https://www.youtube.com/watch?v=DiqLe0nDekA)
- Criar propriedades privadas começando com `#`
- Métodos e propriedades estáticas
- Objeto `Intl` nativo do JavaScript para formatação de números
- Regexes
## pre-live-2 (vídeo: https://www.youtube.com/watch?v=tGSpqjerR_U)
- Uso de IIFE para isolar o escopo
- Uso do `Proxy` para "interceptar" setters em objetos
- Preservação do escopo com closures
- Métodos bind e apply

## pre-live-3 (vídeo: https://www.youtube.com/watch?v=9COpZuJzx18)
- Testes com Istanbul (coverage), Mocha (motor de testes), Chai (lib de assertion) e Sinon (lib para spies, stubs e mocks)
- Lokijs como "banco"
- N-tier architecture pattern - service, repository
- Dependency injection

## pre-live-4 (vídeo: https://www.youtube.com/watch?v=40kiPpRoH0A)
- Criação de um sistema de timeout com o `Promise.race` e uma Promise envolvendo um setTimeout
- Método `callsFake` do `stub` do sinon
- Como "fakear" uma chamada de API com o módulo `https`, com buffer
- Como sobrescrever, com stub, funções que usam callbacks

## pre-live-5 (vídeo: https://www.youtube.com/watch?v=w_UE-wTZPpM)
- Usar async generator para chamar uma API paginada
- Implementação de chamadas com retry, timeout e threshold
- Implementação de testes de async generators, usando stubs e spies