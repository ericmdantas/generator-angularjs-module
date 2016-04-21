import {
  describe,
  it,
  expect,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

describe('my awesome app', () => {
  beforeEachProviders(() => {});

  describe('creation', () => {
    it('should be true', () => {
      expect(true).toBe(true);
    })
  });
});
