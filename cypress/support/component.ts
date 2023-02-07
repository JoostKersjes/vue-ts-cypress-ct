// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
import '@/assets/main.css'

import { mount } from 'cypress/vue'
import type { Router } from 'vue-router'
import router from '../../src/router'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

// I followed the instruction for a vue-router mount function
// https://docs.cypress.io/guides/component-testing/vue/examples#Vue-Router

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1] & { router?: Router }

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(component: any, options?: OptionsParam): Chainable<any>
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  // create router if one is not provided
  if (!options.router) {
    options.router = router;
  }

  // Add router plugin
  options.global.plugins.push({
    install(app) {
      app.use(options.router as Router)
    },
  })

  return mount(component, options)
})
