const testsContext = require.context('./specs', true, /progress.spec$/);

testsContext.keys().forEach(testsContext);
