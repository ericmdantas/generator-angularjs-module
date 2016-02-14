import {
  describe,
  it,
  expect,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {setBaseTestProviders} from 'angular2/testing';

import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';

describe('my awesome app', () => {
  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

  beforeEachProviders(() => {});

  describe('creation', () => {
    it('should be true', () => {
      expect(true).toBe(true);
    })
  });
});
