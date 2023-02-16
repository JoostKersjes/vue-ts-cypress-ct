# vue-ts-cypress-ct

This branch is showcasing a TypeScript error on the `mount` command for **all**
components that have a `<slot>` and use at least two `define` APIs.

The [`HelloWorld.vue` example](./src/components/HelloWorld.vue) is using these:
- An unnamed `<slot>`
- `defineProps`
- `defineEmits`

To see the error, run `yarn type-check`.

<details>
<summary>Click to see the full error</summary>

```shell
$ yarn type-check
yarn run v1.22.19
$ vue-tsc --noEmit -p tsconfig.cypress-ct.json --composite false
src/components/__tests__/HelloWorld.cy.ts:5:14 - error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '__VLS_WithTemplateSlots<DefineComponent<__VLS_TypePropsToRuntimeProps<{ msg: string; }>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ... 4 more ..., {}>, { ...; }>' is not assignable to parameter of type 'ComponentOptionsWithObjectProps<Readonly<ComponentPropsOptions<Data>>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ... 5 more ..., { ...; } | {}>'.
      Type '__VLS_WithTemplateSlots<DefineComponent<__VLS_TypePropsToRuntimeProps<{ msg: string; }>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ... 4 more ..., {}>, { ...; }>' is not assignable to type 'ComponentOptionsBase<Readonly<ExtractPropTypes<Readonly<ComponentPropsOptions<Data>>>> & { [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined; }, ... 10 more ..., string>'.
        Types of property 'setup' are incompatible.
          Type '((this: void, props: Readonly<LooseRequired<Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{ msg: string; }>>> & { onPoke?: (() => any) | undefined; }>>, ctx: { ...; }) => void | ... 2 more ... | Promise<...>) | undefined' is not assignable to type '((this: void, props: Readonly<LooseRequired<Readonly<ExtractPropTypes<Readonly<ComponentPropsOptions<Data>>>> & { [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined; }>>, ctx: { ...; }) => void | ... 2 more ... | Promise<...>) | undefined'.
            Type '(this: void, props: Readonly<LooseRequired<Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{ msg: string; }>>> & { onPoke?: (() => any) | undefined; }>>, ctx: { ...; }) => void | ... 2 more ... | Promise<...>' is not assignable to type '(this: void, props: Readonly<LooseRequired<Readonly<ExtractPropTypes<Readonly<ComponentPropsOptions<Data>>>> & { [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined; }>>, ctx: { ...; }) => void | ... 2 more ... | Promise<...>'.
              Types of parameters 'props' and 'props' are incompatible.
                Type 'Readonly<LooseRequired<Readonly<ExtractPropTypes<Readonly<ComponentPropsOptions<Data>>>> & { [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined; }>>' is missing the following properties from type 'Readonly<LooseRequired<Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{ msg: string; }>>> & { onPoke?: (() => any) | undefined; }>>': msg, onPoke

5     cy.mount(HelloWorld, { props: { msg: 'Hello Cypress' } })
               ~~~~~~~~~~

  node_modules/cypress/vue/dist/index.d.ts:1339:18
    1339 declare function mount<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D extends {}, C extends ComputedOptions = {}, M extends Record<string, Function> = {}, E extends EmitsOptions = Record<string, any>, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, EE extends string = string>(componentOptions: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, E, Mixin, Extends, EE>, options?: MountingOptions<ExtractPropTypes<PropsOptions> & PublicProps, D>): Cypress.Chainable<{
                          ~~~~~
    The last overload is declared here.
```

</details>

Removing at least one of the three (`defineProps`, `defineEmits` or the `<slot>`) from the component will make the error disappear.
