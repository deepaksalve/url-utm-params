const assert = require('assert');
const { utm, strict, build } = require('..');

describe('url-utm-params', () => {
  describe('#utm()', () => {
    it('returns an empty object if url has no UTM parameters', () => {
      const link = 'localhost.com/url-utm-params';

      const expected = {};
      const actual = utm(link);

      assert.deepEqual(actual, expected);
    });

    it('returns all the UTM parameters present in url', () => {
      const link = 'localhost.com/url-utm-params?utm_source=facebook&utm_medium=social';

      const expected = {
        utm_source: 'facebook',
        utm_medium: 'social'
      };
      const actual = utm(link);

      assert.deepEqual(actual, expected);
    });
  });

  describe('#strict()', () => {
    it('returns an empty object if url has no Valid UTM parameters', () => {
      const link = 'localhost.com/url-utm-params?utm_source_custom=facebook&utm_medium_custom=social&custom_param=cutsom';

      const expected = {};
      const actual = strict(link);

      assert.deepEqual(actual, expected);
    });

    it('returns only the valid UTM parameters present in url', () => {
      const link = 'localhost.com/url-utm-params?utm_source=facebook&utm_medium=social&custom_param=cutsom';

      const expected = {
        utm_source: 'facebook',
        utm_medium: 'social'
      };
      const actual = strict(link);

      assert.deepEqual(actual, expected);
    });
  });

  describe('#build()', () => {
    it("if 'isStrict' param is not given builds an url with all the query parameters", () => {
      const link = 'localhost.com/url-utm-params';
      const params = {
        utm_source_custom: 'facebook',
        utm_medium_custom: 'social',
        custom_param: 'cutsom'
      };

      const expected = 'localhost.com/url-utm-params?utm_source_custom=facebook&utm_medium_custom=social&custom_param=cutsom';
      const actual = build(link, params);

      assert.equal(actual, expected);
    });

    it("if 'isStrict' param is given builds an url with only valid UTM parameters", () => {
      const link = 'localhost.com/url-utm-params';
      const params = {
        utm_source: 'facebook',
        utm_medium: 'social',
        custom_param: 'cutsom'
      };
      const isStrict = true;

      const expected = 'localhost.com/url-utm-params?utm_source=facebook&utm_medium=social';
      const actual = build(link, params, isStrict);

      assert.equal(actual, expected);
    });
  });
});
