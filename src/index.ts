'use strict';

import { createServer } from './server.js';

const PORT = process.env.PORT || 5000;

createServer()
  .listen(PORT, () => {
    console.log(`🚀 🚀 🚀 Server is running on http://localhost:${PORT}`);
  })
