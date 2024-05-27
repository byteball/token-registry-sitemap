
const { SitemapStream, streamToPromise } = require('sitemap');

const conf = require('ocore/conf.js');
const DAG = require('aabot/dag.js');

const fastify = require('fastify')({
    logger: false,
})

fastify.get('/sitemap.xml', async (_, reply) => {
    const smStream = new SitemapStream({ hostname: `https://${process.env.testnet ? 'testnet.' : ''}tokens.ooo` });

    const symbols = await DAG.readAAStateVars(conf.token_registry_aa_address, "a2s_").then(data => Object.values(data));

    symbols.forEach(symbol => {
        smStream.write({ url: `/${symbol}`, changefreq: 'daily', priority: 1 });
    });

    smStream.end();

    const result = await streamToPromise(smStream);

    reply.header('Content-Type', 'application/xml');
    reply.send(result);
})

// Run the server!
fastify.listen({ port: conf.webServerPort }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

    console.error(`Server is now listening on ${address}`)
});
