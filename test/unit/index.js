const testsContext = require.context('./specs', true, /input\.spec$/);

testsContext.keys().forEach(testsContext);
