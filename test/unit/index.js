const testsContext = require.context('./specs', true, /radio\.spec$/);

testsContext.keys().forEach(testsContext);
