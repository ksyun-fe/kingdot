const testsContext = require.context('./specs', true, /drawer\.spec$/);

testsContext.keys().forEach(testsContext);