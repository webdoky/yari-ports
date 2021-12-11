import test from 'ava';

test('Basic test example', t => {
    // Test will fail if not exactly
    // two assertions are made
    t.plan(2);
    // Skipped tests still count to the plan
    t.true.skip();
    t.truthy('xxx');


    t.log('prgress');


    // Test fails if exceeded.
    // Resets after each assertion.
    // There is no default timeout.
    // Globally from CLI: --timeout=10s
    t.timeout(200);
});
