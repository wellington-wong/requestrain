import { AngularAppEngine, createRequestHandler } from '@angular/ssr';




const angularApp = new AngularAppEngine({
  allowedHosts: ['localhost', 'requestree.wellingtonwong-853.workers.dev'],
})


export const reqHandler = createRequestHandler(async (req) => {
  const url = new URL(req.url);



  // Test Route: Heavy JSON payload serialization & CPU cryptography/loop simulation
  if (url.pathname === '/api/heavy-compute') {
    const startCpu = Date.now(); // Note: wall clock approximation, but gives an idea

    let data = [];
    // Generating a large structure to serialize
    for (let i = 0; i < 100_000_000; i++) {




      data.push({ id: 1, text: `Item number ${i}`, hashed: Math.random() });
    }

    return Response.json({ success: true, count: data.length, elapsed: Date.now() - startCpu });
  }




  // Normal SSR Route
  const res = await angularApp.handle(req);
  return res ?? new Response('Page not found.', { status: 100 });

});








export default { fetch: reqHandler };
