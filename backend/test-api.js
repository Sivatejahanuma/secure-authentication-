/**
 * SECUREX Automated API Validation Suite
 * Tests every single requirement, status code, and security barrier.
 */

const http = require('http');

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

// Helper function to make HTTP requests
const request = (method, path, data = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = data ? JSON.stringify(data) : '';

    const headers = {
      'Content-Type': 'application/json',
    };

    if (data) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(
      url,
      {
        method,
        headers,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const parsed = body ? JSON.parse(body) : null;
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: parsed,
            });
          } catch {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body,
            });
          }
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('\n======================================================');
  console.log('   SECUREX AUTOMATED SECURITY & API TEST SUITE        ');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, details = '') => {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
      failed++;
    }
  };

  const testEmail = `agent_${Date.now()}@securex.internal`;
  const testPassword = 'CyberPass!992026';
  let savedToken = null;

  try {
    // Test 1: Health Check
    console.log('--- Phase 1: Health Check ---');
    const health = await request('GET', '/api/health');
    assert(
      health.statusCode === 200 && health.body.success === true,
      'Health Check returns 200 OK',
      `Got status ${health.statusCode}`
    );

    // Test 2: Valid Registration
    console.log('\n--- Phase 2: User Registration ---');
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Agent Cipher',
      email: testEmail,
      password: testPassword,
      confirmPassword: testPassword,
    });
    assert(
      regRes.statusCode === 201 && regRes.body.success === true,
      'POST /api/auth/register returns 201 Created for valid data',
      `Status: ${regRes.statusCode}, msg: ${regRes.body?.message}`
    );
    assert(
      regRes.body?.token && typeof regRes.body.token === 'string',
      'Registration returns signed JWT token'
    );
    assert(
      regRes.body?.user && !regRes.body.user.password && !regRes.body.user.passwordHash,
      'Registration response NEVER exposes password or password hash'
    );
    savedToken = regRes.body?.token;

    // Test 3: Duplicate Registration
    console.log('\n--- Phase 3: Duplicate Email Validation ---');
    const dupRes = await request('POST', '/api/auth/register', {
      name: 'Agent Cipher Duplicate',
      email: testEmail,
      password: testPassword,
      confirmPassword: testPassword,
    });
    assert(
      dupRes.statusCode === 409 && dupRes.body.success === false,
      'POST /api/auth/register returns 409 Conflict for duplicate email',
      `Status: ${dupRes.statusCode}, msg: ${dupRes.body?.message}`
    );

    // Test 4: Weak Password Validation
    console.log('\n--- Phase 4: Password Strength Validation ---');
    const weakRes = await request('POST', '/api/auth/register', {
      name: 'Weak Pass',
      email: `weak_${Date.now()}@securex.internal`,
      password: 'weak',
      confirmPassword: 'weak',
    });
    assert(
      weakRes.statusCode === 400 && weakRes.body.success === false,
      'POST /api/auth/register returns 400 Bad Request for weak password',
      `Status: ${weakRes.statusCode}`
    );

    // Test 5: Password Mismatch Validation
    const mismatchRes = await request('POST', '/api/auth/register', {
      name: 'Mismatch Pass',
      email: `mismatch_${Date.now()}@securex.internal`,
      password: testPassword,
      confirmPassword: 'DifferentPass!123',
    });
    assert(
      mismatchRes.statusCode === 400 && mismatchRes.body.success === false,
      'POST /api/auth/register returns 400 Bad Request for password mismatch',
      `Status: ${mismatchRes.statusCode}`
    );

    // Test 6: Valid Login
    console.log('\n--- Phase 5: Authentication & Login ---');
    const loginRes = await request('POST', '/api/auth/login', {
      email: testEmail,
      password: testPassword,
    });
    assert(
      loginRes.statusCode === 200 && loginRes.body.success === true,
      'POST /api/auth/login returns 200 OK for valid credentials',
      `Status: ${loginRes.statusCode}`
    );
    assert(
      loginRes.body?.token && typeof loginRes.body.token === 'string',
      'Login returns valid JWT token'
    );
    assert(
      loginRes.body?.user && !loginRes.body.user.password && !loginRes.body.user.passwordHash,
      'Login response NEVER leaks password or password hash'
    );
    savedToken = loginRes.body?.token;

    // Test 7: Invalid Password Login
    const badLoginRes = await request('POST', '/api/auth/login', {
      email: testEmail,
      password: 'WrongPassword123!',
    });
    assert(
      badLoginRes.statusCode === 401 && badLoginRes.body.success === false,
      'POST /api/auth/login returns 401 Unauthorized for incorrect password',
      `Status: ${badLoginRes.statusCode}`
    );

    // Test 8: Protected Route with Valid JWT
    console.log('\n--- Phase 6: Protected Route Authorization ---');
    const meRes = await request('GET', '/api/auth/me', null, savedToken);
    assert(
      meRes.statusCode === 200 && meRes.body.success === true,
      'GET /api/auth/me returns 200 OK with valid JWT',
      `Status: ${meRes.statusCode}`
    );
    assert(
      meRes.body?.user?.email === testEmail,
      'GET /api/auth/me returns accurate authenticated user details'
    );
    assert(
      !meRes.body?.user?.password && !meRes.body?.user?.passwordHash,
      'Protected user payload NEVER exposes password or password hash'
    );

    // Test 9: Protected Route without JWT
    const noTokenRes = await request('GET', '/api/auth/me', null, null);
    assert(
      noTokenRes.statusCode === 401 && noTokenRes.body.success === false,
      'GET /api/auth/me returns 401 Unauthorized when token is missing',
      `Status: ${noTokenRes.statusCode}`
    );

    // Test 10: Protected Route with Tampered/Invalid JWT
    const badTokenRes = await request(
      'GET',
      '/api/auth/me',
      null,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tampered.token'
    );
    assert(
      badTokenRes.statusCode === 401 && badTokenRes.body.success === false,
      'GET /api/auth/me returns 401 Unauthorized when token is invalid/tampered',
      `Status: ${badTokenRes.statusCode}`
    );

    // Test 11: Logout Endpoint
    console.log('\n--- Phase 7: Session Termination ---');
    const logoutRes = await request('POST', '/api/auth/logout');
    assert(
      logoutRes.statusCode === 200 && logoutRes.body.success === true,
      'POST /api/auth/logout returns 200 OK',
      `Status: ${logoutRes.statusCode}`
    );

    console.log('\n======================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('======================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
};

// Wait 1.5s for server to settle before running tests if invoked directly
setTimeout(runTests, 1500);
