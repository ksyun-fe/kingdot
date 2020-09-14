<<<<<<< HEAD
const testsContext = require.context('./specs', true, /input\.spec$/);
=======
const testsContext = require.context('./specs', true, /.spec$/);
>>>>>>> dev

testsContext.keys().forEach(testsContext);
