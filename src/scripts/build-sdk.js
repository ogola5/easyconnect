const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

async function build() {
    const bundle = await rollup({
        input: 'src/sdk/index.ts',
        plugins: [typescript(), nodeResolve(), commonjs()],
        external: ['axios']
    });

    await bundle.write({
        file: 'dist/sdk/index.js',
        format: 'cjs',
        sourcemap: true
    });

    await bundle.write({
        file: 'dist/sdk/index.esm.js',
        format: 'esm',
        sourcemap: true
    });

    await bundle.close();
}

build().catch(console.error);