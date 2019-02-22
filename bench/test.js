const md5 = require("./wrapper");

// Tests ripped from the md5 package on npm, ported to jest.

it("should throw an error for an undefined value", function() {
  expect(function() {
    md5(undefined);
  }).toThrow();
});

it("should allow the hashing of the string `undefined`", function() {
  expect(md5("undefined")).toBe("5e543256c480ac577d30f76f9120eb74");
});

it("should throw an error for `null`", function() {
  expect(function() {
    md5(null);
  }).toThrow();
});

it('should return the expected MD5 hash for "message"', function() {
  expect(md5("message")).toBe("78e731027d8fd50ed642340b7c9a63b3");
});

it("should not return the same hash for random numbers twice", function() {
  const msg1 = Math.floor(Math.random() * 100000 + 1) + new Date().getTime();
  const msg2 = Math.floor(Math.random() * 100000 + 1) + new Date().getTime();

  if (msg1 !== msg2) {
    expect(md5(msg1.toString())).not.toBe(md5(msg2.toString()));
  } else {
    expect(md5(msg1.toString())).toBe(md5(msg1.toString()));
  }
});

it("should support Node.js Buffers", function() {
  const buffer = new Buffer.from("message áßäöü", "utf8");
  expect(md5(buffer)).toBe(md5("message áßäöü"));
});

/* One of the options we don't implement yet.
it('should be able to use a binary encoded string', function() {
  var hash1 = md5('abc', { asString: true });
  const hash2 = md5(hash1 + 'a', { asString: true, encoding : 'binary' });
  const hash3 = md5(hash1 + 'a', { encoding : 'binary' });
  expect.equal(hash3, '131f0ac52813044f5110e4aec638c169');
});
*/

it("should support Uint8Array", function() {
  // Polyfills
  if (!Array.from) {
    Array.from = function(src, fn) {
      const result = new Array(src.length);
      for (const i = 0; i < src.length; ++i) result[i] = fn(src[i]);
      return result;
    };
  }
  if (!Uint8Array.from) {
    Uint8Array.from = function(src) {
      const result = new Uint8Array(src.length);
      for (const i = 0; i < src.length; ++i) result[i] = src[i];
      return result;
    };
  }

  const message = "foobarbaz";
  const u8arr = Uint8Array.from(
    Array.from(message, function(c) {
      return c.charCodeAt(0);
    })
  );
  const u8aHash = md5(u8arr);
  expect(md5(message)).toBe(u8aHash);
});
