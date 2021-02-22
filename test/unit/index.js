const testsContext = require.context('./specs', true, /spin\.spec$/);

testsContext.keys().forEach(testsContext);
